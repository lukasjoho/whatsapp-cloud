import { WhatsAppClient, WhatsAppValidationError } from "../src/index.js";

/**
 * Example: Handling initialization errors
 */
async function demonstrateErrorHandling() {
  console.log("=== WhatsApp Client Error Handling Demo ===\n");

  // Test 1: Missing accessToken
  console.log("Test 1: Missing accessToken");
  try {
    const client = new WhatsAppClient({} as any);
  } catch (error) {
    if (error instanceof WhatsAppValidationError) {
      console.log("✅ Caught WhatsAppValidationError");
      console.log(`   Field: ${error.field}`);
      console.log(`   Message: ${error.message}`);
      console.log(`   Has help link: ${error.message.includes("developers.facebook.com")}\n`);
    }
  }

  // Test 2: Empty accessToken
  console.log("Test 2: Empty accessToken");
  try {
    const client = new WhatsAppClient({ accessToken: "" });
  } catch (error) {
    if (error instanceof WhatsAppValidationError) {
      console.log("✅ Caught WhatsAppValidationError");
      console.log(`   Field: ${error.field}`);
      console.log(`   Message: ${error.message}\n`);
    }
  }

  // Test 3: Whitespace-only accessToken
  console.log("Test 3: Whitespace-only accessToken");
  try {
    const client = new WhatsAppClient({ accessToken: "   " });
  } catch (error) {
    if (error instanceof WhatsAppValidationError) {
      console.log("✅ Caught WhatsAppValidationError");
      console.log(`   Field: ${error.field}`);
      console.log(`   Message: ${error.message}\n`);
    }
  }

  // Test 4: Valid configuration
  console.log("Test 4: Valid configuration");
  try {
    const client = new WhatsAppClient({
      accessToken: "test-token-123",
      phoneNumberId: "123456789",
    });
    console.log("✅ Client initialized successfully\n");
  } catch (error) {
    console.log("❌ Unexpected error:", error);
  }

  // Test 5: Error handling in real usage
  console.log("Test 5: Error handling pattern for users");
  console.log(`
// Recommended error handling pattern:
try {
  const client = new WhatsAppClient({
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  });
  
  // Use client...
} catch (error) {
  if (error instanceof WhatsAppValidationError) {
    if (error.field === 'accessToken') {
      console.error('❌ Access token is missing or invalid');
      console.error('   Get your token from:', error.message.match(/https:\\/\\/[^\\s]+/)?.[0]);
      process.exit(1);
    }
    console.error('Validation error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
  `);
}

// Run the demo
demonstrateErrorHandling().catch(console.error);

