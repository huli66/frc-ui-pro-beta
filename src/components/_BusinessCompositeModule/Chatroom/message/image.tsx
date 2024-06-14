import React, {useContext, useEffect, useState} from 'react';
import {Icon} from '../../../../index';
import {message} from 'antd';
import {IMsgStruct} from '../types';
import {ChatroomContext} from '../context';

interface IProps {
  msg: IMsgStruct;
}

const CustomImage = ({msg}: IProps) => {
  const {customEmojiList, updateEmojiList, chatroomApi} = useContext(ChatroomContext);
  const {collectEmoji, getCompleteUrl} = chatroomApi;
  const [hasCollected, setHasCollected] = useState(false);

  useEffect(() => {
    const idx = customEmojiList.find((item) => item.emojiUrl === msg.content);
    if (idx) {
      setHasCollected(true);
    } else {
      setHasCollected(false);
    }
  }, [customEmojiList, msg.content]);

  const collectImage = () => {
    collectEmoji(msg.content).then((res) => {
      if (res.data) {
        message.success('收藏成功');
        updateEmojiList();
      } else {
        message.error('收藏失败');
      }
    });
  };

  return (
    <div className='image-msg-container'>
      <img alt='' src={getCompleteUrl(msg.content)} />
      <div className='image-msg-mask'>
        {hasCollected ? (
          '已收藏'
        ) : (
          <Icon
            type='star'
            onClick={() => collectImage()}
            style={{fontSize: '100px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer'}}
          />
        )}
      </div>
    </div>
  );
};

export default CustomImage;
