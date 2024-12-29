"use client";

import { ThemeProvider, CssBaseline, Stack } from "@mui/material";
import { lightTheme } from "@/styles/theme";
import { Header } from "./common/Header";
import { Footer } from "./common/Footer";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
        <ThemeProvider theme={lightTheme}>
          <Stack sx={{minHeight:"90vh"}}>
            <Header />
            {children}
          </Stack>

          <Footer />
        </ThemeProvider>
    </ThemeProvider>
  );
}
