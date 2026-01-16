import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Play, Shield, Users, Bell } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Gradient Image Overlay - Fades in from right */}
      <div 
        className="absolute inset-0 bg-cover bg-right"
        style={{
          backgroundImage: `url('/image4.jpg')`,
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements - Hidden on mobile, visible on large screens */}
      <motion.div
        className="hidden lg:flex absolute top-1/4 left-[10%] w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm items-center justify-center animate-float"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Shield className="w-8 h-8 text-primary-foreground/80" />
      </motion.div>

      <motion.div
        className="hidden lg:flex absolute top-1/3 right-[15%] w-14 h-14 rounded-2xl bg-accent/20 backdrop-blur-sm items-center justify-center animate-float"
        style={{ animationDelay: "1s" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <Users className="w-7 h-7 text-accent" />
      </motion.div>

      <motion.div
        className="hidden lg:flex absolute bottom-1/3 left-[20%] w-12 h-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm items-center justify-center animate-float"
        style={{ animationDelay: "2s" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Bell className="w-6 h-6 text-primary-foreground/80" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground/90 text-sm font-medium border border-primary-foreground/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
              Trusted by 500+ communities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Modern Society Management,{" "}
            <span className="relative">
              Simplified
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="hsl(38, 92%, 50%)" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ditch the spreadsheets and WhatsApp chaos. Manage residents, complaints, 
            notices, and maintenance — all from one beautiful dashboard.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/demo">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground/20  hover:bg-primary-foreground/10">
              <Link to="/demo">
                <Play className="w-4 h-4 mr-1" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* Trust Signal */}
          <motion.p
            className="mt-8 text-sm text-primary-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            No credit card required • Setup in 5 minutes • Cancel anytime
          </motion.p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}