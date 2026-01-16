import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Simplicity First",
    description: "We believe complex problems deserve simple solutions. Every feature is designed to be intuitive.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication between management and residents builds trust in communities.",
  },
  {
    icon: Heart,
    title: "Community Focus",
    description: "We're building tools that bring neighbors closer, not just software for processes.",
  },
  {
    icon: Users,
    title: "Inclusive Design",
    description: "Accessible to everyone, from tech-savvy millennials to senior residents.",
  },
];

const About = () => {
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
                About Us
              </span>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">
                Reimagining How Communities Operate
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                SocietyPro was born from a simple frustration: managing apartment communities 
                shouldn't require spreadsheets, WhatsApp groups, and endless meetings. 
                We're building the platform we wished existed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    The Problem We're Solving
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Traditional society management is broken. Complaints get lost in WhatsApp chats. 
                      Notices go unread. Maintenance issues take weeks to resolve. And committee members 
                      spend hours on tasks that should take minutes.
                    </p>
                    <p>
                      We're building a centralized platform that brings clarity, accountability, 
                      and efficiency to apartment community management. No more chaos — just 
                      simple, organized operations.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl font-bold text-primary">500+</div>
                      <div className="mt-2 text-muted-foreground">Communities Trust Us</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                The principles that guide everything we build
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We envision a future where every apartment community operates seamlessly — 
                where residents feel heard, management feels empowered, and neighbors 
                actually know each other. SocietyPro is the foundation for building 
                digitally connected, transparent, and thriving communities.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;