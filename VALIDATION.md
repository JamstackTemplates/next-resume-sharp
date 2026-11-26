# Local verification

- `npm run check` passed all 29 tests, TypeScript and the Next.js static export. Résumé tests cover item-specific validation, common edits, career ruler geometry, ProfilePage JSON-LD and Melbourne schedule boundaries and DST.
- Chromium views of the résumé, Contact and 404 were reviewed at 1440px and 390px in light and dark. The 360px no-JavaScript check covered the section disclosure, static local time, skill text and print fallback. Browser checks also covered keyboard focus, skip and section links, skill tracing and clearing, theme changes, clock refresh and the print button.
- Chromium produced two pages at both A4 and Letter, with white margins, legible metrics and no split roles. An isolated edit changed the availability label and replaced one of the four Harbourline highlights with a new metric. The edit appeared in the masthead, spec line, role and printed output. The isolated copy also passed checks without `jamstacks/`.
- The configured and unconfigured `/preview/` exports passed canonical, social, sitemap, 404, navigation and Contact checks. The configured test intercepted a sample bootstrap request to check one host and one request per visit and the visible email alternative.
- The gallery captures came from the fresh normal export and passed `node --test jamstacks/config.test.mjs`.

Deployment and live enquiry delivery were outside these local checks.
