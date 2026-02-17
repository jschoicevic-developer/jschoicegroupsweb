# Lead Qualification Strategy & Competitor Analysis for NDIS Consultations Forms

## Competitor Analysis & UX Best Practices

Based on research into high-performing NDIS and healthcare consultationsforms, the following best practices are recommended to maximize conversion and lead quality:

### 1. Structure & Progressive Disclosure
*   **Chunking:** Top competitors break long forms into 4-6 clear, logical steps. Your current 6-step implementation follows this best practice perfectly.
*   **Progress Indicators:** A visual progress bar is essential (already implemented). Adding "Time to complete" (e.g., "Takes approx. 5 mins") sets helpful expectations.
*   **Save & Resume:** For very long forms, a "Save for Later" feature is common. *Recommendation:* Consider adding a simple "Email me a link to resume" feature if backend allows, or simply keep the form short enough to complete in one sitting (current approach).

### 2. Trust & Credibility Signals
*   **Reassurance:** Top forms explain *why* specific data is needed (e.g., "We need your NDIS number to verify funding eligibility").
*   **Privacy:** Prominent placement of "Your data is secure" badges or text near sensitive fields (NDIS number, DOB).
*   **Testimonials:** Some competitors place a small participant testimonial sidebar next to the form on desktop to boost confidence during completion.

### 3. Visual Design (The "WOW" Factor)
*   **Large Clickable Areas:** Instead of standard radio buttons, use large "cards" for selection (e.g., for "Myself" vs "Someone else"). This is mobile-friendly and feels premium.
*   **Micro-interactions:** Smooth slides between steps, valid fields turning green, and subtle button animations keep users engaged.
*   **Conditional Logic:** heavily dependent on "If 'Other', show text box". This keeps the interface clean.

---

## Lead Qualification Strategy

To filter serious leads and prioritize high-value inquiries without adding too much friction, implement the following "Soft Qualification" gates:

### 1. The "Eligibility Gate" (Visual)
Add a pre-step or a clear notice at the start:
> "To receive support, participants generally need an active NDIS plan. If you are presently waiting for a plan, please select 'Pending' in the NDIS section."

### 2. Review Step Psychology
The final "Review" step isn't just for checking errors; it's a commitment steps. Users who review their data are psychologically more committed to the process.

### 3. Smart Field Validation (The "Quality Filter")
*   **Phone Numbers:** Enforce valid Australian mobile/landline formats.
*   **NDIS Number:** If provided, check if it matches the standard 9-digit format (if applicable).
*   **Service Location:** If you only serve specific areas, adding a postcode lookup early on can filter out-of-area leads immediately, saving both parties time.

### 4. Automated Triage (Post-Submission)
*   **Tier 1 (Hot):** Active NDIS Plan + Ready to start "Immediately" + Phone number provided. -> *Call within 2 hours.*
*   **Tier 2 (Warm):** Plan Managed + Future start date. -> *Email follow-up + Call within 24 hours.*
*   **Tier 3 (Cold):** No confirmation of funds or "Just inquiring". -> *Automated email nurture sequence.*

---

## Recommended UX Improvements (Immediate Action Items)

1.  **Enhance Step 1 Visuals:** Turn the "Myself" / "Client" radio buttons into large, clickable visual cards with icons.
2.  **Address Lookup:** If possible, integrate an address autocomplete (e.g., Google Places) to reduce typing effort and typing errors.
3.  **Mobile Optimization:** Ensure the "Next" button is always visible on mobile without excessive scrolling (sticky footer for navigation buttons).
