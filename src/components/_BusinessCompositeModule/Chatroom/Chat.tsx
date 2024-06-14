import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Icon, Button, Checkbox, Input } from "../../../index";
import { Popover } from "antd";
import Store from "../../../utils/localStorage";
import Rules from "./modals/rules";
import Setting from "./modals/setting";
import Emojis from "./emojis";
import {
  IChatConfig,
  ILatestMsgList,
  ILongPullProps,
  IMsgStruct,
  ISettings,
  IEmojiListItem,
  ILongPullParams,
  IQuoteMsg,
  IChatProps
} from "./types";
import { ChatroomContext } from "./context";
import List, { IListRefProps } from "./list";
import { CheckboxChangeEvent } from "../../Checkbox/checkbox";

const Chatroom: React.FC<IChatProps> = (props) => {
  const { chatroomCode, permission, chatroomApi, openNewWindow } = props;
  const {
    sendMessage,
    getChatroomConfig,
    getHistoryMessage,
    getLatestMessage,
    longpullMessage,
    getEmojiList,
  } = chatroomApi;

  const [showRules, setShowRules] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [settings, setSettings] = useState<ISettings>({
    hideCustomEmoj: Store.get(`chatroom-${chatroomCode}-hideCustomEmoji`),
  });
  const [quoteMsg, setQuoteMsg] = useState<IQuoteMsg>(null);
  const [currentInfo, setCurrentInfo] = useState<string>("");
  const [anonymous, setAnonymous] = useState(
    Store.get(`chatroom-${chatroomCode}-anonymous`) || false
  );
  const [popOpen, setPopOpen] = useState(false);

  const [messages, setMessages] = useState<IMsgStruct[]>([]); // 消息列表
  const [liveNumber, setLiveNumber] = useState<number>(0); // 在线人数
  const [customEmojiList, setCustomEmojiList] = useState<IEmojiListItem[]>([]);

  const [msgDeleteList, setMsgDeleteList] = useState<number[]>([]);
  const [msgWithdrawList, setMsgWithdrawList] = useState<number[]>([]);

  const [chatConfig, setChatConfig] = useState<IChatConfig>({
    chatAllBan: false,
    chatAnonymous: false,
    chatBan: false,
    chatLenLimit: 500,
  });

  const longpullParamsRef = useRef<ILongPullParams>({
    maxMsgDeleteId: 0,
    maxMsgId: 0,
    maxMsgWithdrawId: 0,
    pageSize: 10,
  });

  const inputareaRef = useRef<HTMLDivElement>(null);
  const msgListRef = useRef<IListRefProps>(null);

  const updateEmojiList = useCallback(() => {
    getEmojiList().then((res) => {
      if (res.data) {
        const emojiList = res.data as IEmojiListItem[];
        setCustomEmojiList(emojiList);
      }
    });
  }, []);

  const subscribeMsg = useCallback(() => {
    longpullMessage(longpullParamsRef.current)
      .then((res) => {
        if (res.data) {
          const data = res.data as ILongPullProps;
          if (data.messageList?.length > 0) {
            longpullParamsRef.current.maxMsgId =
              data.messageList[data.messageList?.length - 1].msgId;
          }
          if (data.msgDeleteList?.length > 0) {
            longpullParamsRef.current.maxMsgDeleteId =
              data.msgDeleteList[0].operateId;
          }
          if (data.msgWithdrawList?.length > 0) {
            longpullParamsRef.current.maxMsgWithdrawId =
              data.msgWithdrawList[0].operateId;
          }

          setMessages((old) => [...old, ...data.messageList]);
          setMsgDeleteList((old) => [
            ...old,
            ...data.msgDeleteList.map((i) => i.msgId),
          ]);
          setMsgWithdrawList((old) => [
            ...old,
            ...data.msgWithdrawList.map((i) => i.msgId),
          ]);
          setChatConfig(data.configRespVo);
          setLiveNumber(data.onlineSize);

          if (data.messageList?.length > 0) {
            // eslint-disable-next-line no-unused-expressions
            msgListRef.current?.shouldShowBtn();
          }
        }
        if ((res as any).success) {
          subscribeMsg();
        } else {
          setTimeout(() => {
            subscribeMsg();
          }, 30000);
        }
      })
      .catch(() => {
        setTimeout(() => {
          subscribeMsg();
        }, 30000);
      });
  }, []);

  useEffect(() => {
    Promise.all([getLatestMessage(), getChatroomConfig()])
      .then(([res1, res2]) => {
        const msgList = res1.data as ILatestMsgList;
        setLiveNumber(msgList.onlineSize);
        setMessages(msgList.messageList);
        longpullParamsRef.current = {
          maxMsgDeleteId: msgList.maxMsgDeleteId,
          maxMsgId:
            msgList.messageList?.length > 0
              ? msgList.messageList?.[msgList.messageList?.length - 1].msgId
              : 0,
          maxMsgWithdrawId: msgList.maxMsgWithdrawId,
          pageSize: 10,
        };
        setChatConfig(res2.data);
      })
      .then(() => {
        subscribeMsg();
        setTimeout(() => msgListRef.current?.goToBottom(), 0);
      });
  }, [subscribeMsg]);

  useEffect(() => {
    updateEmojiList();
  }, [updateEmojiList]);

  const getMoreMessage = useCallback(() => {
    getHistoryMessage(messages?.[0].msgId).then((res: any) => {
      setMessages((old) => [...res.data, ...old]);
      setTimeout(() => msgListRef.current?.showLastPage(), 0);
    });
  }, [messages]);

  const focusOnTextarea = () => {
    if (inputareaRef.current) {
      inputareaRef.current.focus();
    }
  };

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentInfo(e.target.value);
  };

  const placeholder = useMemo(() => {
    let str: string;
    if (!permission) {
      str = "您好，您暂无聊天室发言权限，请联系...";
    } else if (chatConfig.chatAllBan) {
      str = "全员禁言";
    } else if (chatConfig.chatBan) {
      str = "您好，您暂无聊天室发言权限，请联系...";
    } else {
      str = "回车发送，Ctrl+ 回车=换行";
    }
    return str;
  }, [chatConfig, permission]);

  const canSendMsg = useMemo(() => {
    return permission && !chatConfig.chatAllBan && !chatConfig.chatBan;
  }, [chatConfig.chatAllBan, chatConfig.chatBan, permission]);

  const onSendClick = () => {
    if (canSendMsg && currentInfo.length > 0) {
      sendMessage({
        msgType: "TEXT",
        content: currentInfo,
        chatAnonymous: anonymous,
        quoteId: quoteMsg?.msgId || null,
      }).then((res) => {
        if (res.data) {
          setQuoteMsg(null);
          setCurrentInfo("");
        }
      });
    }
  };

  const openWindow = () => {
    openNewWindow();
    // window.open(
    //   `/billQuotation/${chatroomCode}/chatroom?popup=true&w=380&h=800&sizable=true`
    // );
  };

  const handleOpenChange = (newOpen: boolean) => {
    setPopOpen(newOpen);
  };

  const closeEmoji = () => setPopOpen(false);

  const onkeydownHandle = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { keyCode, ctrlKey, shiftKey, altKey } = e;

    if (keyCode === 13) {
      e.preventDefault();
      if (ctrlKey || shiftKey || altKey) {
        setCurrentInfo((old) => `${old}\n`);
      } else {
        onSendClick();
      }
    }
  };

  const onSetAnonymous = (e: CheckboxChangeEvent) => {
    setAnonymous(e.target.checked);
    Store.set(`chatroom-${chatroomCode}-anonymous`, e.target.checked);
  };

  return (
    <div className={`chat-test-container`}>
      <ChatroomContext.Provider
        value={{
          settings,
          setSettings,
          quoteMsg,
          setQuoteMsg,
          focusOnTextarea,
          msgDeleteList,
          msgWithdrawList,
          currentInfo,
          setCurrentInfo,
          chatConfig,
          customEmojiList,
          updateEmojiList,
          closeEmoji,
          getMoreMsg: getMoreMessage,
          anonymous,
          chatroomCode,
          chatroomApi
        }}
      >
        <div className={`chat-container`}>
          <div className={`chat-top-container`}>
            票据聊天室
            <div className={`chat-icon-container`}>
              <Icon
                type="setting"
                style={{ fontSize: "12px", cursor: "pointer" }}
                onClick={() => setShowSetting(true)}
              />
              <Icon
                type="popup"
                style={{ fontSize: "12px", cursor: "pointer" }}
                onClick={() => openWindow()}
              />
            </div>
          </div>
          {/* 消息列表 */}
          <List
            ref={msgListRef}
            msgList={messages}
            chatConfig={chatConfig}
            moreMsg={getMoreMessage}
          />
          {/* 发送区域 */}
          <div className={`chat-send-container`}>
            {quoteMsg ? (
              <div className={`chat-send-info-quote-container`}>
                <div className={`chat-quote-title`}>
                  <div className={`chat-quote-user`}>{quoteMsg.showName}</div>
                  <div
                    className={`chat-quote-close`}
                    onClick={() => setQuoteMsg(null)}
                  >
                    <Icon
                      type="close"
                      style={{ fontSize: "16px", cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className={`chat-quote-msg`}>
                  {quoteMsg.msgType === "TEXT" ? quoteMsg.content : `[图片]`}
                </div>
              </div>
            ) : null}
            <div className={`chat-send-info-container`}>
              <div className={`chat-send-info-top-container`}>
                <Popover
                  trigger="click"
                  style={{ padding: 0 }}
                  content={<Emojis canSendMsg={canSendMsg} />}
                  placement="topLeft"
                  visible={popOpen}
                  onVisibleChange={handleOpenChange}
                  className={`chat-send-button-left-group-contianer`}
                >
                  <Icon
                    type="smile-o"
                    style={{ fontSize: "14px", cursor: "pointer" }}
                  />
                </Popover>
                <div className={`chat-send-button-right-group-contianer`}>
                  <span className={`chat-info-count`}>
                    {`${currentInfo.length ?? 0}/${chatConfig.chatLenLimit}`}
                  </span>
                  <div className={`chat-anoy-container`}>
                    <Checkbox
                      disabled={!chatConfig.chatAnonymous}
                      checked={anonymous}
                      onChange={(e) => onSetAnonymous(e)}
                    >
                      匿名发送
                    </Checkbox>
                  </div>
                </div>
              </div>
              <div className={`chat-send-info-content-container`}>
                <Input.TextArea
                  className="chat-info-input"
                  ref={inputareaRef}
                  placeholder={placeholder}
                  disabled={!canSendMsg}
                  value={currentInfo}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  maxLength={chatConfig.chatLenLimit}
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => onkeydownHandle(e)}
                />
              </div>
            </div>
            {/* 状态和发送按钮 */}
            <div className={`chat-send-bottom-container`}>
              <div className={`chat-send-bottom_left-container`}>
                在线人数:&nbsp;&nbsp;&nbsp;
                <span className={`chat-send-bottom_left-live-number`}>
                  {liveNumber}
                </span>
              </div>
              <div className={`chat-send-bottom_right-container`}>
                <span
                  className={`chat-send-bottom_right-use-info`}
                  onClick={() => setShowRules(true)}
                >
                  使用协议
                </span>
                <Button
                  type="default"
                  disabled={!canSendMsg}
                  className={`chat-send-bottom_right-send-button`}
                  onClick={onSendClick}
                >
                  发送
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Rules visible={showRules} setVisible={setShowRules} />
        <Setting
          visible={showSetting}
          settings={settings}
          onOK={setSettings}
          onCancel={() => setShowSetting(false)}
        />
      </ChatroomContext.Provider>
    </div>
  );
};

export default Chatroom;
