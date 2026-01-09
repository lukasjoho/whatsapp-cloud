import "dotenv/config";
import { WhatsAppClient } from "../client";

/**
 * Exploration script to understand current WhatsApp setup
 * Run with: npx tsx src/examples/explore-setup.ts
 */

const client = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
  businessId: process.env.WHATSAPP_BUSINESS_ID,
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
});

async function explore() {
  console.log("=".repeat(60));
  console.log("WHATSAPP SETUP EXPLORATION");
  console.log("=".repeat(60));

  // 1. Debug token - understand the app
  console.log("\n📱 DEBUG TOKEN (App Info):");
  console.log("-".repeat(40));
  try {
    const tokenInfo = await client.debugToken();
    console.log("App ID:", tokenInfo.data.app_id);
    console.log("App Name:", tokenInfo.data.application);
    console.log("Is Valid:", tokenInfo.data.is_valid);
    console.log("Expires At:", tokenInfo.data.expires_at ? new Date(tokenInfo.data.expires_at * 1000).toISOString() : "Never");
    console.log("Scopes:", tokenInfo.data.scopes?.join(", "));
    if (tokenInfo.data.granular_scopes) {
      console.log("Granular Scopes:");
      tokenInfo.data.granular_scopes.forEach((s) => {
        console.log(`  - ${s.scope}: ${s.target_ids?.join(", ") || "all"}`);
      });
    }
  } catch (e: any) {
    console.log("Error:", e.message);
  }

  // 2. Business info
  if (process.env.WHATSAPP_BUSINESS_ID) {
    console.log("\n🏢 BUSINESS PORTFOLIO:");
    console.log("-".repeat(40));
    try {
      const business = await client.business.get();
      console.log("Business ID:", business.id);
      console.log("Name:", business.name);
      console.log("Timezone ID:", business.timezone_id);
    } catch (e: any) {
      console.log("Error:", e.message);
    }
  } else {
    console.log("\n⚠️  WHATSAPP_BUSINESS_ID not set - skipping business info");
  }

  // 3. List WABAs
  if (process.env.WHATSAPP_BUSINESS_ID) {
    console.log("\n📋 WABAS (WhatsApp Business Accounts):");
    console.log("-".repeat(40));
    try {
      const wabas = await client.wabas.list();
      if (Array.isArray(wabas.data)) {
        for (const waba of wabas.data) {
          console.log(`\nWABA: ${waba.id}`);
          console.log(`  Name: ${waba.name}`);
          console.log(`  Currency: ${waba.currency}`);
          console.log(`  Timezone: ${waba.timezone_id}`);
          console.log(`  Review Status: ${waba.account_review_status}`);
          console.log(`  Business Verification: ${waba.business_verification_status}`);
        }
      }
    } catch (e: any) {
      console.log("Error:", e.message);
    }
  }

  // 4. Phone numbers in WABA
  if (process.env.WHATSAPP_BUSINESS_ACCOUNT_ID) {
    console.log("\n📞 PHONE NUMBERS IN WABA:");
    console.log("-".repeat(40));
    try {
      const phones = await client.phoneNumbers.list({
        fields: "id,display_phone_number,verified_name,quality_rating,status,code_verification_status,is_official_business_account"
      });
      for (const phone of phones.data) {
        console.log(`\nPhone: ${phone.display_phone_number}`);
        console.log(`  ID: ${phone.id}`);
        console.log(`  Verified Name: ${phone.verified_name}`);
        console.log(`  Quality Rating: ${phone.quality_rating}`);
        console.log(`  Status: ${phone.status}`);
        console.log(`  Code Verification: ${phone.code_verification_status}`);
        console.log(`  Official Account: ${phone.is_official_business_account}`);
      }
    } catch (e: any) {
      console.log("Error:", e.message);
    }
  } else {
    console.log("\n⚠️  WHATSAPP_BUSINESS_ACCOUNT_ID not set - skipping phone numbers");
  }

  // 5. Subscribed apps
  if (process.env.WHATSAPP_BUSINESS_ACCOUNT_ID) {
    console.log("\n🔗 SUBSCRIBED APPS (Webhook connections):");
    console.log("-".repeat(40));
    try {
      const apps = await client.wabas.listSubscribedApps();
      if (apps.data.length === 0) {
        console.log("No apps subscribed to this WABA!");
      } else {
        for (const app of apps.data) {
          console.log(`App: ${JSON.stringify(app, null, 2)}`);
        }
      }
    } catch (e: any) {
      console.log("Error:", e.message);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("ENV VARIABLES CONFIGURED:");
  console.log("-".repeat(40));
  console.log("WHATSAPP_ACCESS_TOKEN:", process.env.WHATSAPP_ACCESS_TOKEN ? "✅ Set" : "❌ Missing");
  console.log("WHATSAPP_BUSINESS_ID:", process.env.WHATSAPP_BUSINESS_ID || "❌ Missing");
  console.log("WHATSAPP_BUSINESS_ACCOUNT_ID:", process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || "❌ Missing");
  console.log("WHATSAPP_PHONE_NUMBER_ID:", process.env.WHATSAPP_PHONE_NUMBER_ID || "❌ Missing");
  console.log("=".repeat(60));
}

explore().catch(console.error);
