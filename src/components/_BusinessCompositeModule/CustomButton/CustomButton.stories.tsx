import React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading,
} from '@storybook/addon-docs';

import { ImportCode } from "../../../utils/importComponent";
import CustomButton, { CustomButtonProps } from './customButton';

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

    // --------------------------------------------------------------

    const code = `
        // import code
        import { CustomButton } from 'frc-ui-pro';
        import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
      `;

    // --------------------------------------------------------------

    const option: CustomButtonProps = {
        type: 'lead',
    }

    return <>
        <ImportCode code={code} />
        <CustomButton {...option}>Custom Button</CustomButton>
    </>
};

Default.storyName = '默认 button';

// ----------------------------------------------------------------