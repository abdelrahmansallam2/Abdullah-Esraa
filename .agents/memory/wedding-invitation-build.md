---
name: Wedding invitation build
description: Durable product decision for the Shady and Maryam invitation.
---

The invitation must remain fully usable without Firebase configuration; RSVP and guestbook persistence should fall back to browser storage, while using Firestore automatically when all client configuration values are available.

**Why:** A shareable wedding invitation should work immediately for guests and should not depend on a private service setup before the first preview or publish.

**How to apply:** Preserve the local fallback when changing RSVP, guestbook, or deployment configuration. Treat Firebase as an optional persistence upgrade, not a runtime prerequisite.