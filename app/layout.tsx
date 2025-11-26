import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyAI3",
  description: "MyAI3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <div className="app-shell">
          {/* LEFT SIDEBAR */}
          <aside className="side-panel">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h1-panel">Sarah</div>
                <div className="h2-muted">LVL 2 • 60 XP • Chatty</div>

                <div className="mt-3">
                  <button className="bubble-small">Choose conversation</button>
                </div>
              </div>

              <div className="side-avatar">
                <img
                  src="/logo.png"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="side-callout">Let me know if you need to vent!</div>
            </div>

            <div className="flex-1" />

            <div className="h2-muted">Settings • Profile • Help</div>
          </aside>

          {/* RIGHT CHAT AREA */}
          <main className="chat-column">
            {/* children = your page.tsx chat UI */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
