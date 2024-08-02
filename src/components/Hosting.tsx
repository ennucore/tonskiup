import { NoDomains } from "./no-domains.js";
import { ListDomains } from "./list-domains.js";
import { Domain } from "./domain.js";
import { useStore } from "../store.js";
import { Loader } from "./loader.js";

export const Hosting = () => {
  const { domains, selectedDomain } = useStore();

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
