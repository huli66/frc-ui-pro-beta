import React from 'react';
import {IChatConfig, IChatroomContext} from './types';

export const ChatroomContext = React.createContext<IChatroomContext>({
  settings: {hideCustomEmoj: true},
  setSettings: () => ({}),
  quoteMsg: null,
  setQuoteMsg: () => ({}),
  focusOnTextarea: () => ({}),
  msgDeleteList: [],
  msgWithdrawList: [],
  currentInfo: '',
  setCurrentInfo: () => ({}),
  chatConfig: {} as IChatConfig,
  customEmojiList: [],
  updateEmojiList: () => ({}),
  closeEmoji: () => ({}),
  getMoreMsg: () => ({}),
  anonymous: false,
  chatroomCode: '',
  chatroomApi: {} as any
});
