# ElevenLabs "Resource" Pattern Explained

## What is a "Resource"?

In ElevenLabs SDK, a **resource** is essentially a **namespace/client** that groups related API endpoints together.

### Structure:

```
ElevenLabsClient (root)
├── textToSpeech → TextToSpeechClient (all methods in Client.ts)
├── voices → VoicesClient (all methods in Client.ts)
├── history → HistoryClient (all methods in Client.ts)
└── conversationalAi → ConversationalAiClient
    ├── agents → AgentsClient (all methods in Client.ts)
    ├── conversations → ConversationsClient
    └── knowledgeBase → KnowledgeBaseClient
        └── documents → DocumentsClient (nested resources!)
```

### Key Characteristics:

1. **Each resource = One Client class**
   - `TextToSpeechClient` has all text-to-speech methods
   - `VoicesClient` has all voice-related methods

2. **All methods in one file**
   - `Client.ts` contains all methods for that resource
   - Methods are implemented directly in the class (100-400+ lines)

3. **Nested resources**
   - Resources can have sub-resources
   - Example: `client.conversationalAi.agents.knowledgeBase.list()`

4. **Lazy instantiation**
   ```typescript
   public get textToSpeech(): TextToSpeechClient {
     return (this._textToSpeech ??= new TextToSpeechClient(this._options));
   }
   ```

## How It Maps to Your Code

**ElevenLabs:**
```typescript
client.textToSpeech.convert(...)
client.voices.list(...)
client.conversationalAi.agents.create(...)
```

**Your Current:**
```typescript
client.messages.sendText(...)
client.accounts.getProfile(...)
```

**Same pattern!** You're already using the resource pattern. ✅

## The Difference: Method Organization

**ElevenLabs:**
- Methods are **in the class** (`Client.ts` has all methods)
- One file per resource, but can be 400+ lines

**Your Current:**
- Methods are **in separate files** (`send-text.ts`, `send-image.ts`)
- Service class delegates to functions
- More modular, but awkward naming

## Your Solution: Clean Function Imports

Since `send-contacts.ts` is 101 lines, keeping separate files makes sense. But we can fix the awkward naming!

### Current (Awkward):
```typescript
import * as sendTextMethod from "./methods/send-text";

async sendText(request) {
  return sendTextMethod.sendText(this.httpClient, request);
}
```

### Better (Clean):
```typescript
import { sendText } from "./methods/send-text";

async sendText(request) {
  return sendText(this.httpClient, request);
}
```

**Just import the function directly, not as a namespace!**

## Recommended Structure

```
src/services/messages/
├── MessagesService.ts      (service class, delegates to functions)
├── methods/
│   ├── send-text.ts        (export function sendText)
│   ├── send-image.ts       (export function sendImage)
│   ├── send-contacts.ts    (export function sendContacts - 101 lines)
│   └── ...
└── index.ts
```

**Benefits:**
- ✅ Separate files for maintainability
- ✅ Clean imports (`sendText` not `sendTextMethod.sendText`)
- ✅ Service class stays clean
- ✅ Methods are testable in isolation

This is actually a **hybrid pattern** that combines:
- ElevenLabs' resource pattern (namespace organization)
- Modular file structure (your preference)
- Clean function imports (best of both worlds)

