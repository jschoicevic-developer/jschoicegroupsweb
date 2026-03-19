import Link from "next/link";

const suburbs = [
  "Point Cook",
  "Tarneit",
  "Werribee",
  "Hoppers Crossing",
  "Truganina",
  "Craigieburn",
  "Williams Landing",
  "Laverton",
  "Altona",
  "Footscray",
  "Epping",
  "Geelong",
  "South Morang",
  "Lara",
  "Shepparton",
];

export default function LandingFooter() {
  return (
    <footer className="bg-[#1A202C] text-gray-400 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Row 1: Business info */}
        <div>
          <p className="text-white font-bold text-lg">JS Choice Group Pty Ltd</p>
          <p className="mt-1 text-sm">
            ABN: 54 644 196 270 | Registered NDIS Provider
          </p>
          <p className="mt-1 text-sm">
            Suite 1, Level 1, 1 Main Street, Point Cook VIC 3030
          </p>
          <p className="mt-2 text-sm">
            <a
              href="tel:1300572464"
              className="hover:text-white transition-colors"
            >
              1300 572 464
            </a>
            {" · "}
            <a
              href="mailto:info@jschoicegroup.com.au"
              className="hover:text-white transition-colors"
            >
              info@jschoicegroup.com.au
            </a>
          </p>
        </div>

        {/* Row 2: Service areas */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-primary font-semibold mb-2">
            Serving NDIS Participants Across Victoria
          </p>
          <p className="text-sm leading-relaxed">
            {suburbs.join(" · ")}
          </p>
        </div>

        {/* Row 3: Legal */}
        <div className="border-t border-gray-800 pt-6 text-xs">
          <p>
            &copy; {new Date().getFullYear()} JS Choice Group Pty Ltd. All rights
            reserved.{" "}
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
