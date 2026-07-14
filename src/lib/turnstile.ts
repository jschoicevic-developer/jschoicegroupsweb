const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const TURNSTILE_PROTECTED_SOURCES = [
  "contact_form",
  "ndis_provider_melbourne",
] as const;

export type TurnstileProtectedSource =
  (typeof TURNSTILE_PROTECTED_SOURCES)[number];

export function isTurnstileProtectedSource(
  source: string | undefined | null
): source is TurnstileProtectedSource {
  return TURNSTILE_PROTECTED_SOURCES.includes(
    source as TurnstileProtectedSource
  );
}

export function isTurnstileConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
      process.env.TURNSTILE_SECRET_KEY
  );
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}
