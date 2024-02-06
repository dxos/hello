import React from "react";
import { ClientProvider, Config, Local, Defaults } from "@dxos/react-client";
import { ServiceWorkerToast } from "./ServiceWorkerToast";
import { Status, ThemeProvider } from "@dxos/react-ui";
import { useRegisterSW } from "virtual:pwa-register/react";
import { defaultTx } from "@dxos/react-ui-theme";
import translations from "./translations";
import { ErrorBoundary } from "./ErrorBoundary";
import { NameTag } from "./NameTag";

const config = async () => new Config(Local(), Defaults());

const createWorker = () =>
  new SharedWorker(new URL("./shared-worker", import.meta.url), {
    type: "module",
    name: "dxos-client-worker",
  });

const Loader = () => (
  <div className="flex bs-[100dvh] justify-center items-center">
    <Status indeterminate aria-label="Initializing" />
  </div>
);

export const App = () => {
  const serviceWorker = useRegisterSW();
  return (
    <ThemeProvider
      appNs="hello-dxos"
      tx={defaultTx}
      resourceExtensions={translations}
      fallback={<Loader />}
    >
      <ErrorBoundary>
        <ClientProvider
          config={config}
          createWorker={createWorker}
          fallback={Loader}
          onInitialized={async (client) => {
            const searchParams = new URLSearchParams(location.search);
            if (
              !client.halo.identity.get() &&
              !searchParams.has("deviceInvitationCode")
            ) {
              await client.halo.createIdentity();
            }
          }}
        >
          <NameTag />
          <ServiceWorkerToast variant="needRefresh" {...serviceWorker} />
        </ClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
