import {Checkbox, Modal} from '../../../../index';
import React, {useContext, useState} from 'react';
import Store from '../../../../utils/localStorage';
import {ISettings} from '../types';
import { ChatroomContext } from '../context';

interface ISettingProps {
  visible: boolean;
  settings: ISettings;
  onCancel: () => void;
  onOK: (s: ISettings) => void;
}

const Setting = ({visible, settings, onCancel, onOK}: ISettingProps) => {
  const {chatroomCode} = useContext(ChatroomContext)
  const [emojState, setEmojState] = useState(settings.hideCustomEmoj);
  const confirm = () => {
    onOK({hideCustomEmoj: emojState});
    Store.set(`chatroom-${chatroomCode}-hideCustomEmoji`, emojState);
    onCancel();
  };

  return (
    <Modal destroyOnClose visible={visible} title='票据聊天室设置' onCancel={onCancel} onOk={confirm} width={352}>
      <div className='chat-room-setting-list'>
        <div className='chat-room-setting-item'>
          <Checkbox checked={emojState} onChange={(e) => setEmojState(e.target.checked)}>
            屏蔽自定义表情
          </Checkbox>
          <div className='chat-room-setting-item-desc'>*不展示自定义表情图片</div>
        </div>
      </div>
    </Modal>
  );
};

export default Setting;
