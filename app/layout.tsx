import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AA AI 家辦超級工作台',
  description: 'AA AI 家辦超級工作台前端視覺設計稿',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
