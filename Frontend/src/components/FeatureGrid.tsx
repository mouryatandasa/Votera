import { motion } from "framer-motion";
import {
  MessageSquare,
  FileCheck,
  MapPin,
  Calendar,
  BarChart3,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description: "Ask any election question in plain language and get instant, verified answers.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: FileCheck,
    title: "Registration Guide",
    description: "Step-by-step voter registration walkthrough with document checklist.",
    color: "text-civic-green bg-civic-green/10",
  },
  {
    icon: MapPin,
    title: "Polling Locator",
    description: "Find your nearest polling booth with directions and timings.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Calendar,
    title: "Election Timeline",
    description: "Track key dates from registration deadlines to result announcements.",
    color: "text-civic-green bg-civic-green/10",
  },
  {
    icon: BarChart3,
    title: "Live Results",
    description: "Real-time election results with interactive charts and seat counts.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: GraduationCap,
    title: "Civic Quiz",
    description: "Test your election knowledge with fun quizzes and earn badges.",
    color: "text-civic-green bg-civic-green/10",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-foreground sm:text-4xl"
          >
            Everything You Need to{" "}
            <span className="text-primary">Vote Smart</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-muted-foreground"
          >
            From registration to results, Votera guides you through every step of the election process.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.color}`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
