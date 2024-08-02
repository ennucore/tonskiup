type Domain = {
  domain: string;
  picture: string;
  address: string;
  site: SiteData;
};

type HostingOption = {
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  description: string;
};

type SiteData = {
  domain: string;
  redirect?: string;
  proxy?: string | null;
  description?: string;
  wallet?: string | null;
  contacts?: Record<string, string>;
  template_id?: string;
  blog?: any | null;
  title?: string;
  picture?: string | null;
};
