import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, TrendingUp, Bell, Clock, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { endpoints, Election } from "@/lib/api";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Election Dashboard — Votera" },
      { name: "description", content: "Track upcoming elections, candidate announcements, and participation tips." },
      { property: "og:title", content: "Election Dashboard — Votera" },
      { property: "og:description", content: "Your election overview at a glance." },
    ],
  }),
  component: DashboardPage,
});

const upcomingElections = [
  { name: "Bihar State Assembly", date: "Nov 2025", type: "State", seats: 243, status: "Upcoming" },
  { name: "Delhi Municipal Corporation", date: "Dec 2025", type: "Municipal", seats: 250, status: "Upcoming" },
  { name: "Uttar Pradesh By-election", date: "Sep 2025", type: "By-election", seats: 3, status: "Scheduled" },
];

const candidates = [
  { name: "Priya Sharma", party: "Party A", constituency: "North Delhi", status: "Nominated" },
  { name: "Rajesh Kumar", party: "Party B", constituency: "South Mumbai", status: "Verified" },
  { name: "Anita Desai", party: "Party C", constituency: "Bangalore Central", status: "Nominated" },
];

const news = [
  { title: "Election Commission announces new voter ID guidelines", time: "2 hours ago" },
  { title: "Registration deadline extended for Bihar elections", time: "5 hours ago" },
  { title: "Digital voting pilot program approved for 10 constituencies", time: "1 day ago" },
  { title: "Youth voter registration sees 40% increase this quarter", time: "2 days ago" },
];

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function DashboardPage() {
  const [elections, setElections] = useState(upcomingElections);

  useEffect(() => {
    endpoints.elections.list()
      .then(res => {
        if (res.items && res.items.length > 0) {
          // Map backend items to frontend format
          const mapped = res.items.map((item: Election) => ({
            name: item.name,
            date: "Oct 2025", // Mocking date since backend doesn't provide it yet
            type: "General",
            seats: 543,
            status: item.status.charAt(0).toUpperCase() + item.status.slice(1)
          }));
          setElections(mapped);
        }
      })
      .catch(err => console.error("Failed to fetch elections:", err));
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:pt-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Election <span className="text-primary">Dashboard</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Your election overview at a glance.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard icon={Calendar} label="Upcoming Elections" value="3" color="bg-primary/10 text-primary" />
          <StatCard icon={Users} label="Registered Voters" value="945M" color="bg-civic-green/10 text-civic-green" />
          <StatCard icon={MapPin} label="Polling Stations" value="1.05M" color="bg-primary/10 text-primary" />
          <StatCard icon={TrendingUp} label="Voter Turnout Avg" value="67.4%" color="bg-civic-green/10 text-civic-green" />
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Upcoming Elections */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-base font-semibold text-foreground">Upcoming Elections</h2>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {elections.map((e) => (
                <div key={e.name} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{e.type} · {e.seats} seats</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{e.date}</p>
                    <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{e.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* News Feed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-base font-semibold text-foreground">Latest News</h2>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {news.map((n) => (
                <div key={n.title} className="px-5 py-3.5">
                  <p className="text-sm text-foreground leading-snug">{n.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Candidates */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-display text-base font-semibold text-foreground">Recent Candidate Announcements</h2>
          </div>
          <div className="divide-y divide-border">
            {candidates.map((c) => (
              <div key={c.name} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.party} · {c.constituency}</p>
                  </div>
                </div>
                <span className="rounded-full bg-civic-green/10 px-2.5 py-0.5 text-xs font-medium text-civic-green">{c.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link to="/timeline"><Button variant="hero" className="gap-1.5">View Timeline <ChevronRight className="h-4 w-4" /></Button></Link>
          <Link to="/chat"><Button variant="heroOutline" className="gap-1.5">Ask Votera</Button></Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
