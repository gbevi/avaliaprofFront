import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avaliação de Professores",
  description: "Sistema de avaliação de professores da UnB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}  
