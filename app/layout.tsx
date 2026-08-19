import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pathwise | Career Intelligence",
  description: "AI-powered career intelligence for a more focused job search.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
