import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
} from '@storybook/addon-docs';

import Loading from './index';

export default {
    title: '通用/加载中 Loading',
    component: Loading,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description >加载中。</Description>
                    <Subtitle>组件展示</Subtitle>
                    <Primary />
                    <ArgsTable of={Loading} />
                    <Stories title={"加载中 Loading"} includePrimary={true} />
                </>
            ),
        },
    },
} as ComponentMeta<typeof Loading>;

export const Default = (args: any) => (
    <div style={{ width: "100%", height: 300, overflow: "hidden" }}>
        <Loading {...args} />
        <div style={{ width: "100%", height: 300, background: '#c70025' }}>
            123
        </div>
    </div>
);

Default.storyName = '默认 loading';