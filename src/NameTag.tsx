import { Expando, useQuery, useSpaces } from "@dxos/react-client/echo";
import { useIdentity } from "@dxos/react-client/halo";
import React from "react";

export type NameTagProps = {};
export const NameTag = (props: NameTagProps) => {
  const identity = useIdentity();
  const [space] = useSpaces();

  const nameTags = useQuery(space, {
    expandoType: "contact",
    identity: identity?.identityKey.toString(),
  });

  return (
    <>
      {nameTags.length === 0 ? (
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <button
            onClick={() => {
              const contact = new Expando({
                expandoType: "contact",
                name: (document.getElementById("name") as HTMLInputElement)
                  .value,
                email: (document.getElementById("email") as HTMLInputElement)
                  .value,
                // set this to an identifier for the device
                identity: identity?.identityKey.toString(),
              });
              space?.db.add(contact);
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <p>Hello, my name is...</p>
          <p>Name: {nameTags[0].name}</p>
          <p>Email: {nameTags[0].email}</p>
        </div>
      )}
    </>
  );
};
