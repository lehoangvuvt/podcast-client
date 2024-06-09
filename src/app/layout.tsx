import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import ReactQueryProvider from "@/react-query/provider";
import AuthWrapper from "@/middlewares/authWrapper";
import { Flip, ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healing Journey Podcasts",
  description: "Healing Journey Podcasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ReduxProvider>
            <AuthWrapper>
              {children}
              <ToastContainer
                hideProgressBar
                autoClose={500}
                transition={Flip}
                theme="dark"
                style={{
                  position: "fixed",
                  zIndex: 1000,
                  top: "15%",
                  left: "calc(50% - 80px)",
                }}
              />
            </AuthWrapper>
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
