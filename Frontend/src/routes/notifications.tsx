import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, Calendar, MessageSquare, AlertTriangle, Info, CheckCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Votera" },
      { name: "description", content: "Stay updated with election alerts, reminders, and important announcements." },
      { property: "og:title", content: "Notifications — Votera" },
      { property: "og:description", content: "Your election notifications and alerts." },
    ],
  }),
  component: NotificationsPage,
});

interface Notification {
  id: string;
  type: "info" | "alert" | "reminder" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "1", type: "alert", title: "Registration Deadline Approaching", message: "Only 5 days left to register for the Bihar State Assembly elections. Don't miss your chance!", time: "30 mins ago", read: false },
  { id: "2", type: "success", title: "Quiz Badge Earned!", message: "Congratulations! You scored 5/5 on the Election Quiz and earned the Quiz Master badge.", time: "2 hours ago", read: false },
  { id: "3", type: "reminder", title: "Voting Day Reminder", message: "The general election voting day is on April 15, 2025. Make sure to carry your Voter ID.", time: "1 day ago", read: false },
  { id: "4", type: "info", title: "New Feature: Live Results", message: "Track real-time election results with our new Results page. See seat counts and candidate updates.", time: "2 days ago", read: true },
  { id: "5", type: "info", title: "Votera AI Updated", message: "Our AI assistant now supports questions in Hindi, Tamil, and Telugu. Try it out!", time: "3 days ago", read: true },
  { id: "6", type: "reminder", title: "Complete Your Profile", message: "Add your constituency details to get personalized election updates.", time: "5 days ago", read: true },
];

const iconMap = {
  info: Info,
  alert: AlertTriangle,
  reminder: Calendar,
  success: Check,
};

const colorMap = {
  info: "bg-primary/10 text-primary",
  alert: "bg-destructive/10 text-destructive",
  reminder: "bg-chart-3/10 text-chart-3",
  success: "bg-civic-green/10 text-civic-green",
};

function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-20 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" className="gap-1.5" onClick={markAllRead}>
              <CheckCheck className="h-3.5 w-3.5" /> Mark all read
            </Button>
          )}
        </motion.div>

        <div className="space-y-3">
          {notifications.map((n, i) => {
            const Icon = iconMap[n.type];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => markRead(n.id)}
                className={`cursor-pointer rounded-xl border bg-card p-4 transition-all hover:shadow-sm ${
                  n.read ? "border-border opacity-70" : "border-primary/20 bg-primary/[0.02]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMap[n.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
                      {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
