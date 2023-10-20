import {ReactNode} from "react";

export const metadata = {
    title: 'EXTERAGRAM SECRET DEV ADMIN ПУЛЬТ ОТ ЯДЕРКИ',
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
        <body style={{
            margin: 0,
            padding: 0
        }}>
            {children}
        </body>
        </html>
    )
}
