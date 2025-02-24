import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorConfigFormItemType } from '@logto/connector-kit';

export const endpoint = 'https://api.sendgrid.com/v3/mail/send';

export const defaultMetadata: ConnectorMetadata = {
  id: 'sendgrid-email-service',
  target: 'sendgrid-mail',
  platform: null,
  name: {
    en: 'SendGrid Mail Service',
    'zh-CN': 'SendGrid 邮件服务',
    'tr-TR': 'SendGrid EMail Servisi',
    ko: 'SendGrid 메일 서비스',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'SendGrid is a communication platform for transactional and marketing email.',
    'zh-CN': 'SendGrid 是一个面向消费者的邮件通讯平台。',
    'tr-TR': 'SendGrid, operasyonel ve pazarlama e- postaları için bir iletişim platformudur.',
    ko: 'SendGrids는 마케팅 및 이메일을 전송할 수 있는 플랫폼 입니다.',
  },
  readme: './README.md',
  formItems: [
    {
      key: 'apiKey',
      label: 'API Key',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: '<api-key>',
    },
    {
      key: 'fromEmail',
      label: 'From Email',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: '<from-Email>',
    },
    {
      key: 'fromName',
      label: 'From Name',
      type: ConnectorConfigFormItemType.Text,
      required: false,
      placeholder: '<from-name>',
    },
    {
      key: 'templates',
      label: 'Templates',
      type: ConnectorConfigFormItemType.Json,
      required: true,
      defaultValue: [
        {
          usageType: 'SignIn',
          type: 'text/plain',
          subject: 'Logto SignIn Template',
          content: 'This is for sign-in purposes only. Your verification code is {{code}}.',
        },
        {
          usageType: 'Register',
          type: 'text/plain',
          subject: 'Logto Register Template',
          content: 'This is for registering purposes only. Your verification code is {{code}}.',
        },
        {
          usageType: 'ForgotPassword',
          type: 'text/plain',
          subject: 'Logto ForgotPassword Template',
          content:
            'This is for resetting password purposes only. Your verification code is {{code}}.',
        },
        {
          usageType: 'Generic',
          type: 'text/plain',
          subject: 'Logto Generic Template',
          content:
            'This is for generic purpose through management API only. Your verification code is {{code}}.',
        },
        {
          usageType: 'Test',
          type: 'text/plain',
          subject: 'Logto Test Template',
          content: 'This is for testing purposes only. Your verification code is {{code}}.',
        },
      ],
    },
  ],
};
