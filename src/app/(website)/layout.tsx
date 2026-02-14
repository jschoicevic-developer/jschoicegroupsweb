import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";
import FloatingActions from "@/components/layout/FloatingActions";

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <PageLoader />
            <Topbar />
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <FloatingActions />
        </>
    );
}
