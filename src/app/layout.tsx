import React from "react";
import "./globals.css";

export const metadata = {title: "Coding Test", description: "Monthly Coding Test"};

export default function RootLayout({children} : {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body style={{fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"}}>
        {children}
      </body>
    </html>
  );
}