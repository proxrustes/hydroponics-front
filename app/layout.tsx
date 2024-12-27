"use client";

import { Header } from "@/components/Header";
import { Stack, ThemeProvider } from "@mui/material";
import { lightTheme } from "@/styles/theme";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{margin:0, backgroundColor:"#cad2c5"}}>
        <ThemeProvider theme={lightTheme}>
          <Stack sx={{minHeight:"90vh"}}>
            <Header />
            {children}
          </Stack>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
