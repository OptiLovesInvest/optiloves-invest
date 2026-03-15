import { NextResponse } from "next/server";

type StartKycBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as StartKycBody;

    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const email = (body.email || "").trim();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.KYC_API_KEY;
    const workflowTemplateId = process.env.KYC_WORKFLOW_TEMPLATE_ID;
    const successUrl = process.env.KYC_SUCCESS_URL || "https://optilovesinvest.com/thank-you";
    const cancelUrl = process.env.KYC_CANCEL_URL || "https://optilovesinvest.com/kyc";
    const supportEmail = process.env.KYC_SUPPORT_EMAIL || "";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing KYC_API_KEY in Vercel environment." },
        { status: 500 }
      );
    }

    if (!workflowTemplateId) {
      return NextResponse.json(
        { error: "Missing KYC_WORKFLOW_TEMPLATE_ID in Vercel environment." },
        { status: 500 }
      );
    }

    const clientRes = await fetch("https://api.complycube.com/v1/clients", {
      method: "POST",
      headers: {
        "Authorization": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "person",
        email,
        personDetails: {
          firstName,
          lastName
        }
      }),
      cache: "no-store"
    });

    const clientData = await clientRes.json();

    if (!clientRes.ok || !clientData?.id) {
      return NextResponse.json(
        {
          error: clientData?.message || "Failed to create ComplyCube client.",
          details: clientData
        },
        { status: 500 }
      );
    }

    const flowPayload: Record<string, unknown> = {
      clientId: clientData.id,
      workflowTemplateId,
      successUrl,
      cancelUrl,
      theme: "light"
    };

    if (supportEmail) {
      flowPayload.supportEmail = supportEmail;
    }

    const sessionRes = await fetch("https://api.complycube.com/v1/flow/sessions", {
      method: "POST",
      headers: {
        "Authorization": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(flowPayload),
      cache: "no-store"
    });

    const sessionData = await sessionRes.json();

    if (!sessionRes.ok || !sessionData?.redirectUrl) {
      return NextResponse.json(
        {
          error: sessionData?.message || "Failed to create ComplyCube flow session.",
          details: sessionData
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: sessionData.redirectUrl }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error starting KYC.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}