import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ImmiTracker — US Immigration Guide',
  description:
    'Comprehensive US immigration information for OPT, STEM OPT, H-1B, H-4, PERM, and Green Card',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-700 antialiased">
        {children}
      </body>
    </html>
  );
}
