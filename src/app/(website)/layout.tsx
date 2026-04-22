import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";

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
            <main className="flex-grow overflow-x-clip">
                {children}
            </main>
            <Footer />
        </>
    );
}
