import {Button, Filter, Icon, Tooltip} from '../../../../index';
import React, {useContext, useState} from 'react';
import {message} from 'antd';
import {EmojiNames} from './const';
import EmojiUpload from './upload';
import {ChatroomContext} from '../context';

interface IProps {
  canSendMsg: boolean;
}

const Emojis = ({canSendMsg}: IProps) => {
  const {setCurrentInfo, anonymous, customEmojiList, updateEmojiList, closeEmoji, chatroomApi} = useContext(ChatroomContext);
  const {deleteEmoji, getCompleteUrl, sendMessage} = chatroomApi;
  const [selectedEmoji, setSelectedEmoji] = useState<Array<string | number>>(['EMOJI']);
  const [editing, setEditing] = useState(false);
  const addEmoji = (str: string) => {
    canSendMsg && setCurrentInfo((old) => `${old}[emoji${str}]`);
    // setTimeout(() => focusOnTextarea(), 0);
  };

  const sendImage = (url: string) => {
    canSendMsg &&
      sendMessage({
        msgType: 'PICTURE',
        content: url,
        quoteId: null,
        chatAnonymous: anonymous
      }).then(() => {
        closeEmoji();
      });
  };

  const deleteImg = (id: number) => {
    deleteEmoji(id).then((res) => {
      if (res.data) {
        updateEmojiList();
      } else {
        message.error('删除失败');
      }
    });
  };

  const editHandle = () => {
    if (editing) {
      updateEmojiList();
    }
    setEditing(!editing);
  };

  return (
    <div className='chatroom-emojis'>
      <div className='chatroom-emoji-tabs'>
        <div
          className={`chatroom-emoji-tabs-inner ${selectedEmoji?.[0] === 'CUSTOM' ? 'custom-active' : 'emoji-active'}`}
        >
          <div className='chatroom-emojis-list'>
            {EmojiNames?.map((item) => (
                <div className='emoji-item' key={`emoji-${item}`}>
                  <div className={`emojione ${item}`} onClick={() => addEmoji(item)} />
                </div>
              )
            )}
          </div>
          <div className='chatroom-emojis-list'>
            {customEmojiList?.map(({id, emojiUrl}) => {
              return (
                <div key={`emoji-${id}`} className={`custom-item ${editing && 'can-be-delete'}`} onClick={() => sendImage(emojiUrl)}>
                  <Tooltip
                    placement='top'
                    title={
                      <div className='preview-emoji' style={{width: '150px', height: '150px'}}>
                        <img style={{maxWidth: '150px', maxHeight: '150px'}} alt='' src={getCompleteUrl(emojiUrl)} />
                      </div>
                    }
                  >
                    <img className='custom-item-img' alt='' src={getCompleteUrl(emojiUrl)} />
                  </Tooltip>
                  <div
                    className='delete-mask'
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImg(id);
                    }}
                    onMouseEnter={(e) => e.stopPropagation()}
                  >
                    <Icon type='delete' />
                  </div>
                </div>
              );
            })}
            <div className='custom-item'>
              <EmojiUpload onSuccess={updateEmojiList} />
            </div>
          </div>
        </div>
      </div>
      <Filter
        showAll={false}
        options={[
          {label: <Icon type='smile-o' style={{fontSize: '16px', cursor: 'pointer'}} />, value: 'EMOJI'},
          {label: <Icon type='star' style={{fontSize: '16px', cursor: 'pointer'}} />, value: 'CUSTOM'}
        ]}
        value={selectedEmoji}
        onChange={(val) => setSelectedEmoji(val)}
      />
      {selectedEmoji?.[0] === 'CUSTOM' && (
        <Button onClick={() => editHandle()} className='edit-custom-emoji' type='default'>
          {editing ? '完成' : '编辑'}
        </Button>
      )}
    </div>
  );
};

export default Emojis;
