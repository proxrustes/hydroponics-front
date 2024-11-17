"use client"

import { Header } from "@/components/Header";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "@/styles/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={lightTheme}>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
