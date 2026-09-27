import routes from "../src/i18n/routes.json" with { type: "json" };

/** Every page URL in every locale, from the shared route table. */
export const allPages = Object.entries(routes).flatMap(([key, localized]) =>
  Object.entries(localized).map(([locale, path]) => ({ key, locale, path })),
);
