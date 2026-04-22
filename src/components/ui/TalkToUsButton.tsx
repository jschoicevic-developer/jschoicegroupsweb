import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { CONTACT_DETAILS } from "@/config/contact";

const TalkToUsButton = () => (
    <Button
        asChild
        size="lg"
        className="h-14 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
    >
        <a href={`tel:${CONTACT_DETAILS.national.tel}`}>
            <Phone className="mr-2 h-5 w-5" />
            Talk to Us
        </a>
    </Button>
);

export default TalkToUsButton;
