import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "123 Tech Park, Sector 5\nMumbai, Maharashtra 400001",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    content: "hello@societypro.in",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Fri: 9:00 AM - 6:00 PM",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    societyName: "",
    address: "",
    flats: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you within 24 hours.");
    setFormData({
      societyName: "",
      address: "",
      flats: "",
      contactPerson: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                Contact Us
              </span>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">
                Let's Transform Your Community
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Ready to simplify your society management? Fill out the form below 
                and our team will reach out to schedule a personalized demo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Info */}
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-8">
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground text-sm whitespace-pre-line">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  className="lg:col-span-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-card rounded-2xl border border-border p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Request a Demo
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Tell us about your society and we'll show you how SocietyPro can help.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="societyName">Society Name *</Label>
                          <Input
                            id="societyName"
                            name="societyName"
                            value={formData.societyName}
                            onChange={handleChange}
                            placeholder="Green Valley Apartments"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="flats">Number of Flats</Label>
                          <Input
                            id="flats"
                            name="flats"
                            value={formData.flats}
                            onChange={handleChange}
                            placeholder="e.g., 150"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Society Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Full address with city"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="contactPerson">Contact Person *</Label>
                          <Input
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message / Requirements</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your society management challenges..."
                          rows={4}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Submit Request
                      </Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;