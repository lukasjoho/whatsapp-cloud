import { WhatsAppClient } from "../src/index.js";

/**
 * Example: Send a text message
 */
async function sendTextExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    const response = await client.messages.sendText({
      to: "+1234567890",
      body: "Hello from WhatsApp Cloud API SDK!",
      previewUrl: true,
    });

    console.log("Text message sent:", response);
  } catch (error) {
    console.error("Error sending text message:", error);
  }
}

/**
 * Example: Send an image message
 */
async function sendImageExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    const response = await client.messages.sendImage({
      to: "+1234567890",
      imageUrl: "https://example.com/image.jpg",
      caption: "Check out this image!",
    });

    console.log("Image message sent:", response);
  } catch (error) {
    console.error("Error sending image message:", error);
  }
}

/**
 * Example: Send a video message
 */
async function sendVideoExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    const response = await client.messages.sendVideo({
      to: "+1234567890",
      videoUrl: "https://example.com/video.mp4",
      caption: "Check out this video!",
    });

    console.log("Video message sent:", response);
  } catch (error) {
    console.error("Error sending video message:", error);
  }
}

/**
 * Example: Send an audio message
 */
async function sendAudioExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    const response = await client.messages.sendAudio({
      to: "+1234567890",
      audioUrl: "https://example.com/audio.mp3",
    });

    console.log("Audio message sent:", response);
  } catch (error) {
    console.error("Error sending audio message:", error);
  }
}

/**
 * Example: Send a document message
 */
async function sendDocumentExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    const response = await client.messages.sendDocument({
      to: "+1234567890",
      documentUrl: "https://example.com/document.pdf",
      caption: "Here's the document",
      filename: "document.pdf",
    });

    console.log("Document message sent:", response);
  } catch (error) {
    console.error("Error sending document message:", error);
  }
}

/**
 * Example: Send a location message
 */
async function sendLocationExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    const response = await client.messages.sendLocation({
      to: "+1234567890",
      latitude: 37.7749,
      longitude: -122.4194,
      name: "San Francisco",
      address: "San Francisco, CA, USA",
    });

    console.log("Location message sent:", response);
  } catch (error) {
    console.error("Error sending location message:", error);
  }
}

/**
 * Example: Send a reaction message
 */
async function sendReactionExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    const response = await client.messages.sendReaction({
      to: "+1234567890",
      messageId: "wamid.xxx",
      emoji: "👍",
    });

    console.log("Reaction message sent:", response);
  } catch (error) {
    console.error("Error sending reaction message:", error);
  }
}

/**
 * Example: Send a contacts message
 */
async function sendContactsExample() {
  const client = new WhatsAppClient({
    accessToken: "your-access-token",
    phoneNumberId: "your-phone-number-id",
  });

  try {
    const response = await client.messages.sendContacts({
      to: "+1234567890",
      contacts: [
        {
          name: {
            formattedName: "John Doe",
            firstName: "John",
            lastName: "Doe",
          },
          phones: [
            {
              phone: "+1234567890",
              type: "WORK",
            },
          ],
          emails: [
            {
              email: "john@example.com",
              type: "WORK",
            },
          ],
          addresses: [
            {
              street: "123 Main St",
              city: "San Francisco",
              state: "CA",
              zip: "94102",
              country: "United States",
              countryCode: "US",
              type: "WORK",
            },
          ],
        },
      ],
    });

    console.log("Contacts message sent:", response);
  } catch (error) {
    console.error("Error sending contacts message:", error);
  }
}

// Uncomment to run:
// sendTextExample();
// sendImageExample();
// sendVideoExample();
// sendAudioExample();
// sendDocumentExample();
// sendLocationExample();
// sendReactionExample();
// sendContactsExample();
