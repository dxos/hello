import { Expando } from "@dxos/echo-schema";
import React from "react";

export type ContactListProps = { contacts: Expando[] };
export const ContactList = (props: ContactListProps) => {
  const contacts = props.contacts;
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
