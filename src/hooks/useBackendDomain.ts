import { useStore } from "../store";
import { useState, useEffect } from "react";
import { getSiteData } from "../api";

export const useBackendDomain = () => {
  const { selectedDomain, domains } = useStore();
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState<SiteData | null>(null);

  useEffect(() => {
    if (selectedDomain) {
      setLoading(true);
      getSiteData(selectedDomain).then((data) => {
        setDomain({
          ...data,
          address: domains.find((d) => d.domain === selectedDomain)?.address,
        });
        setLoading(false);
      });
    } else {
      setDomain(null);
    }
  }, [selectedDomain]);

  return { domain, loading };
};
