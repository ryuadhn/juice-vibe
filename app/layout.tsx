import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}
