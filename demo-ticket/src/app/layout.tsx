import { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ClientProvider from "./ClientProvider";
import "@ant-design/v5-patch-for-react-19";
import Header from "@/layouts/common/Header";

// ========= Plugins SCSS =========
import "antd/dist/reset.css";
import "../styles/scss/styles.scss";
// ========= Plugins CSS =========
import "./globals.css";
import Body from "@/layouts/common/Body";

export const metadata: Metadata = {
  title: {
    default: "Ticket System",
    template: "%s | Ticket System",
  },
  description:
    "Modern ticket management system for efficient workflow and team collaboration",
  keywords:
    "ticket system, ticket management, workflow, team collaboration, project management",
  authors: [{ name: "Mai Tu" }],
  openGraph: {
    title: "Ticket System - Modern Project Management",
    description:
      "A modern ticket management system for teams to track work, manage projects, and deliver great results.",
    type: "website",
    locale: "en_US",
    siteName: "Ticket System",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ticket System - Modern Project Management",
    description:
      "A modern ticket management system for teams to track work, manage projects, and deliver great results.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-site-verification",
  },
  alternates: {
    canonical: "https://your-domain.com",
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
        <AntdRegistry>
          <ClientProvider>
            <header role="banner">
              <Header />
            </header>
            <main role="main">
              <Body>{children}</Body>
            </main>
            <footer role="contentinfo" className="d-none">
              {/* Add footer content here */}
            </footer>
          </ClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
