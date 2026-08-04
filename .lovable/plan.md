# Multi-page navigation check + remove profile download

## What I checked

The site is already a true multi-page website, not a one-pager. Every header and footer menu item, and every homepage CTA, is a real route link (`/about`, `/services`, `/projects`, `/gallery`, `/contact`) handled by the router — none are `#section` anchors. Clicking them loads a separate page and scrolls to top.

Two real problems did turn up, though, in the CMS-stored menus (the CMS values override the code defaults):

1. The "About" page exists at `/about`, but the CMS navigation and footer menus do not include it — so About is currently unreachable from the header and footer.
2. The homepage "Learn more about us" link points to `/services` in the CMS instead of `/about`.

## Changes to make

**Navigation**
- Add "About" to the header menu (between Home and Services) and to the footer menu in the CMS.
- Point the homepage "Learn more about us" CTA to `/about`.
- Re-verify each header link, footer link and homepage CTA loads its own page.

**Remove Company Profile download (everywhere, per your answer)**
- Footer: remove the "Company Profile 2026 (PDF)" link.
- Homepage About section: remove the "Company Profile 2026" download link.
- About page: remove the profile download button.
- Contact page: remove the profile download link.
- Keep the asset file itself in the project (unused), so nothing else breaks.

## Technical notes

- Menu items and CTA targets live in Sanity (`navigation`, `footer`, `homepage` documents); those get patched via the Sanity connector. Code fallbacks in `Navbar.tsx` / `Footer.tsx` already include About.
- Download-link removal touches `src/components/Footer.tsx`, `src/pages/Index.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx` (plus tidying now-unused `Download` icon imports).
- No design or layout changes.
