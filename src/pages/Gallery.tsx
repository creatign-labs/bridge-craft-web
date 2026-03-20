import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-bridge.jpg";
import projectHighway from "@/assets/project-highway.jpg";
import projectBridge from "@/assets/project-bridge.jpg";
import projectSmartcity from "@/assets/project-smartcity.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectGeotech from "@/assets/project-geotech.jpg";
import projectRailway from "@/assets/project-railway.jpg";
import projectUrban from "@/assets/project-urban.jpg";
import teamImg from "@/assets/team-office.jpg";

const images = [
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
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading title="Our Work in Action" subtitle="A visual journey through our engineering projects." />
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-lg shadow-card hover:shadow-card-hover transition-shadow break-inside-avoid"
              >
                <img src={img.src} alt={img.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                  <ZoomIn size={32} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-primary hover:text-accent">
            <X size={32} />
          </button>
          <img src={images[lightbox].src} alt={images[lightbox].alt} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
