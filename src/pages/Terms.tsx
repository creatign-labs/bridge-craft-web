import Layout from "@/components/Layout";

const sections = [
  { title: "Introduction", content: "These Terms and Conditions govern your use of the Bridge Craft Engineers & Consultants website. By accessing this website, you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our website." },
  { title: "Intellectual Property", content: "All content on this website — including text, graphics, logos, images, designs, and software — is the property of Bridge Craft Engineers & Consultants and is protected by applicable intellectual property laws. Unauthorized reproduction, distribution, or modification of any materials is strictly prohibited." },
  { title: "Use of Website", content: "You may use this website for lawful purposes only. You must not use this website in any way that causes, or may cause, damage to the website or impairment of its availability. You must not use this website to copy, store, or transmit any material that consists of or is linked to any spyware, malware, or other malicious software." },
  { title: "Limitation of Liability", content: "Bridge Craft Engineers & Consultants shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or any content therein." },
  { title: "Governing Law", content: "These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu." },
  { title: "Contact", content: "For questions regarding these Terms and Conditions, contact us at: 124/1, 2nd Floor, Heera Panna Complex, G N Chetty Road, T Nagar, Chennai 600017, or call +91 44 49793337." },
];

const Terms = () => (
  <Layout>
    <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
      <div className="container-narrow max-w-3xl">
        <div className="eyebrow mb-6">Legal</div>
        <h1 className="display-heading text-5xl md:text-7xl">Terms & Conditions</h1>
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

export default Terms;
