import {
  brevoFetchTransport,
  createContactPostHandler,
  createContactRateLimiter,
} from "@/lib/contact-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimiter = createContactRateLimiter({
  maxClients: 5_000,
  maxRequests: 3,
  windowMs: 15 * 60 * 1_000,
});

export const POST = createContactPostHandler({
  env: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
    BREVO_SENDER_NAME: process.env.BREVO_SENDER_NAME,
    DEMANDPR_CONTACT_RECIPIENT: process.env.DEMANDPR_CONTACT_RECIPIENT,
  },
  transport: brevoFetchTransport,
  now: Date.now,
  rateLimiter,
});
