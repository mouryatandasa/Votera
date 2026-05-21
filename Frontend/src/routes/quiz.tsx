import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const questions = [
  { q: "What is the minimum voting age in India?", options: ["16", "18", "21", "25"], answer: 1 },
  { q: "What does NOTA stand for?", options: ["Not On The Agenda", "None of the Above", "National Online Testing Authority", "No Other Than Assigned"], answer: 1 },
  { q: "Which body conducts elections in India?", options: ["Supreme Court", "Parliament", "Election Commission", "President"], answer: 2 },
  { q: "What is an EVM?", options: ["Electronic Voter Machine", "Electronic Voting Machine", "Electoral Verification Method", "Election Validation Mechanism"], answer: 1 },
  { q: "Which form is used for voter registration?", options: ["Form 2", "Form 4", "Form 6", "Form 8"], answer: 2 },
];

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    document.title = "Election Quiz — Votera";
  }, []);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === questions[currentQ].answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 pt-24 pb-20 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Election <span className="text-primary">Quiz</span>
          </h1>
          <p className="mt-3 text-muted-foreground">Test your knowledge about the election process.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-border bg-card p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-civic-green/10">
                <Trophy className="h-8 w-8 text-civic-green" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Quiz Complete!</h2>
              <p className="mt-2 text-4xl font-bold text-primary">{score}/{questions.length}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {score === questions.length ? "Perfect score! You're an election expert!" : score >= 3 ? "Great job! You know your elections well." : "Keep learning! Check out our FAQ for more info."}
              </p>
              <Button variant="hero" className="mt-6 gap-2" onClick={restart}>
                <RotateCcw className="h-4 w-4" /> Try Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              {/* Progress */}
              <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="mb-6 h-1.5 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h2 className="mb-6 font-display text-lg font-semibold text-foreground">
                {questions[currentQ].q}
              </h2>

              <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => {
                  const isCorrect = idx === questions[currentQ].answer;
                  const isSelected = selected === idx;
                  let style = "border-border bg-background hover:border-primary/30 hover:bg-primary/5";
                  if (answered) {
                    if (isCorrect) style = "border-civic-green bg-civic-green/5";
                    else if (isSelected) style = "border-destructive bg-destructive/5";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(idx)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium text-foreground transition-colors ${style}`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {answered && isCorrect && <CheckCircle className="h-5 w-5 text-civic-green" />}
                      {answered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end">
                  <Button variant="hero" onClick={next}>
                    {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
