import "dotenv/config";
import { WhatsAppClient } from "../client";

const client = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
});

/**
 * Example: Using beforeHandler with type-safe context
 *
 * This demonstrates:
 * 1. Resolving phone number to customer/conversation in beforeHandler
 * 2. Type-safe access to resolved data in message handlers
 * 3. Sending notifications to Slack (mocked)
 */

// Mock database functions
async function findCustomerByPhoneNumber(
  phoneNumber: string
): Promise<{ id: string; name: string; conversationId: string } | null> {
  // Simulate database lookup
  console.log(`[DB] Looking up customer for phone: ${phoneNumber}`);

  // Mock: return customer if phone starts with "1"
  if (phoneNumber.startsWith("1")) {
    return {
      id: "customer-123",
      name: "John Doe",
      conversationId: "conv-456",
    };
  }
  return null;
}

// Mock Slack notification
async function sendToSlack(
  message: string,
  customerId?: string
): Promise<void> {
  console.log(
    `[SLACK] 📢 ${message}${customerId ? ` (Customer: ${customerId})` : ""}`
  );
}

// Simulate webhook payload (in real app, this comes from Express/Fastify/etc.)
const mockWebhookPayload = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "waba-123",
      changes: [
        {
          value: {
            metadata: {
              phone_number_id: "phone-123",
              display_phone_number: "+1234567890",
            },
            contacts: [
              {
                profile: {
                  name: "John Doe",
                },
                wa_id: "1234567890",
              },
            ],
            messages: [
              {
                from: "1234567890",
                id: "msg-123",
                timestamp: "1234567890",
                type: "text",
                text: {
                  body: "Hello, I need help with my order!",
                },
              },
            ],
          },
          field: "messages",
        },
      ],
    },
  ],
};

// Example 1: Basic usage with beforeHandler
console.log("\n=== Example 1: Basic beforeHandler ===");
client.webhooks.handle(mockWebhookPayload, {
  // beforeHandler runs FIRST and resolves app entities
  beforeHandler: async (message, webhook) => {
    console.log(`[beforeHandler] Processing message from ${message.from}`);

    // Resolve phone number to customer
    const customer = await findCustomerByPhoneNumber(message.from);

    if (!customer) {
      // Return empty object if not found
      // Note: returning {} is different from undefined
      // - undefined = beforeHandler not set or failed
      // - {} = beforeHandler ran but found nothing (intentional empty result)
      return {};
    }

    // Return resolved data - this type is automatically inferred!
    return {
      customerId: customer.id,
      customerName: customer.name,
      conversationId: customer.conversationId,
    };
  },

  // text handler receives the resolved data as third argument
  // TypeScript knows the exact shape from beforeHandler's return type!
  // before is TBefore | undefined - clearer than empty object!
  text: async (message, webhook, before) => {
    console.log(`[text handler] Received: "${message.text.body}"`);
    console.log(`[text handler] From: ${webhook.contact?.name || "Unknown"}`);

    // ✅ Clear check: undefined means beforeHandler wasn't set or failed
    // ✅ Type-safe access: TypeScript knows before.customerId, etc. when before exists
    if (before?.customerId) {
      console.log(`[text handler] Customer ID: ${before.customerId}`);
      console.log(`[text handler] Conversation ID: ${before.conversationId}`);

      // Send to Slack with customer context
      await sendToSlack(
        `New message from ${before.customerName}: ${message.text.body}`,
        before.customerId
      );

      // Attach message to conversation thread
      console.log(
        `[text handler] Attaching message to conversation ${before.conversationId}`
      );
    } else {
      // Handle case where beforeHandler wasn't set, failed, or customer not found
      console.log(
        `[text handler] No customer context (beforeHandler not set or failed)`
      );
      await sendToSlack(
        `New message from unknown customer: ${message.text.body}`
      );
    }
  },
});

// Example 2: More complex beforeHandler with arrays
console.log("\n=== Example 2: beforeHandler with arrays ===");
client.webhooks.handle(mockWebhookPayload, {
  beforeHandler: async (message, webhook) => {
    const customer = await findCustomerByPhoneNumber(message.from);

    // Return array of related customer IDs (e.g., team members)
    return {
      customerId: customer?.id,
      relatedCustomerIds: customer
        ? [`${customer.id}-team1`, `${customer.id}-team2`]
        : [],
      tags: ["support", "urgent"], // string array
    };
  },

  text: async (message, webhook, before) => {
    // ✅ Clear check: before is undefined if beforeHandler wasn't set or failed
    if (!before) {
      console.log(`[text handler] beforeHandler not set or failed`);
      return;
    }

    // ✅ TypeScript knows before.relatedCustomerIds is string[] (after undefined check)
    console.log(
      `[text handler] Related customers: ${before.relatedCustomerIds.join(
        ", "
      )}`
    );

    // ✅ TypeScript knows before.tags is string[]
    console.log(`[text handler] Tags: ${before.tags.join(", ")}`);

    // ✅ TypeScript knows before.customerId is string | undefined
    if (before.customerId) {
      console.log(`[text handler] Primary customer: ${before.customerId}`);
    }
  },
});

// Example 3: Without beforeHandler (backward compatible)
console.log("\n=== Example 3: Without beforeHandler ===");
client.webhooks.handle(mockWebhookPayload, {
  text: async (message, webhook, before) => {
    // ✅ before is typed as undefined (clearer than empty object!)
    // TypeScript will error if you try to access properties without checking
    console.log(`[text handler] No beforeHandler - before is undefined`);
    console.log(`[text handler] Message: ${message.text.body}`);
    console.log(`[text handler] From: ${webhook.contact?.name}`);

    // Clear check for undefined
    if (before) {
      // This would cause a TypeScript error if beforeHandler wasn't defined:
      // console.log(before.customerId); // ❌ Property 'customerId' does not exist on type 'Record<string, never>'
    } else {
      console.log(`[text handler] before is undefined - beforeHandler not set`);
    }
  },
});

// Type safety verification
console.log("\n=== Type Safety Test ===");
// This example demonstrates that TypeScript correctly infers types
// Try uncommenting the line below to see a TypeScript error:
// client.webhooks.handle(mockWebhookPayload, {
//   beforeHandler: async () => ({ customerId: "123" }),
//   text: async (msg, webhook, before) => {
//     console.log(before.nonExistentProperty); // ❌ TypeScript error!
//   },
// });

console.log(
  "\n✅ All examples executed! Check the output above to see type safety in action."
);
console.log(
  "💡 Tip: Open this file in your IDE to see TypeScript's type inference in action!"
);
console.log(
  "   - Hover over 'before' in the text handlers to see the inferred type"
);
console.log(
  "   - Try accessing a non-existent property to see TypeScript errors"
);
