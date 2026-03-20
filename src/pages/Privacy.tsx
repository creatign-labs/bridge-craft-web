import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const sections = [
  {
    title: "Information Collection",
    content: "We collect information you provide directly to us, such as your name, email address, phone number, and message content when you use our contact form. We may also collect technical data including your IP address, browser type, and pages visited for analytics purposes.",
  },
  {
    title: "Use of Information",
    content: "We use the information we collect to respond to your inquiries, provide our engineering consultancy services, improve our website, send periodic communications about our services, and comply with legal obligations.",
  },
  {
    title: "Cookies",
    content: "Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our site. You can control cookie settings through your browser preferences.",
  },
  {
    title: "Data Security",
    content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure.",
  },
  {
    title: "Third-Party Links",
    content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.",
  },
  {
    title: "Contact Information",
    content: "If you have any questions about this Privacy Policy, please contact us at: Bridge Craft Engineers & Consultants, 124/1, 2nd Floor, Heera Panna Complex, G N Chetty Road, T Nagar, Chennai 600017, Tamil Nadu. Phone: +91 44 49793337.",
  },
];

const Privacy = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <SectionHeading title="Privacy Policy" />
        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h3 className="font-heading font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Privacy;
