import "dotenv/config";
import { WhatsAppClient } from "../client";

const client = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID!,
});

async function testTemplates() {
  try {
    console.log("🧪 Testing Templates API...\n");

    // Test 1: Create a template
    console.log("1️⃣ Creating template...");
    const createResponse = await client.templates.create({
      name: `test_template_${Date.now()}`, // Unique name to avoid conflicts
      language: "en",
      category: "UTILITY",
      components: [
        {
          type: "BODY",
          text: "Hello! This is a test template. Thank you for testing our WhatsApp Cloud API SDK.",
        },
        {
          type: "FOOTER",
          text: "This is a test footer",
        },
        {
          type: "BUTTONS",
          buttons: [
            {
              type: "QUICK_REPLY",
              text: "Get Started",
            },
            {
              type: "QUICK_REPLY",
              text: "Learn More",
            },
          ],
        },
      ],
    });

    console.log("✅ Template created successfully!");
    console.log("Response:", JSON.stringify(createResponse, null, 2));
    console.log("\n");

    // Verify create response structure
    if (!createResponse.id) {
      throw new Error("Create response missing 'id' field");
    }
    if (!createResponse.status) {
      throw new Error("Create response missing 'status' field");
    }
    if (!createResponse.category) {
      throw new Error("Create response missing 'category' field");
    }
    console.log("✅ Create response structure verified\n");

    // Test 2: Get template by ID
    console.log("2️⃣ Getting template by ID...");
    const templateId = createResponse.id;
    const getResponse = await client.templates.get(templateId);

    console.log("✅ Template retrieved successfully!");
    console.log("Response:", JSON.stringify(getResponse, null, 2));
    console.log("\n");

    // Verify get response structure
    if (!getResponse.id) {
      throw new Error("Get response missing 'id' field");
    }
    if (!getResponse.name) {
      throw new Error("Get response missing 'name' field");
    }
    if (!getResponse.language) {
      throw new Error("Get response missing 'language' field");
    }
    if (!getResponse.status) {
      throw new Error("Get response missing 'status' field");
    }
    if (!getResponse.category) {
      throw new Error("Get response missing 'category' field");
    }
    if (!Array.isArray(getResponse.components)) {
      throw new Error("Get response missing 'components' array");
    }
    console.log("✅ Get response structure verified\n");

    // Verify components
    const bodyComponent = getResponse.components.find((c) => c.type === "BODY");
    if (!bodyComponent) {
      throw new Error("BODY component not found in response");
    }
    if (bodyComponent.type !== "BODY") {
      throw new Error("BODY component type mismatch");
    }
    console.log("✅ Components verified\n");

    // Test 3: List templates
    console.log("3️⃣ Listing templates...");
    const listResponse = await client.templates.list();
    console.log(`✅ Found ${listResponse.data.length} template(s)`);
    console.log("Response:", JSON.stringify(listResponse, null, 2));
    console.log("\n");

    // Verify list response structure
    if (!Array.isArray(listResponse.data)) {
      throw new Error("List response missing 'data' array");
    }
    console.log("✅ List response structure verified\n");

    // Verify our created template is in the list
    const foundTemplate = listResponse.data.find((t) => t.id === templateId);
    if (!foundTemplate) {
      console.log(
        "⚠️  Note: Created template may not appear in list immediately (async processing)"
      );
    } else {
      console.log("✅ Created template found in list\n");
    }

    console.log("🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    process.exit(1);
  }
}

testTemplates();
