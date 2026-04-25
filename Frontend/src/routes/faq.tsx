import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Votera" },
      { name: "description", content: "Frequently asked questions about elections, voting, and voter registration." },
      { property: "og:title", content: "FAQ — Votera" },
      { property: "og:description", content: "Get answers to common election questions." },
    ],
  }),
  component: FaqPage,
});

const categories = ["All", "Registration", "Eligibility", "Voting Day", "Results"];

const faqs = [
  { category: "Registration", q: "How do I register to vote?", a: "You can register online at the National Voters' Service Portal (nvsp.in) by filling Form 6, or visit your nearest Electoral Registration Office with proof of age, address, and a photo." },
  { category: "Registration", q: "What is the minimum age to register?", a: "You must be at least 18 years old on the qualifying date (January 1 of the year of revision of electoral roll) to register as a voter." },
  { category: "Registration", q: "Can NRIs vote in Indian elections?", a: "Yes, Non-Resident Indians can register as overseas voters under Section 20A of the Representation of the People Act. They must be present at the polling station to vote." },
  { category: "Eligibility", q: "Who is eligible to vote?", a: "Any Indian citizen who is 18+ years old, a resident of the constituency, and not disqualified under any law is eligible to vote." },
  { category: "Eligibility", q: "Can I vote if I've moved to a new city?", a: "Yes, but you need to transfer your voter registration to your new constituency by submitting Form 6 with your new address proof." },
  { category: "Voting Day", q: "What should I bring to the polling station?", a: "Bring your Voter ID card (EPIC). If you don't have it, any of the 12 approved photo IDs including Aadhaar, passport, driving license, or PAN card are accepted." },
  { category: "Voting Day", q: "What are polling hours?", a: "Polling stations are generally open from 7:00 AM to 6:00 PM. Anyone in the queue at 6 PM is allowed to vote." },
  { category: "Voting Day", q: "What is NOTA?", a: "NOTA (None of the Above) is an option on the ballot that allows voters to officially register their disapproval of all candidates." },
  { category: "Results", q: "When are results declared?", a: "Results are typically declared within 2-3 days after counting begins. The Election Commission announces results constituency-wise." },
  { category: "Results", q: "How are votes counted?", a: "India uses Electronic Voting Machines (EVMs). Votes are counted at designated counting centers under strict supervision with VVPAT verification for a random sample." },
];

function FaqPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-20 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="mt-3 text-muted-foreground">Find answers to common election questions.</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">No questions found. Try a different search.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
