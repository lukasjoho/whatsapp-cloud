import "dotenv/config";
import { WhatsAppClient } from "../client";

const client = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
});

const debugInfo = await client.debugToken();
console.log(debugInfo);
