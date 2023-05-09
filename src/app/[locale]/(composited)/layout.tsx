import Header from "@/app/[locale]/(composited)/_components/header";
import Footer from "@/app/[locale]/(composited)/_components/footer";
import React from "react";

export default function CompositedLayout(
    {children}: { children: React.ReactNode },
) {

    return (
        <>
            <Header />
            <main className="min-h-screen w-full">
                {children}
            </main>
            <Footer />
        </>
    )
}