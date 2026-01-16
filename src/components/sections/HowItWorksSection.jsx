import { motion } from "framer-motion";
import { Building2, UserPlus, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Register Your Society",
    description: "Admin signs up, creates society profile, adds blocks and flat structure.",
  },
  {
    number: "02",
    icon: UserPlus,
    title: "Invite Residents",
    description: "Residents request access, admin approves and assigns to specific flats.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Start Managing",
    description: "Post notices, handle complaints, track maintenance — all from one dashboard.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Get Started in Minutes
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Three simple steps to transform your society management
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block transform -translate-x-1/2" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 last:mb-0 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0 md:w-1/2 flex justify-start md:justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary shadow-glow flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center shadow-md">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 1 ? "md:text-right" : ""}`}>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}