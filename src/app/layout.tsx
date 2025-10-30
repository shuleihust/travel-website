import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "环球旅行 - 探索世界之美",
  description: "专业的旅行套餐服务，带您探索世界各地的美景",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

