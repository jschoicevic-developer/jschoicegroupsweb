import { ShieldCheck, MapPin, Clock, Brain } from "lucide-react";

export default function LandingTrustStrip() {
  const signals = [
    { icon: ShieldCheck, label: "Registered NDIS Provider" },
    { icon: MapPin, label: "15+ Service Areas Across VIC" },
    { icon: Clock, label: "24/7 Care Services Available" },
    { icon: Brain, label: "Neuro-Affirming Approach" },
  ];

  return (
    <div className="bg-accent py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {signals.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
