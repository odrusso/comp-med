import React from "react";
import '../styles/globals.css'

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <body>{children}</body>
        </html>
    )
}
