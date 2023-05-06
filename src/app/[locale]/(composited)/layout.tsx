import Header from "@/app/[locale]/(composited)/_components/header";
import Footer from "@/app/[locale]/(composited)/_components/footer";
import React from "react";

export default function CompositedLayout(
    {children}: { children: React.ReactNode },
) {

    return (
        <>
            <Header />
            <main className="px-8 md:px-16 min-h-screen w-full">
                {children}
            </main>
            <Footer />
        </>
    )
}