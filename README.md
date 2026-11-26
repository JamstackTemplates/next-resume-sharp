# Ines Calder — Resume

A single-page résumé and printable CV for a fictitious Staff Product Engineer in Melbourne. This is the `next-resume-sharp` Jamstacks gallery template. It exports to static files and runs independently of the starter and portal repositories.

## Local preview

Use Node 24 or newer.

```sh
npm ci
npm run dev
```

Run `npm run check` for content tests, TypeScript and the production export. Then run `npm start` to serve `out/` locally. Open the URL printed by the server.

| Route | Purpose |
| --- | --- |
| `/` | Résumé, skill tracing and print layout |
| `/contact/` | Enquiry details, hosted form when configured and email alternative |
| `/404.html` | Themed error page for unknown paths |

## Edit the résumé

| File | What to edit |
| --- | --- |
| [content/resume.ts](content/resume.ts) | Name, role, profile, availability, working hours, languages, experience, skills, work and education |
| [content/business.ts](content/business.ts) | Public email and phone, reply note and Contact description |
| [app/page.tsx](app/page.tsx) | Résumé section headings, spec labels, and calls to action |
| [app/contact/page.tsx](app/contact/page.tsx) | Enquiry introduction, checklist and fallback copy |
| [app/not-found.tsx](app/not-found.tsx) | Error heading and links |
| [site.config.json](site.config.json) | Public site name, metadata description, hostname, time zone and Jamstacks settings |
| [app/tailwind.input.css](app/tailwind.input.css) | Light and dark tokens, paper and steel treatments, and print layout |
| [components/proof-art.tsx](components/proof-art.tsx) and [components/career-rule.tsx](components/career-rule.tsx) | Inline artwork and résumé ruler |

- To change the availability line, edit `profile.availability.label`. Set `status` to `open`, `selective` or `closed`. Set `from` to a target month such as `'2027-02'`, or use `null` to omit it. The résumé uses the same data in the masthead, spec line and print view. A closed status suppresses the target month.
- To add a metric, add or update a `highlights` entry on its role in `experience`. Use `{ text: 'Released the component library.', metric: { value: '4', label: 'teams using it' } }`. The sample Harbourline role already has four highlights, so replace a highlight or combine two to make room for another.
- To change jobs, set the current role’s `end` to its inclusive `YYYY-MM` and add the new role at the top with `end: null`. Use a new lowercase, hyphen-separated ID and reference skill IDs from `skills`. Review the profile, title and metadata if the change affects them. The ruler, experience count and `worksFor` schema update from the roles on rebuild.
- To change a skill, edit its `level` (1–5), `since` (first professional year) or `group`. Keep IDs stable so trace links keep working. Projects reference a role via `experienceId` and skills via `skillIds`.
- The print budget allows five roles, one to four highlights per role (up to 200 characters each), and four work items (outcomes up to 160 characters). Run `npm run check` and print to A4 and Letter after changing content. The number of pages also depends on the length of your text.

When renaming, update `profile.name`, the public `site.config.json` strings, Contact copy and replace [the favicon](app/icon.svg) and [social image](public/og.png). The 1200×630 social image uses the name, title, city and career ruler on the proof sheet. Headings use Hubot Sans, body copy uses Geist and measurements use Source Code Pro. The font packages ship OFL-1.1 licences and serve font files from the site.

## Local time and print

The spec line and Contact show Melbourne time and a scheduling status, refreshed once per minute in the browser. Edit `profile.workingHours` for inclusive open and exclusive close times, using ISO weekdays (Monday is 1) and same-day `HH:MM` intervals. The configured site time zone takes precedence over the profile default. If changing city, update both zone values, the location and references to Melbourne and AET in page copy.

Use **Print / save as PDF** or the browser’s Print command. The sample renders as two pages in Chromium for A4 and Letter. Turn off the browser’s headers and footers if its print dialog adds a date or URL.

## Contact and Pages

Leave `jamstacks.siteId` blank for the email fallback, or set it to a public Jamstacks website ID. A configured export renders one form host and one site bootstrap on Contact. The runtime owns its name, email and message fields and delivery status. The email and phone remain visible in both configurations.

Keep `site.config.json` in the provisioner’s format. Use [.env.example](.env.example) for public build overrides such as `JAMSTACKS_SITE`, `SITE_TIME_ZONE` and `NEXT_PUBLIC_JAMSTACKS_CDN_URL`. For a project-path preview, use the Pages URL and its corresponding path.

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

The [Pages workflow](.github/workflows/pages.yml) uses GitHub Actions and preserves the `provisioning_id` dispatch input. Configure Pages to use GitHub Actions. The workflow uses `SITE_DOMAIN` or the domain in `site.config.json` and can configure the custom domain when `PAGES_ADMIN_TOKEN` is available. DNS and HTTPS are managed separately. A configured local preview does not exercise live enquiry delivery.

## Gallery sources

[jamstacks/](jamstacks/) contains the gallery manifest, captures and capture report. Customer builds, tests and Pages run without it. Capture from a fresh normal export using the Jamstacks screenshot tool, then run the separate gallery check.

```sh
node /path/to/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template "$PWD" --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

After review, remove `plan/` and `.claude/skills/` before gallery publication.
