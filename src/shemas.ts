// const contactSchema = {
//   name: S.string,
//   email: S.string.pipe(
//     S.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
//   ),
// };

// interface Contact extends S.Schema.To<typeof {S.struct(contactSchema)}> {}

// ECHO API for defining a schema

import * as S from "@effect/schema/Schema";

export const Organization = S.struct({});
export const echoObject = (identifier: string): S => {};

export const Contact = S.struct({
  name: S.string.pipe(S.required),
  organization: S.string,
}).pipe(
  // annotations on the schema to work with ECHO
  echoObject("dxos.types.contact")
);

export type ContactType = S.Schema.To<typeof Contact>;

export const NameTag = S.struct({
  emoji: S.string.pipe(
    S.pattern(
      /^[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{2B50}\u{1F004}\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F251}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{2B50}\u{1F004}\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F251}\u{2705}\u{270A}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}-\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1E6}-\u{1F1FF}\u{1F201}-\u{1F202}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F23A}\u{1F250}-\u{1F251}\u{1F300}-\u{1F320}\u{1F321}-\u{1F32C}\u{1F32D}-\u{1F32F}\u{1F330}-\u{1F335}\u{1F336}\u{1F337}-\u{1F37C}\u{1F37D}\u{1F37E}-\u{1F37F}\u{1F380}-\u{1F393}\u{1F394}-\u{1F395}\u{1F396}-\u{1F397}\u{1F398}-\u{1F39F}\u{1F3A0}-\u{1F3C4}\u{1F3C5}-\u{1F3C7}\u{1F3C8}-\u{1F3C9}\u{1F3CA}-\u{1F3CC}\u{1F3CD}-\u{1F3CF}\u{1F3D0}-\u{1F3F0}\u{1F3F3}-\u{1F3F5}\u{1F3F7}\u{1F3F8}-\u{1F3FF}\u{1F400}-\u{1F43E}\u{1F43F}\u{1F440}\u{1F441}\u{1F442}-\u{1F4F7}\u{1F4F8}\u{1F4F9}-\u{1F4FC}\u{1F4FD}-\u{1F4FE}\u{1F4FF}\u{1F500}-\u{1F53D}\u{1F549}-\u{1F54A}\u{1F54B}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F568}-\u{1F579}\u{1F57A}\u{1F587}\u{1F58A}-\u{1F58D}\u{1F590}\u{1F595}-\u{1F596}\u{1F5A4}\u{1F5A5}\u{1F5A8}\u{1F5B1}-\u{1F5B2}\u{1F5BC}\u{1F5C2}-\u{1F5C4}\u{1F5D1}-\u{1F5D3}\u{1F5DC}-\u{1F5DE}\u{1F5E1}\u{1F5E3}\u{1F5E8}\u{1F5EF}\u{1F5F3}\u{1F5FA}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CB}-\u{1F6CF}\u{1F6D0}-\u{1F6D2}\u{1F6E0}-\u{1F6E5}\u{1F6E9}\u{1F6EB}-\u{1F6EC}\u{1F6F0}\u{1F6F3}\u{1F6F4}\u{1F6F7}-\u{1F6F8}\u{1F6F9}\u{1F910}-\u{1F918}\u{1F919}-\u{1F91E}\u{1F91F}\u{1F920}-\u{1F927}\u{1F928}-\u{1F92F}\u{1F930}\u{1F931}-\u{1F932}\u{1F933}-\u{1F93A}\u{1F93C}-\u{1F93E}\u{1F940}-\u{1F945}\u{1F947}-\u{1F94B}\u{1F94C}-\u{1F94F}\u{1F950}-\u{1F95E}\u{1F95F}-\u{1F96B}\u{1F980}-\u{1F984}\u{1F985}-\u{1F991}\u{1F992}-\u{1F997}\u{1F9C0}\u{1F9C1}\u{1F9D0}\u{1F9D1}\u{1F9D2}-\u{1F9D4}\u{1F9D5}-\u{1F9D9}\u{1F9DA}-\u{1F9DD}\u{1F9DE}-\u{1F9DF}\u{1F9E0}\u{1F9E1}\u{1F9E2}-\u{1F9E3}\u{1F9E4}\u{1F9E5}\u{1F9E6}\u{1F9E7}-\u{1F9FF}\u{1FA00}-\u{1FA53}\u{1FA60}-\u{1FA6D}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}\u{1FAA0}-\u{1FAA8}\u{1FAB0}-\u{1FAB6}\u{1FAC0}-\u{1FAC2}\u{1FAD0}-\u{1FAD6}\u{1FAE0}-\u{1FAE7}\u{200D}\u{20E3}\u{FE0F}\u{E0020}-\u{E007F}]+$/u
    )
  ),
  color: S.string.pipe(S.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)),
  contact: Contact.pipe(S.required),
});

export type NameTagType = S.Schema.To<typeof NameTag>;

// RESOLVER
// resolver maps - for a specific field on the type, use this method to resolve it
//   async method that takes the parent object and some arguments (like an id) and
//   then you can define any method for fetching the data and return the result in
//   shape of the schema
// mutator - when the field changes reactively, this method is called to update the
//   object in the integrating system
// annotate the field to describe how often to fetch, whether to cache, etc. you can also
//   handle optimistic updates to make UI state locally fast

// How we'll interface with non-ECHO data :point_up:

type Contact = S.Schema.To<typeof Contact>;

// -- Data ----------------------------------

const createObject = <T extends S.Schema>(schema: T, data: {}) => {
  return Contact.create(data);
};

// types are inferred from the schema

// create a contact object and parse the data
const contact = createObject(Contact, {
  name: "John Doe",
  email: "john.doe@example.com",
});

space.db.add(contact);

// mutate data
// contact is actually a Proxy
// - validation
// - mutation of the stored data
// - replication
contact.name = "John Doe";

try {
  contact.name = 22; // type error + runtime error
} catch (e) {}

// how do I validate an object against a schema before mutating it?
// so that i don't have to use a try/catch

getSchema(contact); // => Contact -- effect schema instance

/*
3 kinds of storage:

1. In-memory (not storing object)
2. Local storage - unreplicated (IDB, node FS api)
3. Replicated ECHO space; automerge CRDT.
*/

// query
query(space, Contact, {}, {});

// -- Schema introspection -------------------------

/*

- schema is serialized and stored together with data
- a peer that doesnt have Contact schema can still instrospect the data
   - composer table demo

Why do we store schema:

- schema is discoverable
- self-describing data
- better app interop -- some apps can work over generic data
- AI can understand the data
  - infer information from the data
  - for LLM results into the shape described by the schema

Further problems:
 - schema evolution
 - data migration
    - cambria
*/

// -- Effect/Schema Code

const Contact = S.struct({
  name: S.string,
  email: S.string.pipe(
    S.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
  ),
});

interface Contact extends S.Schema.To<typeof Contact> {}

const NameTagSchema = S.struct({
  emoji: S.string,
  color: S.string,
  contact: Contact,
});

interface NameTagSchema extends S.Schema.To<typeof NameTagSchema> {}
// validate the contact with effect/schema
// probably use `S.is` instead: https://github.com/effect-ts/effect/tree/main/packages/schema#assertions
const parseContact = S.decodeUnknownEither(Contact);
const contactInput: unknown = { name, email };
const parseContactResult = parseContact(contactInput);
if (Either.isLeft(parseContactResult)) {
  console.log("Invalid contact input", parseContactResult.left);
  return;
}

// validate the nameTag with effect/schema
// probably use `S.is` instead: https://github.com/effect-ts/effect/tree/main/packages/schema#assertions
const parseNameTag = S.decodeUnknownEither(NameTagSchema);
const nameTagInput: unknown = { emoji, color, contact: contactInput };
const parseNameTagResult = parseNameTag(nameTagInput);
if (Either.isLeft(parseNameTagResult)) {
  console.log("Invalid nameTag input", parseNameTagResult.left);
  return;
}
