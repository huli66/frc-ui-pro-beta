import React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading,
    Source
} from '@storybook/addon-docs';

import Chatroom, { IChatroomProps } from './index';
import axios from 'axios';

// --------------------------------------------------------------

const importCode = `
// import code
import { Chatroom } from 'frc-ui-pro';
import { IChatroomProps } from "frc-ui-pro/dist/src/components/_BusinessCompositeModule/Chatroom";

`;

// --------------------------------------------------------------

export default {
    title: '业务模块/Chatroom ',
    component: Chatroom,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>业务组件：聊天室</Description>
                    <Description>
                        Chatroom 是一个聊天室组件，用于在页面中债展示一个聊天室，供客户进行业务交流，每个业务界面对应的聊天室是单独的，例如转贴现界面的票据聊天室。
                    </Description>
                    <Description>
                        可以发送文字消息（包括emoji）或者自定义表情图片，查看消息记录，消息引用撤回复制，设置匿名等。
                    </Description>
                    <Source
                        dark
                        language="ts"
                        code={importCode}
                    />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Chatroom</Subheading>
                    <ArgsTable
                        of={Chatroom}
                        include={[
                            'chatroomCode',
                            'permission',
                            'axios',
                        ]}
                    />
                    <Description>在开发环境中需要在请求头携带 userId。</Description>
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Chatroom>;

// ----------------------------------------------------------------

// ----------------------------------------------------------------
export const Default = () => {


// -----------------------------------------------------
      const code2 = `
    .header-text {
        font-size: 24px;
        color: #FFEBC8;
        padding:0 4px;
        cursor: pointer;
    }
    .header-text:hover{
      background-color:#133E38;
    }
  `;
// --------------------------------------------------------
    return (
        <>
            <Chatroom 
                chatroomCode='rediscount'
                permission={true}
                axios={axios}
            />
        </>
    )
}

Default.storyName = '票据聊天室';
Default.parameters = {
    controls: { hideNoControlsWarning: true },
};
// --------------------------------------------------------