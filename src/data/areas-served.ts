export interface AreaServed {
    name: string;
    slug: string;
}

/**
 * Canonical list of Melbourne areas served by JS Choice.
 * Shared by the home page "Areas We Serve" section and every service page
 * that reuses `AreasWeServeSection` — do not fork this list per page.
 */
export const AREAS_SERVED: AreaServed[] = [
    { name: "Point Cook", slug: "/ndis-providers-point-cook" },
    { name: "Tarneit", slug: "/ndis-providers-tarneit" },
    { name: "Shepparton", slug: "/ndis-providers-shepparton" },
    { name: "Werribee", slug: "/ndis-providers-werribee" },
    { name: "Hoppers Crossing", slug: "/ndis-providers-hoppers-crossing" },
    { name: "Truganina", slug: "/ndis-providers-truganina" },
    { name: "Craigieburn", slug: "/ndis-providers-craigieburn" },
    { name: "Williams Landing", slug: "/ndis-providers-williams-landing" },
    { name: "Laverton", slug: "/ndis-providers-laverton" },
    { name: "Altona", slug: "/ndis-providers-altona" },
    { name: "Altona North", slug: "/ndis-providers-altona-north" },
    { name: "Altona Meadows", slug: "/ndis-providers-altona-meadows" },
    { name: "South Morang", slug: "/ndis-providers-south-morang" },
    { name: "Footscray", slug: "/ndis-providers-footscray" },
    { name: "Lara", slug: "/ndis-providers-lara" },
    { name: "Epping", slug: "/ndis-providers-epping" },
    { name: "Geelong", slug: "/ndis-accommodation-geelong" },
];
