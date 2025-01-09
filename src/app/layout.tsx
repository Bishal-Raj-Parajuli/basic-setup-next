import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basic Nextjs Setup",
  description: "This is a basic nexjs app with all necessary thing to make a project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
