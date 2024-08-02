import { NoDomains } from "./no-domains.js";
import { ListDomains } from "./list-domains.js";
import { Domain } from "./domain.js";
import { setDomains, useStore } from "../store.js";
import { Loader } from "./loader.js";
import { useEffect, useState } from "react";
import { fetchTonDnsDomains } from "../api.js";
import { useAuth } from "../hooks/useAuth.js";

export const Hosting = () => {
  const { domains, selectedDomain } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTonDnsDomains().then((domains) => {
      setDomains(domains);
      setLoading(false);
    });
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
