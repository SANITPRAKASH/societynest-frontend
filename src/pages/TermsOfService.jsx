import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { FileText, AlertTriangle, Scale, Ban, RefreshCw, HelpCircle } from "lucide-react";

const TermsOfService = () => {
  const lastUpdated = "January 14, 2026";

  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: `By accessing or using SocietyPro ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.

These terms apply to all users of the Service, including society administrators, residents, and visitors. Additional terms may apply to specific features or services.`,
    },
    {
      icon: Scale,
      title: "2. Description of Service",
      content: `SocietyPro is a society management platform that provides:
      
• Resident and flat management for housing societies
• Complaint and maintenance request tracking
• Digital notice board and communication tools
• Administrative dashboards and reporting
• Role-based access control for security

We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.`,
    },
    {
      icon: AlertTriangle,
      title: "3. User Responsibilities",
      content: `As a user of SocietyPro, you agree to:

• Provide accurate and complete information during registration
• Maintain the security of your account credentials
• Use the Service only for lawful purposes
• Respect the privacy and rights of other users
• Report any security vulnerabilities or misuse promptly
• Comply with your society's rules and regulations

Society administrators are responsible for managing user access and ensuring appropriate use within their organization.`,
    },
    {
      icon: Ban,
      title: "4. Prohibited Activities",
      content: `You may not use the Service to:

• Violate any applicable laws or regulations
• Impersonate another person or entity
• Upload malicious code or attempt to compromise security
• Harass, abuse, or harm other users
• Spam or send unauthorized communications
• Attempt to gain unauthorized access to other accounts
• Use automated tools to scrape or collect data
• Interfere with the proper functioning of the Service`,
    },
    {
      icon: RefreshCw,
      title: "5. Data and Privacy",
      content: `Your use of the Service is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information.

By using the Service, you consent to:

• Collection of necessary personal information
• Processing of data as described in our Privacy Policy
• Storage of your data on secure cloud servers
• Sharing of relevant information within your society

You retain ownership of the content you submit, but grant us a license to use it to provide the Service.`,
    },
    {
      icon: HelpCircle,
      title: "6. Limitation of Liability",
      content: `SocietyPro is provided "as is" without warranties of any kind. We do not guarantee:

• Uninterrupted or error-free service
• Accuracy of information provided by other users
• Compatibility with all devices or browsers
• Resolution of disputes between society members

To the maximum extent permitted by law, SocietyPro shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.`,
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
              <FileText className="w-4 h-4" />
              Legal Agreement
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using SocietyPro. 
              By using our service, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
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
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </div>
              );
            })}

            {/* Termination */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Termination
              </h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your access to the Service immediately, 
                without prior notice, for any reason, including if you breach these Terms.
              </p>
              <p className="text-muted-foreground">
                Upon termination, your right to use the Service will cease immediately. 
                Society administrators may export their data before account closure, 
                subject to our data retention policies.
              </p>
            </div>

            {/* Changes */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Changes to Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. We will provide 
                notice of significant changes by posting an update on this page and 
                updating the "Last updated" date.
              </p>
              <p className="text-muted-foreground">
                Your continued use of the Service after changes become effective 
                constitutes acceptance of the revised terms.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-muted/50 border border-border rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Contact Information
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  legal@societypro.com
                </li>
                <li>
                  <span className="font-medium text-foreground">Address:</span>{" "}
                  123 Tech Park, Sector 62, Noida, UP 201301
                </li>
                <li>
                  <span className="font-medium text-foreground">Phone:</span>{" "}
                  +91 98765 43210
                </li>
              </ul>
            </div>

            {/* Governing Law */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Governing Law
              </h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the 
                laws of India, without regard to its conflict of law provisions. Any 
                disputes arising under these terms shall be subject to the exclusive 
                jurisdiction of the courts in Noida, Uttar Pradesh, India.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;