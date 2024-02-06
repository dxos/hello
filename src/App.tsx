import React, { useEffect } from "react";
import {
  ClientProvider,
  Config,
  Local,
  Defaults,
  useShell,
} from "@dxos/react-client";
import { ServiceWorkerToast } from "./ServiceWorkerToast";
import { Status, ThemeProvider } from "@dxos/react-ui";
import { useRegisterSW } from "virtual:pwa-register/react";
import { defaultTx } from "@dxos/react-ui-theme";
import translations from "./translations";
import { ErrorBoundary } from "./ErrorBoundary";
import { NameTag } from "./NameTag";
import { useSpace } from "@dxos/react-client/echo";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

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

export const Home = () => {
  const space = useSpace();
  const shell = useShell();
  const [search, setSearchParams] = useSearchParams();
  const invitationCode = search.get("spaceInvitationCode");
  const deviceInvitationCode = search.get("deviceInvitationCode");
  const navigate = useNavigate();

  useEffect(() => {
    if (deviceInvitationCode) {
      setSearchParams((p) => {
        p.delete("deviceInvitationCode");
        return p;
      });
    } else if (invitationCode) {
      setSearchParams((p) => {
        p.delete("spaceInvitationCode");
        return p;
      });
      void (async () => {
        const { space } = await shell.joinSpace({ invitationCode });
        if (space) {
          navigate(`/space/${space.key}`);
        }
      })();
    }
  }, [invitationCode, deviceInvitationCode]);

  return space ? <Navigate to={`/space/${space.key}`} /> : null;
};

const router = createBrowserRouter([
  {
    path: "/space/:spaceKey",
    element: <NameTag />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

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
          shell="./shell.html"
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
          <RouterProvider router={router} />
          <ServiceWorkerToast variant="needRefresh" {...serviceWorker} />
        </ClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
