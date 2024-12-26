import {
  ArrowRightCircle,
  LayoutTemplate,
  Network,
  Trash2,
} from "lucide-react";
import { NoSiteContent } from "./no-site";
import { SiteByTemplateContent } from "./template";
import { ProxyContent } from "./proxy";
import { RedirectContent } from "./redirect";
export const hostingOptions: HostingOption[] = [
  {
    name: "Template",
    icon: <LayoutTemplate />,
    component: <SiteByTemplateContent />,
    description: "Create a customized site using our template",
    enabled: true,
  },
  {
    name: "Redirect",
    icon: <ArrowRightCircle />,
    component: <RedirectContent />,
    description: "Redirect visitors to another URL",
    enabled: true,
  },
  {
    name: "Proxy",
    icon: <Network />,
    component: <ProxyContent />,
    description: "Set up a proxy for your domain",
    enabled: true,
  },
  {
    name: "Reset",
    icon: <Trash2 />,
    component: <NoSiteContent />,
    description: "Keep your domain inactive without any content",
    enabled: true,
  },
];
