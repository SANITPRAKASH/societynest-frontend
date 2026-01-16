import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "No credit card required",
  "Free for small societies",
  "Setup in under 5 minutes",
  "Cancel anytime",
];

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative rounded-3xl gradient-hero overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10 px-8 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl mx-auto leading-tight">
              Ready to Modernize Your Society Management?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Join hundreds of communities already using SocietyPro to simplify their operations.
            </p>

            {/* Benefits */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-primary-foreground/90 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/demo">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}