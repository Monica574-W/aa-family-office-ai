import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://aa-family-office-ai.pavelgrand093.chatgpt.site'),
  title: 'AA AI 家辦超級工作台',
  description: 'AA AI 家辦超級工作台前端視覺設計稿',
  openGraph: {
    title: 'AA AI 家辦超級工作台',
    description: '公司管理、家辦顧問與客戶的一站式 AI 工作平台',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AA AI 家辦超級工作台',
    description: '公司管理、家辦顧問與客戶的一站式 AI 工作平台',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
