import { Expando } from "@dxos/echo-schema";
import React from "react";

export type ContactListProps = { contacts: Expando[] };
export const ContactList = (props: ContactListProps) => {
  const contacts = props.contacts;
  return (
    <div>
      <h2 className="text-2xl mt-2">Contacts</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: contact.color }}
              >
                <span className="text-2xl">{contact.emoji}</span>
              </div>
              <div className="flex-grow flex items-center ml-2">
                <p className="text-lg">{contact.name}</p>
                <p className="text-lg text-gray-500 ml-2">{contact.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
