import { AxiosStatic } from "axios";
import { IChatroomApi, ILongPullParams, ISendMsgParams } from "./types";

const useChatroomApi = (chatroomCode: string, axios: AxiosStatic, chatroomUrl = '/node/api/k8s/chat-room'): IChatroomApi => {
  /** 获取最新消息 */
  const getLatestMessage = () => {
      return axios({
      url: `${chatroomUrl}/message/${chatroomCode}/latest?pageSize=50`,
      method: 'get'
      });
  };
  
  /** 历史消息 */
  const getHistoryMessage = (minMsgId: number) => {
    return axios({
      url: `${chatroomUrl}/message/${chatroomCode}/history?pageSize=50&minMsgId=${minMsgId}`,
      method: 'get'
    });
  };
  
  /** 发送消息 */
  const sendMessage = (params: ISendMsgParams) => {
    return axios({
      url: `${chatroomUrl}/message/${chatroomCode}/send`,
      method: 'post',
      data: params
    });
  };
  
  /** 撤回消息 */
  const withdrawMessage = (msgId: number) => {
    return axios({
      url: `${chatroomUrl}/message/${chatroomCode}/withdraw/${msgId}`,
      method: 'post'
    });
  };
  
  /**
   * 订阅消息
   * 消息获取方式，轮询(因为其他业务踩坑说长连接存在峰值客户端处理异常)
   */
  const longpullMessage = (params: ILongPullParams) => {
    return axios({
      url: `${chatroomUrl}/message/${chatroomCode}/long-poll`,
      method: 'post',
      data: params
    });
  };
  
  /** 获取聊天室配置 */
  const getChatroomConfig = () => {
    return axios({
      url: `${chatroomUrl}/chatroom/${chatroomCode}/config`,
      method: 'get'
    });
  };
  
  /** 获取 emoji 列表 */
  const getEmojiList = () => {
    return axios({
      url: `${chatroomUrl}/emoji/${chatroomCode}`,
      method: 'get'
    });
  };
  
  /** 上传 emoji */
  const uploadEmoji = (formData: FormData) => {
    return axios({
      url: `${chatroomUrl}/emoji/${chatroomCode}/upload`,
      method: 'post',
      data: formData
    });
  };
  
  /** 收藏 emoji */
  const collectEmoji = (fileUrl: string) => {
    return axios({
      url: `${chatroomUrl}/emoji/${chatroomCode}/collect?fileUrl=${fileUrl}`,
      method: 'post',
      data: {fileUrl}
    });
  };
  
  /** 删除 emoji */
  const deleteEmoji = (id: number) => {
    return axios({
      url: `${chatroomUrl}/emoji/${chatroomCode}/${id}`,
      method: 'delete'
    });
  };
  
  /** 获取自定义表情图片完整地址 */
  const getCompleteUrl = (str: string) => `${chatroomUrl}${str}`;
  
  return {
    getLatestMessage,
    getHistoryMessage,
    sendMessage,
    withdrawMessage,
    longpullMessage,
    getChatroomConfig,
    getEmojiList,
    uploadEmoji,
    collectEmoji,
    deleteEmoji,
    getCompleteUrl
  }
}

export default useChatroomApi;
