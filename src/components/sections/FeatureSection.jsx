import { motion } from "framer-motion";
import { 
  Shield, 
  MessageSquare, 
  Bell, 
  Home, 
  Activity, 
  BarChart3 
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Secure login for admins and residents with granular permissions.",
  },
  {
    icon: MessageSquare,
    title: "Complaint Tracking",
    description: "Residents raise issues, admins track and resolve with real-time updates.",
  },
  {
    icon: Bell,
    title: "Digital Notice Board",
    description: "Publish announcements, meeting schedules, and important updates instantly.",
  },
  {
    icon: Home,
    title: "Flat Management",
    description: "Manage blocks, flats, and resident assignments effortlessly.",
  },
  {
    icon: Activity,
    title: "Status Updates",
    description: "Track complaint progress from open to resolved with timeline view.",
  },
  {
    icon: BarChart3,
    title: "Admin Analytics",
    description: "Dashboards with charts showing complaints, trends, and community health.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
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
            Features
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need to Manage Your Society
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Powerful tools designed for modern apartment communities, 
            built to scale from 10 flats to 1000+.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}