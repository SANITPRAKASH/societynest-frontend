import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Shield, Eye, Lock, Database, Users, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "January 14, 2026";

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Society and flat details for resident management",
        "Complaint and maintenance request information",
        "Usage data and analytics to improve our services",
        "Communication preferences and notification settings",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our society management services",
        "To process and track complaints and maintenance requests",
        "To send important notices and communications from your society",
        "To improve our platform based on usage patterns",
        "To ensure security and prevent unauthorized access",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "All data is encrypted in transit using TLS/SSL protocols",
        "We use industry-standard encryption for data at rest",
        "Role-based access control ensures data is only visible to authorized users",
        "Regular security audits and vulnerability assessments",
        "Secure authentication with password hashing and session management",
      ],
    },
    {
      icon: Users,
      title: "Data Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "Data is shared only within your society's authorized administrators",
        "Service providers may access data only to perform specific functions",
        "We may disclose information if required by law or legal process",
        "Aggregated, anonymized data may be used for analytics purposes",
      ],
    },
    {
      icon: Shield,
      title: "Your Rights",
      content: [
        "Access and review your personal information at any time",
        "Request correction of inaccurate or incomplete data",
        "Request deletion of your account and associated data",
        "Opt out of non-essential communications",
        "Export your data in a portable format upon request",
      ],
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: [
        "For privacy-related inquiries, contact us at privacy@societypro.com",
        "Data Protection Officer: dpo@societypro.com",
        "Response time: Within 30 business days for data requests",
        "Physical address: 123 Tech Park, Sector 62, Noida, UP 201301",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Your Privacy Matters
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are committed to protecting your privacy and ensuring the security 
              of your personal information. This policy explains how we collect, use, 
              and safeguard your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {/* Additional Info */}
            <div className="bg-muted/50 border border-border rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Updates to This Policy
              </h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time to reflect changes 
                in our practices or for other operational, legal, or regulatory reasons. 
                We will notify you of any material changes by posting the new policy on 
                this page and updating the "Last updated" date.
              </p>
              <p className="text-muted-foreground">
                We encourage you to review this Privacy Policy periodically to stay 
                informed about how we are protecting your information.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;