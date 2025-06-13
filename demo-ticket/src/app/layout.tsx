import { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReduxProvider } from "./providers";
import "@ant-design/v5-patch-for-react-19";
import Header from "@/layouts/common/Header";
import { SplitterProvider } from "@/contexts/SplitterContext";

// ========= Plugins SCSS =========
import "antd/dist/reset.css";
import "../styles/scss/styles.scss";
// ========= Plugins CSS =========
import "./globals.css";
import Body from "@/layouts/common/Body";

export const metadata: Metadata = {
  title: "Ticket System",
  description: "Ticket System",
  keywords: "ticket system, ticket management, ticket tracking, ticket system",
  authors: [{ name: "Mai Tu" }],
  openGraph: {
    title: "Jira Clone - Project Management Tool",
    description: "A modern project management tool for teams to track work, manage projects, and deliver great results.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jira Clone - Project Management Tool",
    description: "A modern project management tool for teams to track work, manage projects, and deliver great results.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://your-domain.com" />
      </head>
      <body suppressHydrationWarning>
        <SplitterProvider>
          <AntdRegistry>
            <ReduxProvider>
              <header role="banner">
                <Header />
              </header>
              <main role="main">
                <Body>{children}</Body>
              </main>
              <footer role="contentinfo" className="d-none">
                {/* Add footer content here */}
              </footer>
            </ReduxProvider>
          </AntdRegistry>
        </SplitterProvider>
      </body>
    </html>
  );
}
