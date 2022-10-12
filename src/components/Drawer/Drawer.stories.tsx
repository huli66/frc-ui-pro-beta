import React,{useState} from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';
import {List,Row,Col} from 'antd';
import Button from '../Button';
import Radio from '../Radio';
import Divider from '../Divider';
import Drawer,{FRCDrawerProps} from './index'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Drawer } from 'frc-ui-pro';
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
    title: '反馈/Drawer抽屉',
    component: Drawer,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>通过鼠标或键盘，输入范围内的数值。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Drawer</Subheading>
                    <ArgsTable of={Drawer} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Drawer>;

// ----------------------------------------------------------------

export const Default = (args: FRCDrawerProps) => <Drawer {...args} />;

Default.storyName = '默认 Drawer';

// ----------------------------------------------------------------

export const _ABaseComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
    return (<>
        基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭
        <br/>
        <Button onClick={showDrawer}>open</Button>
        <Drawer visible={open} title='title' onClose={onClose} footer='footer'>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
    </>)
};

_ABaseComponent.storyName = '基础抽屉';
_ABaseComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _CPlacementComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [placement, setPlacement] = useState<FRCDrawerProps['placement']>('right')
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (e:any) => {
    setPlacement(e.target.value);
  }
    return (<>
        <Radio.Group value={placement} onChange={handleChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <br/>
        <Button onClick={showDrawer}>open</Button>
        <Drawer visible={open} title='title' placement={placement} onClose={onClose}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
    </>)
};

_CPlacementComponent.storyName = '不同位置';
_CPlacementComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ExtraComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [placement, setPlacement] = useState<FRCDrawerProps['placement']>('right')
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (e:any) => {
    setPlacement(e.target.value);
  }
    return (<>
        在 Ant Design 规范中，操作按钮建议放在抽屉的右上角，可以使用 extra 属性来实现。
        <br/>
        <Radio.Group value={placement} onChange={handleChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <br/>
        <Button onClick={showDrawer}>open</Button>
        <Drawer 
          visible={open}
          title='title'
          placement={placement}
          onClose={onClose}
          extra={
            <>
              <Button style={{marginRight:8}} onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={onClose}>
                OK
              </Button>
            </>
          }
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
    </>)
};

_ExtraComponent.storyName = '额外操作';
_ExtraComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _GetConainerComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const wrapperStyle = {
    position: 'relative',
    height: 200,
    padding: 48,
    overflow: 'hidden',
    textAlign: 'center',
    border: '1px solid #ebedf0',
    borderRadius: 2
  } as React.CSSProperties;
    return (<>
        渲染在当前 dom 里。自定义容器，查看 getContainer。
        <br/>

        <div style={wrapperStyle}>
          Render in this
          <div style={{marginTop: 16}}>
            <Button onClick={showDrawer}>open</Button>
          </div>
          <Drawer 
            visible={open}
            title='title'
            onClose={onClose}
            closable={false}
            style={{position: 'absolute'}}
            getContainer={false}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </div>
    </>)
};

_GetConainerComponent.storyName = '渲染在当前DOM';
_GetConainerComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _MoreComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

    return (<>
        在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。
        <br/>
        <Button onClick={showDrawer}> Open drawer</Button>
        <Drawer 
          visible={open}
          title='Multi-level drawer'
          onClose={onClose}
        >
           <Button type="primary" onClick={showChildrenDrawer}>
            Two-level drawer
          </Button>
          <Drawer 
            visible={childrenDrawer}
            width={320}
            title='Two-level Drawer'
            onClose={onChildrenDrawerClose}
          >
            This is two-level drawer
          </Drawer>
        </Drawer>
    </>)
};

_MoreComponent.storyName = '多层抽屉';
_MoreComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _InfoComponent = () => {
  const [open, setOpen] = useState<boolean>(false);


  interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
  }
  
  const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

    return (<>
        需要快速预览对象概要时使用，点击遮罩区关闭。
        <br/>
        <List
        dataSource={[
          {
            id: 1,
            name: 'Lily',
          },
          {
            id: 2,
            name: 'Lily',
          },
        ]}
        bordered
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Button type='gray' onClick={showDrawer} key={`a-${item.id}`}>
                View Profile
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<span style={{color: 'white'}}>{item.name}</span>}
              description={<span style={{color: 'white'}}>Progresser XTech</span>}
            />
          </List.Item>
        )}
      />
      <Drawer 
        visible={open}
        width={620}
        closable={false}
        onClose={onClose}
        className="info-demo-drawer"
      >
         <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="AntDesign@example.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<Button work type='link'>Lin</Button>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <Button work type='link'>
                  github.com/ant-design/ant-design/
                </Button>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </>)
};

_InfoComponent.storyName = '信息预览抽屉';
_InfoComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

