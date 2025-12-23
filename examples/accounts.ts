import { WhatsAppClient } from "../src/index.js";

/**
 * Example: Manage WABAs
 */
async function wabaExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
  });

  try {
    // List WABAs for a business portfolio
    const wabas = await client.accounts.listWabas("your-business-id", {
      fields: ["id", "name", "account_review_status", "currency"],
      limit: 50,
    });
    console.log("WABAs:", wabas);

    // Get a specific WABA
    const waba = await client.accounts.getWaba("waba-id", [
      "id",
      "name",
      "message_template_namespace",
    ]);
    console.log("WABA details:", waba);

    // Create a new WABA
    const newWaba = await client.accounts.createWaba("your-business-id", {
      name: "My New Business Account",
      currency: "USD",
      timezone_id: "1",
    });
    console.log("Created WABA:", newWaba);
  } catch (error) {
    console.error("Error managing WABAs:", error);
  }
}

/**
 * Example: Get and update business profile
 */
async function profileExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    // Get profile
    const profile = await client.accounts.getProfile();
    console.log("Business profile:", profile);

    // Update profile
    const updated = await client.accounts.updateProfile(
      "your-phone-number-id",
      {
        about: "We provide excellent customer service",
        email: "contact@example.com",
        address: "123 Main St, City, Country",
        description: "Your trusted business partner",
      }
    );
    console.log("Updated profile:", updated);
  } catch (error) {
    console.error("Error managing profile:", error);
  }
}

/**
 * Example: Manage phone numbers
 */
async function phoneNumbersExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    businessAccountId: "your-business-account-id",
  });

  try {
    // List phone numbers
    const phoneNumbers = await client.accounts.phoneNumbers.list();
    console.log("Phone numbers:", phoneNumbers);

    // Get specific phone number
    const phoneNumber = await client.accounts.phoneNumbers.get(
      "phone-number-id"
    );
    console.log("Phone number details:", phoneNumber);

    // Update phone number
    const updated = await client.accounts.phoneNumbers.update(
      "phone-number-id",
      {
        displayName: "New Display Name",
        about: "Updated about text",
      }
    );
    console.log("Updated phone number:", updated);
  } catch (error) {
    console.error("Error managing phone numbers:", error);
  }
}

// Uncomment to run:
// profileExample();
// phoneNumbersExample();
