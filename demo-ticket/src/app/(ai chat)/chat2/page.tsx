'use client'

import {
    AppstoreAddOutlined,
    CloudUploadOutlined,
    CommentOutlined,
    CopyOutlined,
    DeleteOutlined,
    DislikeOutlined,
    EditOutlined,
    EllipsisOutlined,
    FileSearchOutlined,
    HeartOutlined,
    LikeOutlined,
    PaperClipOutlined,
    PlusOutlined,
    ProductOutlined,
    QuestionCircleOutlined,
    ReloadOutlined,
    ScheduleOutlined,
    ShareAltOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import {
    Attachments,
    Bubble,
    Conversations,
    Prompts,
    Sender,
    Welcome,
} from '@ant-design/x';
import { Avatar, Button, Flex, type GetProp, Space, Spin, message } from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import LoadingDots from '@/components/loadings/LoadingDots';
import { useChat, type MessageInfo } from '@/hooks/useChat';

const DEFAULT_CONVERSATIONS_ITEMS = [
    {
      key: 'default-0',
      label: 'What is Ant Design X?',
      group: 'Today',
    },
    {
      key: 'default-1',
      label: 'How to quickly install and import components?',
      group: 'Today',
    },
    {
      key: 'default-2',
      label: 'New AGI Hybrid Interface',
      group: 'Yesterday',
    },
];

const HOT_TOPICS = {
    key: '1',
    label: 'Hot Topics',
    children: [
      {
        key: '1-1',
        description: 'What has Ant Design X upgraded?',
        icon: <span style={{ color: '#f93a4a', fontWeight: 700 }}>1</span>,
      },
      {
        key: '1-2',
        description: 'New AGI Hybrid Interface',
        icon: <span style={{ color: '#ff6565', fontWeight: 700 }}>2</span>,
      },
      {
        key: '1-3',
        description: 'What components are in Ant Design X?',
        icon: <span style={{ color: '#ff8f1f', fontWeight: 700 }}>3</span>,
      },
      {
        key: '1-4',
        description: 'Come and discover the new design paradigm of the AI era.',
        icon: <span style={{ color: '#00000040', fontWeight: 700 }}>4</span>,
      },
      {
        key: '1-5',
        description: 'How to quickly install and import components?',
        icon: <span style={{ color: '#00000040', fontWeight: 700 }}>5</span>,
      },
    ],
};

const DESIGN_GUIDE = {
    key: '2',
    label: 'Design Guide',
    children: [
      {
        key: '2-1',
        icon: <HeartOutlined />,
        label: 'Intention',
        description: 'AI understands user needs and provides solutions.',
      },
      {
        key: '2-2',
        icon: <SmileOutlined />,
        label: 'Role',
        description: "AI's public persona and image",
      },
      {
        key: '2-3',
        icon: <CommentOutlined />,
        label: 'Chat',
        description: 'How AI Can Express Itself in a Way Users Understand',
      },
      {
        key: '2-4',
        icon: <PaperClipOutlined />,
        label: 'Interface',
        description: 'AI balances "chat" & "do" behaviors.',
      },
    ],
};

const SENDER_PROMPTS: GetProp<typeof Prompts, 'items'> = [
    {
      key: '1',
      description: 'Upgrades',
      icon: <ScheduleOutlined />,
    },
    {
      key: '2',
      description: 'Components',
      icon: <ProductOutlined />,
    },
    {
      key: '3',
      description: 'RICH Guide',
      icon: <FileSearchOutlined />,
    },
    {
      key: '4',
      description: 'Installation Introduction',
      icon: <AppstoreAddOutlined />,
    },
];

const useStyle = createStyles(({ token, css }) => {
    return {
      layout: css`
        width: 100%;
        min-width: 1000px;
        height: 100vh;
        display: flex;
        background: ${token.colorBgContainer};
        font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      `,
      // sider
      sider: css`
        background: ${token.colorBgLayout}80;
        width: 280px;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 12px;
        box-sizing: border-box;
      `,
      logo: css`
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0 24px;
        box-sizing: border-box;
        gap: 8px;
        margin: 24px 0;
  
        span {
          font-weight: bold;
          color: ${token.colorText};
          font-size: 16px;
        }
      `,
      addBtn: css`
        background: #1677ff0f;
        border: 1px solid #1677ff34;
        height: 40px;
      `,
      conversations: css`
        flex: 1;
        overflow-y: auto;
        margin-top: 12px;
        padding: 0;
  
        .ant-conversations-list {
          padding-inline-start: 0;
        }
      `,
      siderFooter: css`
        border-top: 1px solid ${token.colorBorderSecondary};
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `,
      // chat list 样式
      chat: css`
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding-block: ${token.paddingLG}px;
        gap: 16px;
      `,
      chatPrompt: css`
        .ant-prompts-label {
          color: #000000e0 !important;
        }
        .ant-prompts-desc {
          color: #000000a6 !important;
          width: 100%;
        }
        .ant-prompts-icon {
          color: #000000a6 !important;
        }
      `,
      chatList: css`
        flex: 1;
        overflow: auto;
      `,
      loadingMessage: css`
        background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
        background-size: 100% 2px;
        background-repeat: no-repeat;
        background-position: bottom;
      `,
      placeholder: css`
        padding-top: 32px;
      `,
      // sender
      sender: css`
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
      `,
      speechButton: css`
        font-size: 18px;
        color: ${token.colorText} !important;
      `,
      senderPrompt: css`
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
        color: ${token.colorText};
      `,
    };
});

const Independent: React.FC = () => {
    const { styles } = useStyle();
    const abortController = useRef<AbortController>(null);
    const [isReady, setIsReady] = useState(false);
  
    // ==================== State ====================
    const [messageHistory, setMessageHistory] = useState<Record<string, MessageInfo[]>>({});
    const [conversations, setConversations] = useState(DEFAULT_CONVERSATIONS_ITEMS);
    const [curConversation, setCurConversation] = useState(DEFAULT_CONVERSATIONS_ITEMS[0].key);
  
    const [attachmentsOpen, setAttachmentsOpen] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<GetProp<typeof Attachments, 'items'>>([]);
  
    const [inputValue, setInputValue] = useState('');

    const { messages, loading, sendMessage, clearMessages } = useChat();
  
    // ==================== Event ====================
    const onSubmit = async (val: string) => {
      if (!val) return;
      await sendMessage(val);
    };

    useEffect(() => {
      // history mock
      if (messages?.length) {
        setMessageHistory((prev) => ({
          ...prev,
          [curConversation]: messages,
        }));
      }
    }, [messages, curConversation]);
  
    useEffect(() => {
      // Show loading for at least 1 second and wait for conversations to be ready
      const timer = setTimeout(() => {
        if (conversations.length > 0) {
          setIsReady(true);
        }
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [conversations]);

    useEffect(() => {
      // When conversation changes, load messages from history or clear them
      const historyMessages = messageHistory[curConversation];
      if (historyMessages) {
        clearMessages();
        historyMessages.forEach(msg => {
          sendMessage(msg.message.content);
        });
      } else {
        clearMessages();
      }
    }, [curConversation]);
  
    if (!isReady) {
      return (
        <div style={{ 
          height: '90vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'white' 
        }}>
          <LoadingDots text="Initializing chat..." />
        </div>
      );
    }
  
    // ==================== Render =================
    return (
      <div className={styles.layout} style={{ height: '90vh' }}>
        {/* 🌟 Chat Sider */}
        <div className={styles.sider}>
          {/* 🌟 Logo */}
          <div className={styles.logo}>
            <img
              src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
              draggable={false}
              alt="logo"
              width={24}
              height={24}
            />
            <span>Ant Design X</span>
          </div>
  
          <Button
            onClick={() => {
              if (loading) {
                message.error(
                  'Message is Requesting, you can create a new conversation after request done or abort it right now...',
                );
                return;
              }
  
              const now = dayjs().valueOf().toString();
              setConversations([
                {
                  key: now,
                  label: `New Conversation ${conversations.length + 1}`,
                  group: 'Today',
                },
                ...conversations,
              ]);
              setCurConversation(now);
              clearMessages();
            }}
            type="link"
            className={styles.addBtn}
            icon={<PlusOutlined />}
          >
            New Conversation
          </Button>
  
          <Conversations
            items={conversations}
            className={styles.conversations}
            activeKey={curConversation}
            onActiveChange={async (val) => {
              abortController.current?.abort();
              setTimeout(() => {
                setCurConversation(val);
              }, 100);
            }}
            groupable
            styles={{ item: { padding: '0 8px' } }}
            menu={(conversation) => ({
              items: [
                {
                  label: 'Rename',
                  key: 'rename',
                  icon: <EditOutlined />,
                },
                {
                  label: 'Delete',
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => {
                    const newList = conversations.filter((item) => item.key !== conversation.key);
                    const newKey = newList?.[0]?.key;
                    setConversations(newList);
                    setTimeout(() => {
                      if (conversation.key === curConversation) {
                        setCurConversation(newKey);
                      }
                    }, 200);
                  },
                },
              ],
            })}
          />
  
          <div className={styles.siderFooter}>
            <Avatar size={24} />
            <Button type="text" icon={<QuestionCircleOutlined />} />
          </div>
        </div>
  
        <div className={styles.chat}>
          {/* 🌟 Chat List */}
          <div className={styles.chatList}>
            {messages?.length ? (
              <Bubble.List
                items={messages?.map((i) => ({
                  ...i.message,
                  classNames: {
                    content: i.status === 'loading' ? styles.loadingMessage : '',
                  },
                  typing: i.status === 'loading' ? { step: 5, interval: 20, suffix: <>💗</> } : false,
                }))}
                style={{ height: '100%', paddingInline: 'calc(calc(100% - 700px) /2)' }}
                roles={{
                  assistant: {
                    placement: 'start',
                    footer: (
                      <div style={{ display: 'flex' }}>
                        <Button type="text" size="small" icon={<ReloadOutlined />} />
                        <Button type="text" size="small" icon={<CopyOutlined />} />
                        <Button type="text" size="small" icon={<LikeOutlined />} />
                        <Button type="text" size="small" icon={<DislikeOutlined />} />
                      </div>
                    ),
                    loadingRender: () => <Spin size="small" />,
                  },
                  user: { placement: 'end' },
                }}
              />
            ) : (
              <Space
                direction="vertical"
                size={16}
                style={{ paddingInline: 'calc(calc(100% - 700px) /2)' }}
                className={styles.placeholder}
              >
                <Welcome
                  variant="borderless"
                  icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                  title="Hello, I'm Ant Design X"
                  description="Base on Ant Design, AGI product interface solution, create a better intelligent vision~"
                  extra={
                    <Space>
                      <Button icon={<ShareAltOutlined />} />
                      <Button icon={<EllipsisOutlined />} />
                    </Space>
                  }
                />
                <Flex gap={16}>
                  <Prompts
                    items={[HOT_TOPICS]}
                    styles={{
                      list: { height: '100%' },
                      item: {
                        flex: 1,
                        backgroundImage: 'linear-gradient(123deg, #e5f4ff 0%, #efe7ff 100%)',
                        borderRadius: 12,
                        border: 'none',
                      },
                      subItem: { padding: 0, background: 'transparent' },
                    }}
                    onItemClick={(info) => {
                      onSubmit(info.data.description as string);
                    }}
                    className={styles.chatPrompt}
                  />
  
                  <Prompts
                    items={[DESIGN_GUIDE]}
                    styles={{
                      item: {
                        flex: 1,
                        backgroundImage: 'linear-gradient(123deg, #e5f4ff 0%, #efe7ff 100%)',
                        borderRadius: 12,
                        border: 'none',
                      },
                      subItem: { background: '#ffffffa6' },
                    }}
                    onItemClick={(info) => {
                      onSubmit(info.data.description as string);
                    }}
                    className={styles.chatPrompt}
                  />
                </Flex>
              </Space>
            )}
          </div>
  
          {/* 🌟 Chat Sender */}
          <Sender.Header
            title="Upload File"
            open={attachmentsOpen}
            onOpenChange={setAttachmentsOpen}
            styles={{ content: { padding: 0 } }}
          >
            <Attachments
              beforeUpload={() => false}
              items={attachedFiles}
              onChange={(info) => setAttachedFiles(info.fileList)}
              placeholder={(type) =>
                type === 'drop'
                  ? { title: 'Drop file here' }
                  : {
                      icon: <CloudUploadOutlined />,
                      title: 'Upload files',
                      description: 'Click or drag files to this area to upload',
                    }
              }
            />
          </Sender.Header>
          <Prompts
            items={SENDER_PROMPTS}
            onItemClick={(info) => {
              onSubmit(info.data.description as string);
            }}
            styles={{
              item: { padding: '6px 12px' },
            }}
            className={styles.senderPrompt}
          />
          <Sender
            value={inputValue}
            onSubmit={() => {
              onSubmit(inputValue);
              setInputValue('');
            }}
            onChange={setInputValue}
            onCancel={() => {
              abortController.current?.abort();
            }}
            prefix={
              <Button
                type="text"
                icon={<PaperClipOutlined style={{ fontSize: 18 }} />}
                onClick={() => setAttachmentsOpen(!attachmentsOpen)}
              />
            }
            loading={loading}
            className={styles.sender}
            allowSpeech
            actions={(_, info) => {
              const { SendButton, LoadingButton, SpeechButton } = info.components;
              return (
                <Flex gap={4}>
                  <SpeechButton className={styles.speechButton} />
                  {loading ? <LoadingButton type="default" /> : <SendButton type="primary" />}
                </Flex>
              );
            }}
            placeholder="Ask or input / use skills"
          />
        </div>
      </div>
    );
  };
  
  export default Independent;