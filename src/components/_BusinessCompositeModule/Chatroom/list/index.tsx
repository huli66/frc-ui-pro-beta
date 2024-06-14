import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Virtuoso, VirtuosoHandle} from 'react-virtuoso';
import {IChatConfig, IMsgStruct} from '../types';
import Message from '../message';

interface IProps {
  msgList: IMsgStruct[];
  chatConfig: IChatConfig;
  moreMsg: () => void;
}

export interface IListRefProps {
  shouldShowBtn: () => void;
  goToBottom: () => void;
  showLastPage: () => void;
}

const List = forwardRef((props: IProps, ref: React.Ref<IListRefProps>) => {
  const {msgList, chatConfig, moreMsg} = props;
  const [actionKey, setActionKey] = useState<number>(-1);
  const [showBtn, setShowBtn] = useState(false);
  const msgListContainerRef = useRef<HTMLDivElement>(null);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [shouldShowNew, setShouldShowNew] = useState(true); // 是否直接滚动到新消息

  const showLastPage = () => {
    // eslint-disable-next-line no-unused-expressions
    virtuosoRef.current?.scrollToIndex({index: 48, align: 'start'});
  };

  const virtuosoToBottom = () => {
    // eslint-disable-next-line no-unused-expressions
    virtuosoRef.current?.scrollToIndex({index: 'LAST', align: 'start'});
    setShowBtn(false);
  };

  const shouldShowNewButton = () => {
    if (shouldShowNew) {
      virtuosoToBottom();
    } else {
      setShowBtn(true);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      shouldShowBtn: shouldShowNewButton,
      goToBottom: virtuosoToBottom,
      showLastPage
    };
  });

  const handleMessageClick = (key: number) => {
    if (key !== actionKey) {
      setActionKey(key);
    }
  };

  useEffect(() => {
    const cancelClickEvent = (e: any) => {
      const el = e && e.target;
      if (el) {
        const dom = el.closest('.chat-body-container');
        if (!dom) {
          setActionKey(-1);
        }
      }
    };
    document.addEventListener('click', cancelClickEvent);
    return () => {
      document.removeEventListener('click', cancelClickEvent);
    };
  }, []);

  return (
    <div className='chat-body-container' ref={msgListContainerRef}>
      {showBtn ? (
        <div className={`chat-message-scroll-to-bottom ${''}`} onClick={() => virtuosoToBottom()}>
          最新消息
        </div>
      ) : null}
      <Virtuoso
        ref={virtuosoRef}
        style={{height: '100%'}}
        totalCount={msgList.length}
        data={msgList}
        rangeChanged={(e) => {
          if (e.endIndex === msgList.length - 1) {
            setShowBtn(false);
            setShouldShowNew(true);
          } else {
            setShouldShowNew(false);
          }
        }}
        components={{
          Header: () => {
            return (
              <div className='chat-static-tips interable' onClick={() => moreMsg()}>
                加载更多数据...
              </div>
            );
          },
          Footer: () => {
            return chatConfig.chatAllBan ? <div className='chat-all-ban'>全员禁言</div> : null;
          }
        }}
        itemContent={(index, item) => (
          <Message
            prefixCls='chat-message'
            message={item}
            actionKey={actionKey}
            handleMessageClick={handleMessageClick}
          />
        )}
      />
    </div>
  );
});

export default List;
