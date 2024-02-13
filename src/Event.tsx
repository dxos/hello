import { Expando, Schema, useQuery, useSpace } from "@dxos/react-client/echo";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NameTag } from "./NameTag";
import { PublicKey, useShell } from "@dxos/react-client";
import { useIdentity } from "@dxos/react-client/halo";

// -- ECHO schema ------------------------------------------------

const CONTACT_TYPENAME = "dxos.org.contact";

const ContactType = new Schema({
  typename: CONTACT_TYPENAME,
  props: [
    { id: "name", type: Schema.PropType.STRING },
    { id: "email", type: Schema.PropType.STRING }, // TODO: change to organization
    { id: "emoji", type: Schema.PropType.STRING },
    { id: "color", type: Schema.PropType.STRING },
  ],
});

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
  const shell = useShell();

  // Add the schema to the space if it doesn't exist
  useEffect(() => {
    const checkAndAddSchema = async () => {
      const existingSchemas = space?.db.query(
        (object) => object.__typename === CONTACT_TYPENAME
      );
      if (existingSchemas.objects.length === 0) {
        space?.db.add(ContactType);
      }
    };
    checkAndAddSchema();
  }, [space]);

  // Fetch the contacts objects
  const allContacts = useQuery(
    space,
    (object) => object.__typename == CONTACT_TYPENAME
  );

  const [myContact, setMyContact] = useState<Expando | undefined>();
  const [otherContacts, setOtherContacts] = useState<Expando[] | undefined>();
  useEffect(() => {
    if (identity?.identityKey) {
      setMyContact(
        allContacts.find((contact) => contact.identity === identityKeyString)
      );
      setOtherContacts(
        allContacts.filter((contact) => contact.identity !== identityKeyString)
      );
    }
  }, [allContacts]);

  const handleAddContact = (contact: ContactProps) => {
    const contactObj = new Expando(
      {
        name: contact.name,
        email: contact.email,
        emoji: contact.emoji,
        color: contact.color,
        identity: identity?.identityKey.toString(),
      },
      { schema: ContactType }
    );

    space?.db.add(contactObj);
  };

  return (
    <div>
      <button
        onClick={async () => {
          void shell.shareSpace({
            spaceKey: PublicKey.from(space?.key),
          });
        }}
      >
        invite
      </button>
      <NameTag contact={myContact} handleAdd={handleAddContact} />
      <div>
        <button
          onClick={async () => {
            void shell.shareIdentity();
          }}
        >
          manage device
        </button>
      </div>
    </div>
  );
};
