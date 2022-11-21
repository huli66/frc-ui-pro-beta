import React, { ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { FiSearch } from 'react-icons/fi'
import { MenuFoldOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

import { ComponentMeta } from '@storybook/react';
import Highlighter from 'react-highlight-words';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import Input, { FRCInputProps, InputRef } from './index';

import Button from '../Button';
import Select from '../Select';
import { ImportCode } from '../../utils/importComponent';

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Input } from 'frc-ui-pro';

// 按需引入 icon
import { FiSearch } from 'react-icons/fi'
import { MenuFoldOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
~~~
`

    return <>
        <ReactMarkdown children={markdown} components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    />
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                )
            }
        }} /></>
}

// ----------------------------------------------------------------

export default {
    title: '数据录入/Input 输入框',
    component: Input,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>通过鼠标或键盘输入内容，是最基础的表单域的包装。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Input</Subheading>
                    <ArgsTable of={Input}  exclude={["blur", 'focus']}/>
                    <Description>Input 的其他属性和 React 自带的 input 一致。</Description>

                    <Subheading>Input.TextArea</Subheading>
                    <ArgsTable of={Input.TextArea} />
                    <Description>Input.TextArea 的其他属性和浏览器自带的 textarea 一致。</Description>

                    <Subheading>Input.Search</Subheading>
                    <ArgsTable of={Input.Search} />
                    <Description>其余属性和 Input 一致。</Description>

                    <Subheading>Input.Group</Subheading>
                    <ArgsTable of={Input.Group} />

                    <Subheading>Input.Password</Subheading>
                    <ArgsTable of={Input.Password} />

                    <Subheading>Input.InputSelect</Subheading>
                    <ArgsTable
                        of={Input.InputSelect}
                        include={[
                            'options',
                            'dropdownClassName',
                            'dropdownStyle',
                            'width',
                            'onDropdownSelected'
                        ]}
                    />

                    <Subheading>方法</Subheading>
                    <Subheading>Input</Subheading>
                    <ArgsTable of={Input} include={["blur", 'focus']} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Input>;

// ----------------------------------------------------------------

export const Default = (args: FRCInputProps) => <Input {...args} />;

Default.storyName = '默认 input';

// ----------------------------------------------------------------

export const _BaseComponent = () => {
    return (<>
        <Input placeholder="Enter" />

        <Input placeholder="AllowClear" allowClear />

        <Input
            prefix={<FiSearch />}
            placeholder="No Border"
            allowClear
            bordered={false}
        />

        <Input
            prefix={<FiSearch />}
            suffix={<MenuFoldOutlined />}
            placeholder="Icon"
            allowClear
        />

        <br />
        <Input placeholder="Enter" disabled />

        <Input placeholder="AllowClear" allowClear disabled />

        <Input
            prefix={<FiSearch />}
            placeholder="No Border"
            allowClear
            bordered={false}
            disabled
        />

        <Input
            prefix={<FiSearch />}
            placeholder="Icon"
            allowClear
            disabled
        />
    </>)
};

_BaseComponent.storyName = '基本用法 input';
_BaseComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _IconOnlyComponent = () => {
    return (<>
        <Input placeholder="Enter" performance="icon-only" allowClear />
        <Input placeholder="Enter" performance="icon-only" allowClear disabled />
    </>)
};

_IconOnlyComponent.storyName = '图标输入框 icon only';
_IconOnlyComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _SearchComponent = () => {
    return (<>
        <Input.Search placeholder="Enter Search" allowClear style={{ width: 240 }} />
        <Input.Search
            placeholder="Enter"
            allowClear
            onSearch={() => {
                console.log('search')
            }}
            style={{ width: 240 }}
            enterButton="Search"
        />
        <br />
        <Input.Search placeholder="Enter Search" allowClear disabled style={{ width: 240 }} />
        <Input.Search
            placeholder="Enter"
            allowClear
            onSearch={() => {
                console.log('search')
            }}
            style={{ width: 240 }}
            enterButton="Search"
            disabled
        />
    </>)
};

_SearchComponent.storyName = '搜索输入框 search';
_SearchComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _LoadingComponent = () => {
    return (<>
        用于 onSearch 的时候展示 loading。
        <br />
        <Input.Search placeholder="Enter Search" allowClear loading style={{ width: 240 }} />
        <Input.Search
            placeholder="Enter"
            allowClear
            onSearch={() => {
                console.log('search')
            }}
            enterButton="Search"
            loading
            style={{ width: 240 }}
        />
        <br />
        <Input.Search placeholder="Enter Search" allowClear disabled loading style={{ width: 240 }} />
        <Input.Search
            placeholder="Enter"
            allowClear
            onSearch={() => {
                console.log('search')
            }}
            enterButton="Search"
            disabled
            loading
            style={{ width: 240 }}
        />
    </>)
};

_LoadingComponent.storyName = '加载中 loading';
_LoadingComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _GroupComponent = () => {
    return (<>
        输入框的组合展现。
        <br />
        <Input.Group>
            <Input style={{ width: '20%' }} defaultValue="0571" />
            <Input style={{ width: '30%' }} defaultValue="26888888" />
        </Input.Group>
        <Input.Group compact>
            <Input style={{ width: '20%' }} defaultValue="0571" />
            <Input style={{ width: '30%' }} defaultValue="26888888" />
        </Input.Group>
        <Input.Group compact>
            <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
            <Button type="primary">Submit</Button>
        </Input.Group>
        <Input.Group compact>
            <Select defaultValue="Zhejiang">
                <Select.Option value="Zhejiang">Zhejiang</Select.Option>
                <Select.Option value="Jiangsu">Jiangsu</Select.Option>
            </Select>
            <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
        </Input.Group>
    </>)
};

_GroupComponent.storyName = '输入框组 group';
_GroupComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _TextAreaComponent = () => {
    return (<>
        用于多行输入。
        <br />
        <Input.TextArea rows={4} />
    </>)
};

_TextAreaComponent.storyName = '文本域 textArea';
_TextAreaComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ShowCountComponent = () => {
    return (<>
        <Input showCount maxLength={20} />
        <br />
        <Input.TextArea showCount maxLength={100} />
        <br />
        <Input disabled showCount maxLength={20} />
        <br />
        <Input.TextArea disabled showCount maxLength={100} />
    </>)
};

_ShowCountComponent.storyName = '带字数提示 showCount';
_ShowCountComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _PasswordComponent = () => {
    return (<>
        <Input type="password" placeholder="input password" />
        <Input.Password placeholder="input password" />
        <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <br />
        <Input.Password placeholder="input password" disabled />
        <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            disabled
        />
    </>)
};

_PasswordComponent.storyName = '密码框 password';
_PasswordComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZASearchComponent = () => {
    type TOptions = Array<{label:React.ReactNode;value:string}>;

    const {InputSelect} = Input;
    const [options,setOptions] = React.useState<TOptions>([]);

    const mockFetch = (value:string) => {
        return new Promise<TOptions>((resolve) => {
            setTimeout(() => {
                const temp = value? Array.from({length:5}).map((o,i) => ({
                    label:`${value}-${parseInt(`${Math.random() * 100}`)}`,
                    value:`data${i}`
                })):[]
                resolve(temp);
            },300);
        })
    }
    const handleChange =  async (e:ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const opts = await mockFetch(val);
        setOptions(opts);
    }


    const handleSelected = (key:string) => {
        console.log(key)
    }

    return (
        <>
            InputSelect是Input输入框和Dropdown下拉框的结合，用于页面头部搜索，若涉及复杂交互请用Select或Dropdown
            <InputSelect onChange={handleChange} options={options} onDropdownSelected={handleSelected} />
        </>
    )
}

_ZASearchComponent.storyName = '搜索选择框InputSelect';
_ZASearchComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------
export const _ZBSearchComponent = () => {
    type TOptions = Array<{label:React.ReactNode;value:string}>;

    const {InputSelect} = Input;
    const inputRef = React.useRef<InputRef>(null);
    const [options,setOptions] = React.useState<TOptions>([]);
    const [showInput, setShowInput] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>();

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
    const handleChange =  async (e:ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        let opts:any = await mockFetch(val);
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
        console.log(key)
    }
    
    const handleClick = () => {
        setShowInput(true);
        setInputValue('永城煤电控股集团有限公司');
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
    const code = `
    // import code
    import Highlighter from "react-highlight-words";
    // 引入高亮插件
  `;
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
            点击文本切换到搜索输入框，自动填充文本且输入框为选中文本状态，搜索时支持键盘上下键切换选项
            <br/>
            <ImportCode code={code} />
            <ImportCode code={code2} />
            <br/>
            {!showInput ?     
                <span onClick={handleClick} className='header-text'>永城煤电控股集团有限公司</span>
                :
                <InputSelect 
                    prefix={<FiSearch />}
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

_ZBSearchComponent.storyName = '用InputSelect实现头部搜索';
_ZBSearchComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _ZRefComponent = () => {
    const inputRef = React.useRef<InputRef>(null);

    const hanldeClick = () => {
        inputRef.current?.focus();
    }

    return (
        <>
            <Input ref={inputRef} />
            <Button onClick={hanldeClick}>input focus</Button>
        </>
    )
}

_ZRefComponent.storyName = 'Input methods';
_ZRefComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};