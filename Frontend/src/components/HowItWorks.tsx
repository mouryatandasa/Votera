import { motion } from "framer-motion";
import { Search, MessageSquare, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Ask a Question",
    description: "Type your election-related question in plain language — no jargon needed.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Get Verified Answers",
    description: "Our AI provides accurate, sourced responses from official election data.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Take Action",
    description: "Follow step-by-step guides to register, find your booth, or track results.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-card py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-foreground sm:text-4xl"
          >
            How Votera Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-muted-foreground"
          >
            Three simple steps to become an informed voter.
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <span className="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-primary">
                Step {step}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
