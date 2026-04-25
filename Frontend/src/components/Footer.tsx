import { Link } from "@tanstack/react-router";
import { Vote } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Vote className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">Votera</span>
          </Link>
          <p className="max-w-md text-sm text-muted-foreground">
            Empowering citizens with election knowledge. Your trusted guide to understanding the democratic process.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link to="/chat" className="hover:text-foreground transition-colors">Chat</Link>
            <Link to="/timeline" className="hover:text-foreground transition-colors">Timeline</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Votera. Built for civic education.
          </p>
        </div>
      </div>
    </footer>
  );
}
