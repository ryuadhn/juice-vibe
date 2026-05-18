import { Outfit, Playfair_Display } from 'next/font/google';
import "./globals.css";

const outfit = Outfit({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
    title: "VibeJuice",
    description: "AI-Powered Wellness Juice Bar",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${outfit.className} ${playfair.variable} antialiased`}>{children}</body>
        </html>
    );
}
