import { ThemeWrapper } from "@/components/ThemeWrapper";

export const metadata = {
  title: "HydroStations",
  description: "Catenion tool for data browsing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#cad2c5" }}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
