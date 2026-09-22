import { BUSINESS_TYPES } from "@/lib/site";

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const companyName = String(body.companyName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const country = String(body.country || "").trim();
    const businessType = String(body.businessType || "").trim();
    const productRequirement = String(body.productRequirement || "").trim();
    const targetMarket = String(body.targetMarket || "").trim();
    const message = String(body.message || "").trim();

    if (!firstName || !lastName || !companyName || !email || !country || !businessType || message.length < 12) {
      return Response.json({ ok: false, message: "Please complete the required fields." }, { status: 400 });
    }

    if (!isEmail(email)) {
      return Response.json({ ok: false, message: "Please provide a valid business email." }, { status: 400 });
    }

    if (businessType && !BUSINESS_TYPES.includes(businessType)) {
      return Response.json({ ok: false, message: "Please select a valid business type." }, { status: 400 });
    }

    const payload = {
      firstName,
      lastName,
      companyName,
      email,
      phone,
      country,
      businessType,
      productRequirement,
      targetMarket,
      message,
      receivedAt: new Date().toISOString(),
    };

    // Ready for a mail, CRM or queue integration. No secrets are used in the client.
    console.info("Contact enquiry received", { companyName, email, businessType });

    return Response.json({ ok: true, stored: Boolean(payload) });
  } catch {
    return Response.json({ ok: false, message: "Unable to process this enquiry." }, { status: 500 });
  }
}
