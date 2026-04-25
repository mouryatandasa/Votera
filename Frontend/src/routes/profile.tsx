import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Phone, Award, BookOpen, Settings, LogOut } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Votera" },
      { name: "description", content: "Manage your Votera profile and track your learning progress." },
      { property: "og:title", content: "My Profile — Votera" },
      { property: "og:description", content: "Your Votera account and progress." },
    ],
  }),
  component: ProfilePage,
});

const badges = [
  { name: "Quiz Master", description: "Scored 5/5 on the election quiz", earned: true },
  { name: "Registered Voter", description: "Completed the registration guide", earned: true },
  { name: "Knowledge Seeker", description: "Read 10+ FAQ articles", earned: false },
  { name: "Civic Champion", description: "Shared Votera with 5 friends", earned: false },
];

const activity = [
  { action: "Completed Election Quiz", time: "2 hours ago", score: "5/5" },
  { action: "Read FAQ: How to register", time: "1 day ago", score: null },
  { action: "Chatted with Votera AI", time: "2 days ago", score: null },
  { action: "Viewed Election Timeline", time: "3 days ago", score: null },
];

function ProfilePage() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[70vh] flex-col items-center justify-center px-4 pt-20">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Sign in to view profile</h1>
          <p className="mt-2 max-w-sm text-center text-muted-foreground">
            Please login to track your badges, quiz progress, and activity.
          </p>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-20 sm:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
              {user.full_name.charAt(0)}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display text-2xl font-bold text-foreground">{user.full_name}</h1>
              <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {user.email}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Mumbai, Maharashtra</span>
                <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> +91 98765 43210</span>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-civic-green/10 px-3 py-1 text-xs font-medium text-civic-green">Registered Voter</span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Active Learner</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5"><Settings className="h-3.5 w-3.5" /> Edit</Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-destructive" onClick={logout}><LogOut className="h-3.5 w-3.5" /> Logout</Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <Award className="h-4 w-4 text-primary" />
              <h2 className="font-display text-base font-semibold text-foreground">Badges</h2>
            </div>
            <div className="divide-y divide-border">
              {badges.map((b) => (
                <div key={b.name} className={`flex items-center gap-3 px-5 py-3.5 ${!b.earned ? "opacity-40" : ""}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${b.earned ? "bg-civic-green/10" : "bg-muted"}`}>
                    <Award className={`h-4 w-4 ${b.earned ? "text-civic-green" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <h2 className="font-display text-base font-semibold text-foreground">Recent Activity</h2>
            </div>
            <div className="divide-y divide-border">
              {activity.map((a) => (
                <div key={a.action} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.action}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                  {a.score && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{a.score}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          {[
            { label: "Quizzes Taken", value: "3" },
            { label: "Questions Asked", value: "12" },
            { label: "Badges Earned", value: "2/4" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
