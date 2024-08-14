import React, {useCallback, useContext, useMemo} from 'react';
import {Dropdown, Icon} from '../../../../index';
import moment from 'moment';
import {IMsgProps, IMsgStruct} from '../types';
import {ChatroomContext} from '../context';
import {contentShow} from '../emojis/const';
import CustomImage from './image';

type MenuKey = 'COPY' | 'QUOTE' | 'WITHDRAW';
interface ItemType {
  label: string;
  key: MenuKey;
}

const optWithdraw: ItemType = {
  label: '撤回',
  key: 'WITHDRAW'
};
const optCopy: ItemType = {
  label: '复制',
  key: 'COPY'
};
const optQuote: ItemType = {
  label: '引用',
  key: 'QUOTE'
};

const Message: React.FC<IMsgProps> = (props) => {
  const {prefixCls, message, actionKey, handleMessageClick} = props;

  const {userId, setQuoteMsg, settings, focusOnTextarea, msgWithdrawList, msgDeleteList, chatroomApi} = useContext(ChatroomContext);
  const {withdrawMessage} = chatroomApi;

  const renderCotent = useMemo(() => {
    if (message) {
      switch (message.msgType) {
        case 'TEXT':
          return (
            <div
              className={`${prefixCls}-normal-info`}
              dangerouslySetInnerHTML={{__html: contentShow(message.content)}}
            />
          );
        case 'PICTURE':
          if (!settings.hideCustomEmoj) {
            return <CustomImage msg={message} />;
          }
          return <div className={`${prefixCls}-normal-info`}>[图片]</div>;
        default:
          return <>未知信息</>;
      }
    } else {
      return <></>;
    }
  }, [msgDeleteList, message, msgWithdrawList, prefixCls, settings.hideCustomEmoj]);

  const onClickMessage = () => {
    typeof handleMessageClick === 'function' && handleMessageClick(message.msgId);
  };

  const execCommandCopy = (text: string) => {
    // 此方法已被浏览器废弃，尽量少用
    const input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = text;
    input.setAttribute('readonly', 'readonly'); // 防止软键盘弹出
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(input);
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then((res) => {
          console.log('copy', res);
        })
        .catch((err) => {
          console.log('copy-err', err, '使用 execCommand 方法复制');
          execCommandCopy(text);
        });
    } else {
      console.log('浏览器不支持 Clipboard API');
    }
  };

  const onMenuClick = (e: any) => {
    if (e.key === 'COPY') {
      copyToClipboard(message.content);
    } else if (e.key === 'QUOTE') {
      setQuoteMsg(message);
      focusOnTextarea && focusOnTextarea();
    } else if (e.key === 'WITHDRAW') {
      withdrawMessage(message.msgId).then((res) => {
        console.log('withdraw', res);
      });
    }
  };

  const renderQuote = useCallback(
    (msg: IMsgStruct) => {
      if (msg.withdrawFlag || msgWithdrawList.find((item) => item === msg.msgId)) {
        return '消息已撤回';
      }
      if (msgDeleteList.find((item) => item === msg.msgId)) {
        return '消息已删除';
      }
      if (msg.msgType === 'PICTURE') {
        return `[图片]`;
      }
      return msg.content;
    },
    [msgDeleteList, msgWithdrawList]
  );

  const optList = useMemo(() => {
    const list: ItemType[] = [];
    if (message.userId !== userId) {
      if (message.msgType === 'TEXT') {
        list.push(optQuote);
        list.push(optCopy);
      }
    } else {
      if (message.msgType === 'TEXT') {
        list.push(optQuote);
        list.push(optCopy);
      }
      list.push(optWithdraw);
    }
    return list;
  }, [message]);

  if (msgDeleteList.find((item) => item === message.msgId)) {
    return null;
  }

  return message.withdrawFlag || msgWithdrawList.find((item) => item === message.msgId) ? (
    <div className='chat-static-tips'>{`${message.showName}撤回了一条消息`}</div>
  ) : (
    <div className={`${prefixCls}-container ${actionKey === message.msgId ? 'active' : ''}`} onClick={onClickMessage}>
      <div className={`${prefixCls}-info-header-container`}>
        <div className={`${prefixCls}-info-header-sender`}>
          <span>{message.showName}</span>
        </div>
        <div className={`${prefixCls}-info-header-right-contianer`}>
          <span className={`${prefixCls}-info-header-date`}>{moment(message.msgTime).format('MM-DD HH:mm:ss')}</span>
          {message.userId === userId ? (
            <div className={`${prefixCls}-info-header-tag`}>我</div>
          ) : (
            <div className='other-tag' />
          )}
        </div>
      </div>
      {message.quoteMsg && (
        <div className={`${prefixCls}-info-quote-container`}>
          <div className={`${prefixCls}-info-quote-msg`}>
            <div className={`${prefixCls}-info-quote-name`}>{`${message.quoteMsg.showName}:`}</div>
            <div className={`${prefixCls}-info-quote-content`}>{renderQuote(message.quoteMsg)}</div>
          </div>
        </div>
      )}
      <div className={`${prefixCls}-info-content-container`}>
        {/* 具体内容区域 */}
        {renderCotent}
        {optList.length > 0 && (
          <Dropdown
            className={`${prefixCls}-action-icon`}
            menuOptions={{items: optList, onClick: onMenuClick}}
            icon={<Icon type='ellipsis' style={{fontSize: 18}} />}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
