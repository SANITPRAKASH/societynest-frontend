import { motion } from "framer-motion";
import { Building2, Users, Wrench, Bell } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "Apartments Managed",
    color: "text-primary",
    bgColor: "bg-emerald-100",
  },
  {
    icon: Users,
    value: "12,000+",
    label: "Active Residents",
    color: "text-info",
    bgColor: "bg-blue-100",
  },
  {
    icon: Wrench,
    value: "8,500+",
    label: "Complaints Resolved",
    color: "text-amber-500",
    bgColor: "bg-amber-100",
  },
  {
    icon: Bell,
    value: "25,000+",
    label: "Notices Published",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function StatsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}