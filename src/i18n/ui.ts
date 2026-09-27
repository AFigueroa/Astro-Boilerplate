import type { Locale } from "./routes";

/**
 * Interface strings (nav, labels, buttons). Page copy lives in the content
 * collections, not here.
 *
 * `es` is typed against `en`'s keys, so a string missing from either locale
 * fails `astro check` instead of rendering blank.
 */
const en = {
  "nav.label": "Main navigation",
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.about": "About",
  "nav.contact": "Contact",
  "lang.switch": "Español",
  "lang.switchLabel": "Ver esta página en español",
  "footer.rights": "All rights reserved.",
  "footer.email": "Email",
  "services.startingAt": "Starting at",
  "services.quote": "Custom quote",
  "contact.notConfigured": "The contact form isn't connected yet. Please email us directly.",
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.message": "Message",
  "contact.send": "Send",
} as const;

type UiKey = keyof typeof en;

const es: Record<UiKey, string> = {
  "nav.label": "Navegación principal",
  "nav.home": "Inicio",
  "nav.services": "Servicios",
  "nav.about": "Sobre mí",
  "nav.contact": "Contacto",
  "lang.switch": "English",
  "lang.switchLabel": "View this page in English",
  "footer.rights": "Todos los derechos reservados.",
  "footer.email": "Correo electrónico",
  "services.startingAt": "Desde",
  "services.quote": "Cotización personalizada",
  "contact.notConfigured":
    "El formulario de contacto aún no está conectado. Por favor, escríbenos directamente.",
  "contact.name": "Nombre",
  "contact.email": "Correo electrónico",
  "contact.message": "Mensaje",
  "contact.send": "Enviar",
};

const dictionaries: Record<Locale, Record<UiKey, string>> = { en, es };

export function useTranslations(locale: Locale) {
  return (key: UiKey): string => dictionaries[locale][key];
}

export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "es" ? "es-PR" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
