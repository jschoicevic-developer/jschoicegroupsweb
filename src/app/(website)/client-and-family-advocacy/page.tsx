import { redirect } from "next/navigation";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";


export default function ClientAndFamilyAdvocacyRedirect() {
    redirect('/client-and-family-advocacy-for-ndis-participants-only');
}
