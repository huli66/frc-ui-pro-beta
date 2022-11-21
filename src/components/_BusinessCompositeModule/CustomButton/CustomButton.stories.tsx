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

import CustomButton, { CustomButtonProps } from './customButton';

// --------------------------------------------------------------

const importCode = `
// import code
import { CustomButton } from 'frc-ui-pro';
import { CustomButtonProps } from "frc-ui-pro/components/_BusinessCompositeModule/CustomButton";
`;

// --------------------------------------------------------------

export default {
    title: '业务模块/Custom Button ',
    component: CustomButton,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>业务组件：自定义按钮</Description>
                    <Description>其他描述...................</Description>
                    <Source
                        dark
                        language="ts"
                        code={importCode}
                    />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Custom Button</Subheading>
                    <ArgsTable of={CustomButton} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof CustomButton>;

// ----------------------------------------------------------------

export const Default = () => {
    const option: CustomButtonProps = {
        type: 'lead',
    }

    return <>
        <CustomButton {...option}>Custom Button</CustomButton>
    </>
};

Default.storyName = '默认 button';

// ----------------------------------------------------------------