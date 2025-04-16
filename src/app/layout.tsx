import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ToastContainer, toast } from "react-toastify";
export const metadata: Metadata = {
  title: "ZunoHub",
  description: "Nền tảng học lập trình trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="light"
              progressStyle={{ background: "#4ade80" }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
