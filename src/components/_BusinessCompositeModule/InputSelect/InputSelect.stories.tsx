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

import {SearchOutlined} from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import InputSelect, { FRCInputSelectProps } from './inputSelect';
import {InputRef} from '../../Input';
import {ImportCode} from '../../../utils/importComponent'

// --------------------------------------------------------------

const importCode = `
// import code
import { InputSelect } from 'frc-ui-pro';
import { FRCInputSelectProps } from "frc-ui-pro/dist/src/components/_BusinessCompositeModule/CustomButton";
import { InputRef } from "frc-ui-pro/dist/src/components/Input";

// 引入高亮插件
import Highlighter from "react-highlight-words";
`;

// --------------------------------------------------------------

export default {
    title: '业务模块/InputSelect ',
    component: InputSelect,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>业务组件：搜索选择</Description>
                    <Description>
                        InputSelect是Input输入框和Dropdown下拉框的结合，用于页面头部搜索，若涉及复杂交互请用Select或Dropdown。
                    </Description>
                    <Description>
                        点击标题文本切换到搜索输入框，自动填充文本且输入框为选中文本状态，搜索时支持键盘上下键切换选项，选中某项后更改标题文本。
                    </Description>
                    <Source
                        dark
                        language="ts"
                        code={importCode}
                    />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>InputSelect</Subheading>
                    <ArgsTable
                        of={InputSelect}
                        include={[
                            'options',
                            'dropdownClassName',
                            'dropdownStyle',
                            'width',
                            'onDropdownSelected'
                        ]}
                    />
                    <Description>InputSelect 的其他属性和 Input 一致。</Description>
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof InputSelect>;

// ----------------------------------------------------------------

// ----------------------------------------------------------------
export const Default = () => {
    type TOptions = Array<{label:React.ReactNode;value:string}>;

    const inputRef = React.useRef<InputRef>(null);
    const [options,setOptions] = React.useState<TOptions>([]);
    const [showInput, setShowInput] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>();
    const [title,setTitle] = React.useState<string>('永城煤电控股集团有限公司');

    const cacheOpts = React.useRef<Array<{label:string;value:string}>>(); 

    const mockFetch = (value:string) => {
        return new Promise<Array<{label:string;value:string}>>((resolve) => {
            setTimeout(() => {
                const temp = value? Array.from({length:5}).map((o,i) => ({
                    label:`${value}-${parseInt(`${Math.random() * 100}`)}`,
                    value:`data${i}`
                })):[]
                resolve(temp);
            },300);
        })
    }
    const handleChange =  async (e:React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        let opts:any = await mockFetch(val);
        cacheOpts.current = opts;
        opts = opts.map((o:any) => ({
            value:o.value,
            label: (
                <Highlighter
                    textToHighlight={o.label}
                    searchWords={[val]}
                    autoEscape
                    unhighlightStyle={{color: '#FFEBC8'}}
                    highlightStyle={{
                        color: '#F9C152',
                        background: 'none',
                        padding: 0,
                        margin: 0,
                        letterSpacing: 0
                    }}
                />)
        }))
        setOptions(opts);
    }


    const handleSelected = (key:string) => {
        console.log(key);
        const one = (cacheOpts.current || []).find(o => o.value === key);
        setTitle(one?.label || '');
    }
    
    const handleClick = () => {
        setShowInput(true);
        setInputValue(title);
    }

    const handleBlur = () => {
        setShowInput(false);
        setOptions([]);
    }

    React.useEffect(() => {
        if(showInput) {
            inputRef.current?.select();
            inputRef.current?.focus();
        }
    },[showInput])

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
            <ImportCode code={code2} />
            <br/>
            {!showInput ?     
                <span onClick={handleClick} className='header-text'>{title}</span>
                :
                <InputSelect 
                    prefix={<SearchOutlined />}
                    width={300}
                    dropdownStyle={{width:320}}
                    ref={inputRef}
                    value={inputValue}
                    allowClear
                    options={options}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onDropdownSelected={handleSelected}
                />
            }
        </>
    )
}

Default.storyName = '用InputSelect实现头部搜索';
Default.parameters = {
    controls: { hideNoControlsWarning: true },
};
// --------------------------------------------------------