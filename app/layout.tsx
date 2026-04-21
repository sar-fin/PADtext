import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PAD Remissgenerator – Koloskopi',
  description: 'Generera PAD-remisser efter koloskopi via knappval',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
