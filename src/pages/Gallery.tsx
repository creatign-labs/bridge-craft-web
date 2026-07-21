import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero-bridge.jpg";
import projectHighway from "@/assets/project-highway.jpg";
import projectBridge from "@/assets/project-bridge.jpg";
import projectSmartcity from "@/assets/project-smartcity.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectGeotech from "@/assets/project-geotech.jpg";
import projectRailway from "@/assets/project-railway.jpg";
import projectUrban from "@/assets/project-urban.jpg";
import teamImg from "@/assets/team-office.jpg";
import { useSanity } from "@/hooks/use-sanity";
import { galleryQuery, imageUrl } from "@/lib/sanity";

type GalleryItem = { _id: string; title?: string; category?: string; image?: unknown; aspect?: string };

const fallback = [
  { src: heroImg, alt: "Cable-stayed bridge at sunset" },
  { src: projectHighway, alt: "Highway interchange" },
  { src: projectBridge, alt: "Bridge tower detail" },
  { src: projectSmartcity, alt: "Smart city roads" },
  { src: projectIndustrial, alt: "Industrial corridor" },
  { src: projectGeotech, alt: "Geotechnical investigation" },
  { src: projectRailway, alt: "Railway overpass" },
  { src: projectUrban, alt: "Urban drainage" },
  { src: teamImg, alt: "Engineering team" },
];

const Gallery = () => {
  const { data } = useSanity<{ items?: GalleryItem[] }>("gallery", galleryQuery);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = data?.items?.length
    ? data.items.map((it, i) => ({
        src: imageUrl(it.image, fallback[i % fallback.length].src),
        alt: it.title || fallback[i % fallback.length].alt,
      }))
    : fallback;

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
        <div className="container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">Field & studio</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-100">
            Our work<br /><span className="text-primary">in action.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-xl text-lg animate-fade-in-up animation-delay-200">
            A visual journey through our engineering projects — captured on-site and in the studio.
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16 pb-24 reveal">
        <div className="container-narrow">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border break-inside-avoid"
              >
                <img src={img.src} alt={img.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">
                    <ZoomIn size={20} className="text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all bg-gradient-to-t from-background to-transparent">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    {String(i + 1).padStart(2, "0")} · {img.alt}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full border border-border bg-card/60 backdrop-blur flex items-center justify-center hover:bg-card">
            <X size={20} />
          </button>
          <img src={items[lightbox].src} alt={items[lightbox].alt} className="max-w-full max-h-[85vh] object-contain rounded-2xl" />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
