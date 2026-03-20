import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const sections = [
  {
    title: "Introduction",
    content: "These Terms and Conditions govern your use of the Bridge Craft Engineers & Consultants website. By accessing this website, you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our website.",
  },
  {
    title: "Intellectual Property",
    content: "All content on this website — including text, graphics, logos, images, designs, and software — is the property of Bridge Craft Engineers & Consultants and is protected by applicable intellectual property laws. Unauthorized reproduction, distribution, or modification of any materials is strictly prohibited.",
  },
  {
    title: "Use of Website",
    content: "You may use this website for lawful purposes only. You must not use this website in any way that causes, or may cause, damage to the website or impairment of its availability. You must not use this website to copy, store, or transmit any material that consists of or is linked to any spyware, malware, or other malicious software.",
  },
  {
    title: "Limitation of Liability",
    content: "Bridge Craft Engineers & Consultants shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or any content therein. All project information, case studies, and technical data are provided for informational purposes only.",
  },
  {
    title: "Governing Law",
    content: "These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu.",
  },
  {
    title: "Contact",
    content: "For any questions regarding these Terms and Conditions, please contact us at our office: 124/1, 2nd Floor, Heera Panna Complex, G N Chetty Road, T Nagar, Chennai 600017, or call us at +91 44 49793337.",
  },
];

const Terms = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <SectionHeading title="Terms & Conditions" />
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

export default Terms;
