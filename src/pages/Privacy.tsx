import Layout from "@/components/Layout";

const sections = [
  { title: "Information Collection", content: "We collect information you provide directly to us, such as your name, email address, phone number, and message content when you use our contact form. We may also collect technical data including your IP address, browser type, and pages visited for analytics purposes." },
  { title: "Use of Information", content: "We use the information we collect to respond to your inquiries, provide our engineering consultancy services, improve our website, send periodic communications about our services, and comply with legal obligations." },
  { title: "Cookies", content: "Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our site. You can control cookie settings through your browser preferences." },
  { title: "Data Security", content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure." },
  { title: "Third-Party Links", content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites." },
  { title: "Contact Information", content: "For questions about this Privacy Policy, contact us at: Bridge Craft Engineers & Consultants, 124/1, 2nd Floor, Heera Panna Complex, G N Chetty Road, T Nagar, Chennai 600017. Phone: +91 44 49793337." },
];

const Privacy = () => (
  <Layout>
    <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
      <div className="container-narrow max-w-3xl">
        <div className="eyebrow mb-6">Legal</div>
        <h1 className="display-heading text-5xl md:text-7xl">Privacy Policy</h1>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Last updated · March 2025</p>
      </div>
    </section>
    <section className="px-6 sm:px-8 lg:px-16 pb-24">
      <div className="container-narrow max-w-3xl space-y-12 border-t border-border pt-12">
        {sections.map((s, i) => (
          <div key={i} className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-heading font-bold text-lg mt-2">{s.title}</h3>
            </div>
            <p className="col-span-12 md:col-span-9 text-muted-foreground leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Privacy;
