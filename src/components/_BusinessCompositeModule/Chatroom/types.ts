import { AxiosResponse, AxiosStatic } from "axios";

/**
 * 聊天室组件参数
 * @property chatroomCode 聊天室代码，唯一标识
 * @property chatroomName 聊天室名称
 * @property permission 权限
 * @property axios axios 方法
 * @property openNewWindow 方法，右上角弹出按钮事件
 */
export interface IChatroomProps {
  chatroomCode: string;
  chatroomName: string;
  axios: AxiosStatic;
  permission: boolean;
  userId: string;
  openNewWindow: () => void;
}

export interface IChatProps {
  chatroomName: string;
  chatroomCode: string;
  permission: boolean;
  chatroomApi: IChatroomApi;
  userId: string;
  openNewWindow: () => void;
}

type MsgType = 'TEXT' | 'PICTURE';

/** 发送消息 */
export interface ISendMsgParams {
  content: string;
  chatAnonymous: boolean;
  msgType: MsgType;
  quoteId: number | null;
}

/** 收到消息 */
export interface IMsgStruct {
  content: string;
  msgId: number;
  /** 消息类型，TEXT-文本, PICTURE-图片 */
  msgType: MsgType;
  /** 消息时间戳 */
  msgTime: number;
  showName: string;
  withdrawFlag: boolean;
  /** 引用的消息 */
  quoteMsg: IMsgStruct | null;
  userId: string;
}

export interface ILatestMsgList {
  maxMsgDeleteId: number;
  maxMsgWithdrawId: number;
  onlineSize: number;
  messageList: IMsgStruct[];
}

export interface IMsgProps {
  prefixCls: string;
  message: IMsgStruct;
  actionKey: number;
  handleMessageClick: (key: number) => void;
}

/** 聊天室配置 */
export interface IChatConfig {
  /** 是否全员禁言 */
  chatAllBan: boolean;
  /** 允许匿名 */
  chatAnonymous: boolean;
  /** 个人是否进入黑名单 */
  chatBan: boolean;
  /** 输入长度限制 */
  chatLenLimit: number;
}

/** 长轮询入参 */
export interface ILongPullParams {
  maxMsgDeleteId: number;
  maxMsgId: number;
  maxMsgWithdrawId: number;
  pageSize: number;
}

/** 长轮询数据 */
export interface ILongPullProps {
  configRespVo: IChatConfig;
  messageList: IMsgStruct[];
  msgDeleteList: {msgId: number; operateId: number}[];
  msgWithdrawList: {msgId: number; operateId: number}[];
  onlineSize: number;
}

/** 设置项 */
export interface ISettings {
  hideCustomEmoj: boolean;
}

/** 自定义表情项 */
export interface IEmojiListItem {
  emojiUrl: string;
  id: number;
}

export type IQuoteMsg = IMsgStruct | null;

/** context props */
export interface IChatroomContext {
  settings: ISettings;
  setSettings: (s: ISettings) => void;
  quoteMsg: IQuoteMsg;
  setQuoteMsg: (q: IQuoteMsg) => void;
  focusOnTextarea: () => void;
  msgDeleteList: number[];
  msgWithdrawList: number[];
  currentInfo: string;
  setCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
  chatConfig: IChatConfig;
  customEmojiList: IEmojiListItem[];
  updateEmojiList: () => void;
  closeEmoji: () => void;
  getMoreMsg: () => void;
  anonymous: boolean;
  chatroomCode: string;
  chatroomApi: IChatroomApi;
  userId: string;
}

/** chatroom apis */
export interface IChatroomApi {
  /** 获取最新消息 */
  getLatestMessage: () => Promise<AxiosResponse<any, any>>,
  /** 历史消息 */
  getHistoryMessage: (minMsgId: number) => Promise<AxiosResponse<any, any>>,
  sendMessage: (params: ISendMsgParams) => Promise<AxiosResponse<any, any>>,
  withdrawMessage: (msgId: number) => Promise<AxiosResponse<any, any>>,
  longpullMessage: (params: ILongPullParams) => Promise<AxiosResponse<any, any>>,
  getChatroomConfig: () => Promise<AxiosResponse<any, any>>,
  getEmojiList: () => Promise<AxiosResponse<any, any>>,
  uploadEmoji: (formData: FormData) => Promise<AxiosResponse<any, any>>,
  collectEmoji: (fileUrl: string) => Promise<AxiosResponse<any, any>>,
  deleteEmoji: (id: number) => Promise<AxiosResponse<any, any>>,
  getCompleteUrl: (str: string) => string
}