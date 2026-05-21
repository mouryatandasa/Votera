import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, ChevronRight, FileText, Home, Camera, ShieldCheck, PartyPopper } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ShieldCheck,
    title: "Check Eligibility",
    description: "Verify you meet the requirements to register as a voter.",
    details: [
      "You must be an Indian citizen",
      "You must be 18 years or older on January 1 of the revision year",
      "You must be a resident of the constituency where you want to register",
      "You must not be disqualified under any law",
    ],
  },
  {
    icon: FileText,
    title: "Gather Documents",
    description: "Prepare the required documents for your application.",
    details: [
      "Proof of Age: Birth certificate, school leaving certificate, or passport",
      "Proof of Address: Aadhaar card, utility bill, bank passbook, or ration card",
      "Recent passport-size photograph",
      "Aadhaar number (optional but recommended for linking)",
    ],
  },
  {
    icon: Home,
    title: "Submit Application",
    description: "Fill and submit Form 6 online or at your ERO office.",
    details: [
      "Online: Visit nvsp.in and fill Form 6",
      "Offline: Visit your nearest Electoral Registration Office",
      "Through Voter Helpline App (available on Android & iOS)",
      "Through a Booth Level Officer (BLO) during door-to-door verification",
    ],
  },
  {
    icon: Camera,
    title: "Verification",
    description: "An official will verify your application and documents.",
    details: [
      "A Booth Level Officer (BLO) may visit your address",
      "Keep your original documents ready for verification",
      "You may receive a call for confirmation",
      "Track status online at nvsp.in using your reference number",
    ],
  },
  {
    icon: PartyPopper,
    title: "Confirmation",
    description: "Receive your Voter ID card (EPIC) and check the electoral roll.",
    details: [
      "You will receive an EPIC (Voter ID) card",
      "Your name will appear in the electoral roll",
      "Download your e-EPIC from the Voter Helpline App",
      "You are now ready to vote in elections!",
    ],
  },
];

export default function RegistrationPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    document.title = "Voter Registration Guide — Votera";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-20 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Registration <span className="text-primary">Guide</span>
          </h1>
          <p className="mt-3 text-muted-foreground">Follow these steps to register as a voter.</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-center">
                <button
                  onClick={() => setActiveStep(i)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    i <= activeStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {i < activeStep ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm font-bold">{i + 1}</span>}
                </button>
                {i < steps.length - 1 && (
                  <div className={`hidden h-0.5 w-8 sm:block lg:w-16 ${i < activeStep ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              {(() => { const Icon = steps[activeStep].icon; return <Icon className="h-6 w-6 text-primary" />; })()}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Step {activeStep + 1} of {steps.length}</span>
              <h2 className="mt-1 font-display text-xl font-bold text-foreground">{steps[activeStep].title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{steps[activeStep].description}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {steps[activeStep].details.map((detail) => (
              <div key={detail} className="flex items-start gap-3 rounded-lg bg-secondary/50 px-4 py-3">
                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-foreground">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              Previous
            </Button>
            <Button
              variant="hero"
              className="gap-1.5"
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
            >
              Next Step <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
