# Make contact leads actually visible

## What I verified just now

- Your 3 leads **are** saved in Sanity (project `n5ypw1x0`, dataset `production`, type `contactSubmission`): Test / test123@gmail.com, Sai / sai@gmail.com, Deploy Test / deploytest29468@example.com.
- Your Studio at `bridge-craft-cms.sanity.studio` was built and deployed **before** the `contactSubmission` type was added. A hosted Studio bundles its own copy of the schema, so adding the type to the project schema does not make it appear in that Studio's sidebar. That is exactly why "Contact submission" is missing from your Structure list — my earlier instructions were wrong about it being there.
- Your Vision screenshot showed no results simply because the query box was empty.

## The fix (two parts, so you are not stuck again)

### 1. Immediate, works right now — no deploys
Open Studio > **Vision**, dataset `production`, paste this query and hit run:

```text
*[_type == "contactSubmission"] | order(_createdAt desc)
```

This reads the same dataset the Studio Structure view reads, so the leads will show up. This works today, guaranteed.

### 2. Permanent — a Leads list inside the Studio sidebar
Redeploy a Studio bound to the current project schema (which includes `contactSubmission`) so "Contact submission" appears as a normal item in the left sidebar with a readable list (name, email, date) and full detail view per lead.

If the redeploy cannot attach to your existing `bridge-craft-cms.sanity.studio` address, the alternative is a second Studio URL that carries the full schema, and I will hand you the exact link and confirm the leads are listed there before telling you it is done.

## Optional third safety net
A private **/admin/leads** page on the website itself (simple passcode) that lists every submission pulled from Sanity, with search and CSV export. This is fully owned by your client along with the site and does not depend on anyone learning Studio. Say the word and I will include it.

## Technical notes

- Sanity project: `n5ypw1x0`, dataset `production`, document type `contactSubmission`.
- Studio app id: `oo0zl2wti8hrjepweun29k9c` ("Bridge Craft CMS").
- Submissions are written by the edge function `save-contact-to-sanity` using the write token; no change needed there.
- Verification before I report back: run the GROQ query and open the redeployed Studio to confirm the leads list renders.
