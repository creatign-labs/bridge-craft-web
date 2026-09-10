import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];
import {
  Compass,
  HardHat,
  FileText,
  Settings,
  Shield,
  Building2,
  Lightbulb,
  Train,
  ArrowUpRight,
  Anchor,
  Layers,
  Gauge,
  Mountain,
  CheckCircle2,
  Waves,
  type LucideIcon,
} from "lucide-react";


export const sanityClient = createClient({
  projectId: "n5ypw1x0",
  dataset: "production",
  apiVersion: "2024-06-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);

export const imageUrl = (source: SanityImageSource | undefined, fallback: string) => {
  if (!source) return fallback;
  try {
    return urlFor(source).auto("format").url();
  } catch {
    return fallback;
  }
};

const iconMap: Record<string, LucideIcon> = {
  Compass,
  HardHat,
  FileText,
  Settings,
  Shield,
  Building2,
  Lightbulb,
  Train,
  ArrowUpRight,
  Anchor,
  Layers,
  Gauge,
  Mountain,
  CheckCircle2,
  Waves,
};


export const getIcon = (name?: string, fallback: LucideIcon = Compass): LucideIcon =>
  (name && iconMap[name]) || fallback;

// -------- Queries --------

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title, tagline, shortName, description, logoInitials,
  primaryPhone, primaryEmail, address, mapEmbedUrl,
  defaultSeo, socialLinks
}`;

export const navigationQuery = `*[_type == "navigation"][0]{
  label, items[]{label, href}, ctaLabel, ctaHref
}`;

export const footerQuery = `*[_type == "footer"][0]{
  ctaEyebrow, ctaHeadline, ctaHeadlineAccent,
  primaryCta, secondaryCta, blurb,
  navLinks[]{label, href},
  legalLinks[]{label, href},
  copyright
}`;

export const homepageQuery = `*[_type == "homepage"][0]{
  seo,
  heroEyebrow, heroHeadline, heroHeadlineAccent, heroSubheadline, heroImage,
  heroPrimaryCta, heroSecondaryCta,
  stats,
  "homeStats": *[_type == "homeStats"][0]{intro, stats[]{value, label}},
  aboutEyebrow, aboutHeadline, aboutHeadlineAccent, aboutBody, aboutValues, aboutImage, aboutCtaLabel, aboutCtaHref,
  servicesEyebrow, servicesHeadline, servicesHeadlineAccent,
  "featuredServices": featuredServices[]->{_id, number, title, shortDescription, icon},
  projectsEyebrow, projectsHeadline, projectsHeadlineAccent,
  "featuredProjects": featuredProjects[]->{_id, title, tag, year, image, "slug": slug.current},
  whyEyebrow, whyHeadline, whyHeadlineAccent, strengths,
  sectorsEyebrow, sectors,
  "featuredTestimonials": featuredTestimonials[]->{_id, quote, authorName, authorRole, authorCompany}
}`;

export const projectsPageQuery = `{
  "seo": *[_type == "seoSettings" && route == "/projects"][0].seo,
  "projects": *[_type == "project"] | order(order asc, year desc){
    _id, title, "slug": slug.current, tag, year, client, location, summary, image,
    "details": summary, metrics
  }
}`;

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  seo, eyebrow, headline, headlineAccent, intro,
  "services": services[]->{_id, number, title, shortDescription, icon, bullets, image}
}`;

export const galleryQuery = `{
  "seo": *[_type == "seoSettings" && route == "/gallery"][0].seo,
  "items": *[_type == "galleryItem"] | order(order asc){_id, title, category, image, aspect}
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  seo, eyebrow, headline, headlineAccent, intro,
  formHeading, formSubheading, submitLabel, externalFormUrl, externalFormLabel,
  address, phone, email, hours, mapEmbedUrl
}`;

export const blogIndexQuery = `*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc){
  _id, title, "slug": slug.current, excerpt, coverImage, categories,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "authorName": author->name
}`;

export const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id, title, excerpt, coverImage, categories, body, seo,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "authorName": author->name,
  "authorRole": author->role
}`;
