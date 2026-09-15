# The Family Record

An evidence-led, perspective-based documentary archive for the Cymbalista, Johnson, Israel, Parajas, Apostol, and connected families.

## How it works

The public page introduces the project without exposing living-family information. Approved family members enter through a one-time email link. The complete record—including people, relationships, narrative, evidence labels, research sources, and private source files—is loaded from a row-level-secured database only after access is verified.

The reader can choose a point of view. That choice changes the opening, branch names and order, story framing, family route, faith discussion, and roots-to-visit guidance. It does not change claims or evidence status.

## Access and contributions

- Approved emails receive a passwordless, one-use sign-in link.
- New readers submit their name, email, connection, and reason for access.
- A family administrator reviews requests and can approve and send a link.
- Family members can submit additions or corrections as proposals with provenance.
- Proposals never silently overwrite the accepted record.

## Evidence labels

- **Verified:** independently checked institutional or first-hand source.
- **Source-backed:** present in supplied family material; the underlying record has not necessarily been inspected independently.
- **Family reconstruction:** a reasoned conclusion from linked clues, testimony, or DNA accounts.
- **Open question:** incomplete, ambiguous, or conjectural.
- **Historical context:** verified setting that does not prove an individual family claim.

## Local preview and publishing

Serve `dist/` with a static web server. `vercel.json` publishes only that directory. Private seed material, source files, and database scripts are intentionally ignored by both Git and Vercel.
