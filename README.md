# NANO CONTRACTING

A navy and gold renovation website with an owner-only content editor.

## Editing

Open `/admin` and sign in with the owner's ChatGPT account. The server allowlist uses the `ADMIN_EMAIL` runtime setting. Every editing and upload endpoint checks the platform-authenticated identity. Write endpoints also require a matching Origin and a custom request header. Never trust caller-provided identity headers outside the Sites dispatcher.

The editor supports homepage copy, photo uploads with alt text, draft and published pages, a project portfolio, real client testimonials, contact details, a chatbot embed URL, and search visibility. Save updates persist in D1, with revision checks to prevent overwriting another editor tab. Uploaded photos persist in R2 and are limited to JPEG, PNG, and WebP under 5 MB.

## SEO

Pages render on the server. Page titles, descriptions, canonical URLs, social text metadata, sitemap, robots rules, and GeneralContractor structured data are included. Indexing starts disabled while the site is owner-private. Set sharing to Public and enable indexing when ready. Update `lib/content.ts`'s trusted canonical origin if moving to a custom domain. Add actual business contact details and service area before launch. No invented ratings or client reviews are included.

## Accessibility

The site includes skip links, labeled forms, visible focus, descriptive image text, readable colors, mobile navigation, text reflow, motion reduction, and persistent testimonial pause controls. Review uploaded alt text and chatbot accessibility as content changes. These measures are not an ADA/WCAG certification or a guarantee against claims. A full browser, screen reader, zoom, and independent accessibility audit remains necessary before claiming conformance.

## Validation

Type checking and a production build passed. Local HTTP integration checks covered protected routes, owner allowlisting, cross-origin write rejection, content persistence, edit conflicts, draft routing, publication, safe text escaping, sitemap, reserved slugs, file validation, and upload retrieval. The platform owns production sign-in; local checks simulated forwarded identity headers. Full browser accessibility QA was unavailable in the authoring session.

## Runtime

Sites supplies `DB` and `BUCKET`. Set `ADMIN_EMAIL` as a Sites runtime secret. Local `.dev.vars` files and runtime state are ignored. Generated Drizzle migrations are schema-only and must remain immutable after production application.
