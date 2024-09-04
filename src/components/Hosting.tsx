import { NoDomains } from "./no-domains.js";
import { ListDomains } from "./list-domains.js";
import { Domain } from "./domain.js";
import { setDomains, useStore } from "../store.js";
import { Loader } from "./loader.js";
import { useEffect, useState } from "react";
import { fetchTonDnsDomains } from "../api.js";
import { useAuth } from "../hooks/useAuth.js";
import { useTonConnectUI } from "@tonconnect/ui-react";

type HostingProps = {
  token: string;
};
export const Hosting = (props: HostingProps) => {
  const { domains, selectedDomain } = useStore();
  const [loading, setLoading] = useState(true);
  const { setAuthorizated, setToken } = useAuth();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (props.token) {
      fetchTonDnsDomains(props.token)
        .then((domains) => {
          if (domains) {
            setDomains(domains);
          } else {
            throw new Error("No domains");
          }
        })
        .catch(() => {
          tonConnectUI.disconnect();
          setAuthorizated(false);
          setToken("");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (domains.length === 0) {
    return <NoDomains />;
  }

  if (domains.length > 0 && !selectedDomain) {
    return <ListDomains />;
  }

  if (domains.length > 0 && selectedDomain) {
    return <Domain />;
  }

  return <Loader />;
};
