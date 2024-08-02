import { ArrowRightCircle, FileX, LayoutTemplate, Network } from "lucide-react";
import { NoSiteContent } from "./no-site";
import { SiteByTemplateContent } from "./template";
import { ProxyContent } from "./proxy";
import { RedirectContent } from "./redirect";
export const hostingOptions: HostingOption[] = [
  {
    name: "Proxy",
    icon: <Network />,
    component: <ProxyContent />,
    description: "Set up a proxy or ADNL address for your domain",
  },
  {
    name: "Template",
    icon: <LayoutTemplate />,
    component: <SiteByTemplateContent />,
    description: "Create a customized site using our template",
  },
  {
    name: "Redirect",
    icon: <ArrowRightCircle />,
    component: <RedirectContent />,
    description: "Redirect visitors to another URL",
  },
  {
    name: "Disable",
    icon: <FileX />,
    component: <NoSiteContent />,
    description: "Keep your domain inactive without any content",
  },
];
