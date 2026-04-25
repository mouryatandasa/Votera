import { motion } from "framer-motion";
import { Search, ArrowRight, Shield, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const stats = [
  { icon: Users, value: "900M+", label: "Eligible Voters" },
  { icon: Shield, value: "100%", label: "Verified Info" },
  { icon: BookOpen, value: "24/7", label: "AI Assistant" },
];

export function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-civic-green/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-civic-green animate-pulse" />
              Election Season 2025 is Live
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Understand Elections{" "}
            <span className="bg-gradient-to-r from-primary to-civic-green bg-clip-text text-transparent">
              Easily
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground sm:text-xl"
          >
            Your AI-powered civic guide. Learn voter registration, eligibility, polling locations, and election schedules — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <div className="mx-auto flex max-w-xl items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-lg shadow-primary/5">
              <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ask anything about elections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <Link to="/chat">
                <Button variant="hero" size="default" className="gap-1.5">
                  Ask Votera
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
          >
            <span>Try:</span>
            {["How to register?", "Am I eligible to vote?", "Nearest polling booth"].map((q) => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className="rounded-full border border-border bg-card px-3 py-1.5 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                {q}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
