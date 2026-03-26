import { useEffect } from "react";

const PORTAL_URL = "https://portalclientes.servioptica.co";
const SCRIPT_SRC = `${PORTAL_URL}/js/portal-menu-widget.js`;
const SCRIPT_SELECTOR = 'script[data-portal-widget="servioptica-portal-menu"]';

const PortalMenuWidget = () => {
  useEffect(() => {
    const existingScript = document.querySelector(SCRIPT_SELECTOR);
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-auto-init", "");
    script.setAttribute("data-portal-url", PORTAL_URL);
    script.setAttribute("data-position", "top-right");
    script.setAttribute("data-portal-widget", "servioptica-portal-menu");

    document.head.appendChild(script);
  }, []);

  return null;
};

export default PortalMenuWidget;
