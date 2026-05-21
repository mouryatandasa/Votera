import { useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, UserCheck, Megaphone, Vote, BarChart3, Trophy, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const timelineSteps = [
  { icon: ClipboardList, title: "Registration Opens", date: "Jan 15, 2025", description: "Voter registration portal opens. Submit Form 6 online or offline.", status: "completed" },
  { icon: Clock, title: "Last Date to Register", date: "Feb 28, 2025", description: "Final deadline for new voter registrations and corrections.", status: "completed" },
  { icon: UserCheck, title: "Verification", date: "Mar 1–15, 2025", description: "Electoral officers verify submitted applications door-to-door.", status: "completed" },
  { icon: Megaphone, title: "Campaign Period", date: "Mar 16 – Apr 10, 2025", description: "Candidates file nominations and campaign across constituencies.", status: "active" },
  { icon: Vote, title: "Voting Day", date: "Apr 15, 2025", description: "Cast your vote at your assigned polling station from 7 AM to 6 PM.", status: "upcoming" },
  { icon: BarChart3, title: "Counting Day", date: "Apr 18, 2025", description: "Votes are counted at designated counting centers under supervision.", status: "upcoming" },
  { icon: Trophy, title: "Results Declared", date: "Apr 19, 2025", description: "Final results announced by the Election Commission.", status: "upcoming" },
];

export default function TimelinePage() {
  useEffect(() => {
    document.title = "Election Timeline — Votera";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-20 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Election <span className="text-primary">Timeline</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Track every stage of the 2025 General Election.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-8">
            {timelineSteps.map((step, i) => {
              const Icon = step.icon;
              const isCompleted = step.status === "completed";
              const isActive = step.status === "active";

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 z-10 flex -translate-x-1/2 sm:left-1/2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                        isCompleted
                          ? "border-civic-green bg-civic-green/10"
                          : isActive
                          ? "border-primary bg-primary/10 animate-pulse"
                          : "border-border bg-card"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-civic-green" />
                      ) : (
                        <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`ml-16 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <div
                      className={`rounded-xl border p-5 transition-all ${
                        isActive
                          ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {step.date}
                      </span>
                      <h3 className="mt-1 font-display text-base font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden sm:block sm:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
