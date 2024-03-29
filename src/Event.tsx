import { Expando, Schema, useQuery, useSpace } from "@dxos/react-client/echo";
import React from "react";
import { useParams } from "react-router-dom";
import { NameTag } from "./NameTag";
import { PublicKey, useShell } from "@dxos/react-client";
import { useIdentity } from "@dxos/react-client/halo";
import { ContactList } from "./ContactList";

// -- ECHO schema ------------------------------------------------

const CONTACT_TYPENAME = "dxos.org.contact";

export type ContactProps = {
  name: "string";
  email: "string";
  emoji: "string";
  color: "string";
};

export const Event = () => {
  const { spaceKey } = useParams<{ spaceKey: string }>();

  const identity = useIdentity();
  const identityKeyString = identity.identityKey.toString();
  const space = useSpace(spaceKey);

  if (!space) {
    console.log("WARNING: space not found!");
  }

  const shell = useShell();

  // Fetch the contacts objects
  const allContacts = useQuery(
    space,
    (object) => object.__typename == CONTACT_TYPENAME
  );
  const otherContacts = allContacts.filter(
    (contact) => contact.identity !== identityKeyString
  );

  const handleAddContact = async (contact: ContactProps) => {
    // Check to see if schema exists in the database
    const existingSchemas = space?.db.query(
      (object) => object.typename === CONTACT_TYPENAME
    );

    let contactSchema;

    if (!existingSchemas || existingSchemas.objects.length === 0) {
      console.log("no schema found, creating new one");
      contactSchema = new Schema({
        typename: CONTACT_TYPENAME,
        props: [
          { id: "name", type: Schema.PropType.STRING },
          { id: "email", type: Schema.PropType.STRING }, // TODO: change to organization
          { id: "emoji", type: Schema.PropType.STRING },
          { id: "color", type: Schema.PropType.STRING },
        ],
      });

      space?.db.add(contactSchema);
    } else {
      console.log("schema found, using existing one");
      contactSchema = existingSchemas.objects[0];
    }

    const contactObj = new Expando(
      {
        name: contact.name,
        email: contact.email,
        emoji: contact.emoji,
        color: contact.color,
        identity: identity?.identityKey.toString(),
      },
      { schema: contactSchema }
    );

    console.log("adding contact to space", contactObj);
    space?.db.add(contactObj);
  };

  return (
    <div>
      <div className="text-center border-b-2 my-2 pb-2 relative">
        <h1 className="inline-block text-lg font-semibold text-blue-500">
          hello
        </h1>
        <span className="text-black font-light">
          &nbsp;from&nbsp;
          <a href="https://dxos.org" className="text-black hover:text-blue-500">
            DXOS
          </a>
        </span>
        <div className="inline absolute right-0 pr-2">
          <button
            onClick={async () => {
              void shell.shareSpace({
                spaceKey: PublicKey.from(space?.key),
              });
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded mx-2"
          >
            Invite
          </button>
          <button
            onClick={async () => {
              void shell.shareIdentity();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
          >
            ⚙
          </button>
        </div>
      </div>
      <div className="max-w-screen-sm mx-auto mt-2 px-2">
        <NameTag
          contact={allContacts.find(
            (contact) => contact.identity === identityKeyString
          )}
          handleAdd={handleAddContact}
        />
      </div>

      {otherContacts && otherContacts.length > 0 ? (
        <div className="max-w-screen-sm mx-auto mt-2 px-2">
          <ContactList contacts={otherContacts} />
        </div>
      ) : null}
    </div>
  );
};
