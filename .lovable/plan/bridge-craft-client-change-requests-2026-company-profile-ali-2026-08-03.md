# Bridge Craft — Client Change Requests (2026 Company Profile Alignment)

Rebuild the site's content so everything matches the approved 2026 Company Profile: real services, real projects, real photographs, correct contact details, no unverified claims. Design language (dark/light editorial layout, typography, motion) stays as it is.

## What changes

### 1. Content source of truth
All copy comes from the Company Profile PDF. Existing invented content (15+ years, 120+ projects, ₹8,000Cr assets, 50+ cities, "Smart Cities / Metro Rail / Ports" sectors, the 7 fictional projects, generic services) is removed.

### 2. Home page
- Intro rewritten from the Profile ("Engineering Design Consultants specializing in Structural, Geotechnical and Geo-Physical Engineering…").
- Hero image replaced with an actual Bridge Craft project photograph (marine bridge / drilling rig).
- Four real services shown: Pre-Construction & Engineering Advisory, Structural Engineering, Geotechnical Engineering, Geophysical Engineering.
- Project highlights limited to real projects (Middle Strait Creek marine bridge, NH-04 corridor, NH-45C, Manair River railway bridge, 350 MW solar).
- Two primary buttons: **Download Company Profile** and **Contact Us**.
- Invented statistics band replaced with factual figures drawn from the Profile (e.g. 1,925 m marine bridge, 26 km NH corridor, 350 MW solar, 27 deep boreholes) — or dropped if you prefer none.
- "Why Choose Us" replaced with the six Profile points (marine expertise, integrated services, execution-focused design, cost-effective solutions, challenging site conditions, reliable delivery).

### 3. About Us (new page + nav entry)
Introduction, Vision, Mission, the five Values, and Corporate Strategy pillars, verbatim from the Profile. Team section uses the Profile's leadership paragraph only — all AI/stock team photos removed. Real management photos can be added later.

### 4. Services page
Exactly the four Profile services, each with its Profile description and Key Capabilities bullets. All other services removed.

### 5. Projects page
All ten Profile projects, each card showing Project name, Client, Authority, Location, Scope of work, plus description and key highlights. Category tags become real ones: Bridges, Highways, Railways, Solar, Buildings, Retrofitting. Actual project photographs used.

### 6. Technical Credentials (new page + nav entry)
Sector experience — highways, bridges, railways, solar, buildings, retrofitting — with the supporting project evidence, plus download links for the Company Profile and (once you upload it) the Project Experience / List of Projects document.

### 7. Contact page
- Address: Flat No.8, 3rd Floor, Parsn Manere, 'C' Wing, New No.442, Anna Salai, Mount Road, Chennai – 600006
- Email: info@bridgecraft.in · Website: bridgecraft.in · Phone: 9988776655
- Google Map pin updated to the Anna Salai address.
- Enquiry form sends a real email to info@bridgecraft.in and a confirmation to the sender, with submissions stored as backup.

### 8. Photographs & branding
Every stock/AI-generated image is removed. Real photographs, structural models, retrofitting drawings and the Bridge Craft logo are extracted from the Company Profile PDF and used across the site; higher-resolution originals can replace them later without further code changes.

### 9. General corrections
Spelling/grammar pass, removal of unverified claims, no NABL accreditation claim, no contractor positioning, and a desktop + mobile check of every page.

## Technical notes

- **CMS**: the site already reads from Sanity with in-code fallbacks. All new and corrected content is written into Sanity (homepage, aboutPage, servicesPage, project, contactPage, siteSettings, navigation, footer, seoSettings) and the in-code fallbacks are updated to match, so nothing stale can appear. New schema fields are added for About (vision/mission/values/strategy), Technical Credentials, and download files.
- **Images**: extracted from the PDF, uploaded to Sanity's asset store, and referenced by the documents — replaceable from the Studio.
- **Downloads**: the Company Profile PDF and logo are hosted as project assets; the Project Experience button is wired and shows once you upload that file.
- **Contact form**: Lovable Cloud is enabled to provide the backend. A `contact_submissions` table (RLS: public insert only, no public read) stores each enquiry, and an email function delivers it to info@bridgecraft.in with a confirmation to the sender. This requires a verified sender domain — bridgecraft.in is the natural choice, and I'll walk you through the DNS step when we get there.
- **Routes added**: `/about` and `/credentials`, added to the navbar and footer.
- **Removed**: blog/testimonial/FAQ sample content is left in the CMS but stays off the site, since the change list doesn't include them.
- **Domain**: connecting the finished site to bridgecraft.in is done from Project Settings once you approve the content.

## Open items (not blocking)
- Project Experience / List of Projects PDF — upload when ready.
- Real management photographs — optional, per the change list.
- Phone number 9988776655 is used as given; tell me if the official landline differs.
