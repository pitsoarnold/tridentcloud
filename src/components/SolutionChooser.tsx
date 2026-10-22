import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { m, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ChevronRight,
  Code2,
  Globe,
  HelpCircle,
  Server,
  TrendingUp,
  User,
  Users,
  Users2,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = "pulse" | "build" | "manage" | "enterprise";
type QuestionOneAnswer = "website" | "attract" | "keep-running" | "custom" | "unsure";
type QuestionTwoAnswer = "1" | "2-10" | "11-50" | "50+";
type QuestionThreeAnswer = "low" | "mid" | "high" | "enterprise" | "no-budget";
type ServiceHref = "/pulse" | "/build" | "/pricing" | "/enterprise";
type Cta = { text: string; href: ServiceHref | "/contact" };

type ServiceRecommendation = {
  service: Service;
  title: string;
  reason: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

type Option = { id: string; label: string; icon: LucideIcon };

const serviceRecommendations: Record<Service, ServiceRecommendation> = {
  pulse: {
    service: "pulse",
    title: "Trident Pulse",
    reason:
      "A monthly subscription for small businesses that need a professional online presence — website, hosting, domain, SSL and support, all handled by us.",
    primaryCta: { text: "See Pulse plans", href: "/pulse" },
    secondaryCta: { text: "Or talk to us first", href: "/contact" },
  },
  build: {
    service: "build",
    title: "Custom Build",
    reason:
      "A tailored project — website, web app, desktop tool, enterprise system or ERP — built for how your business actually works.",
    primaryCta: { text: "Explore what we build", href: "/build" },
    secondaryCta: { text: "Or get a quote", href: "/contact" },
  },
  manage: {
    service: "manage",
    title: "Managed Services",
    reason:
      "We keep your current systems online, secure, monitored and up to date — so your team can focus on running the business.",
    primaryCta: { text: "See managed plans", href: "/pricing" },
    secondaryCta: { text: "Or talk to us first", href: "/contact" },
  },
  enterprise: {
    service: "enterprise",
    title: "Enterprise",
    reason:
      "For larger or mission-critical operations: formal SLAs, POPIA compliance, dedicated account management and 24/7 support options.",
    primaryCta: { text: "See enterprise options", href: "/enterprise" },
    secondaryCta: { text: "Or book a discovery call", href: "/contact" },
  },
};

const serviceTaglines: Record<Service, string> = {
  pulse: "A professional online presence, handled for you.",
  build: "Custom websites, apps and software built around your business.",
  manage: "Reliable, secure operations for the systems you already use.",
  enterprise: "Dedicated support for larger, mission-critical operations.",
};

const questions = {
  "question-1": {
    heading: "What are you trying to do?",
    options: [
      { id: "website", label: "Get a website or online presence", icon: Globe },
      {
        id: "attract",
        label: "Attract more customers or grow my business",
        icon: TrendingUp,
      },
      {
        id: "keep-running",
        label: "Keep my current systems running reliably",
        icon: Server,
      },
      {
        id: "custom",
        label: "Build custom software for my business",
        icon: Code2,
      },
      {
        id: "unsure",
        label: "Not sure yet — help me decide",
        icon: HelpCircle,
      },
    ],
  },
  "question-2": {
    heading: "How big is your business?",
    options: [
      { id: "1", label: "Just me / sole trader", icon: User },
      { id: "2-10", label: "2–10 people", icon: Users },
      { id: "11-50", label: "11–50 people", icon: Users2 },
      { id: "50+", label: "50+ people", icon: Building2 },
    ],
  },
  "question-3": {
    heading: "What's your comfort level for monthly costs?",
    options: [
      { id: "low", label: "Under R500/month", icon: Wallet },
      { id: "mid", label: "R500 – R2,500/month", icon: Wallet },
      { id: "high", label: "R2,500 – R10,000/month", icon: Wallet },
      { id: "enterprise", label: "R10,000+/month", icon: Wallet },
      { id: "no-budget", label: "I don't know yet", icon: HelpCircle },
    ],
  },
} as const satisfies Record<string, { heading: string; options: readonly Option[] }>;

type QuestionStep = keyof typeof questions;
type Step = QuestionStep | "result";

const questionSteps: QuestionStep[] = ["question-1", "question-2", "question-3"];

function recommend(
  q1: QuestionOneAnswer,
  q2: QuestionTwoAnswer,
  q3: QuestionThreeAnswer,
): ServiceRecommendation | null {
  if (q1 === "unsure") return null;
  if (q1 === "custom") {
    return {
      ...serviceRecommendations.build,
      reason: "You need custom software for your business",
    };
  }
  if (q1 === "keep-running" && q2 === "50+") return serviceRecommendations.enterprise;
  if (q1 === "keep-running") return serviceRecommendations.manage;
  if (q1 === "website" && q3 === "low") return serviceRecommendations.pulse;
  if (q1 === "website") return serviceRecommendations.build;
  if (q1 === "attract" && q2 === "50+") return serviceRecommendations.enterprise;
  if (q1 === "attract" && q3 === "low" && (q2 === "1" || q2 === "2-10")) {
    return serviceRecommendations.pulse;
  }
  return serviceRecommendations.build;
}

const questionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const optionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SolutionChooser() {
  const [step, setStep] = useState<Step>("question-1");
  const [q1, setQ1] = useState<QuestionOneAnswer | null>(null);
  const [q2, setQ2] = useState<QuestionTwoAnswer | null>(null);
  const [q3, setQ3] = useState<QuestionThreeAnswer | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStepRef = useRef(step);
  const transitionTimerRef = useRef<number | undefined>(undefined);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (previousStepRef.current !== step) {
      headingRef.current?.focus();
      previousStepRef.current = step;
    }
  }, [step]);

  useEffect(
    () => () => {
      window.clearTimeout(transitionTimerRef.current);
    },
    [],
  );

  const restart = () => {
    window.clearTimeout(transitionTimerRef.current);
    setQ1(null);
    setQ2(null);
    setQ3(null);
    setSelectedOption(null);
    setIsTransitioning(false);
    setStep("question-1");
  };

  const goBack = () => {
    const stepIndex = questionSteps.indexOf(step as QuestionStep);
    if (stepIndex > 0) {
      setSelectedOption(null);
      setStep(questionSteps[stepIndex - 1]);
    }
  };

  const selectOption = (optionId: string) => {
    if (isTransitioning) return;

    setSelectedOption(optionId);
    setIsTransitioning(true);
    transitionTimerRef.current = window.setTimeout(
      () => {
        setSelectedOption(null);
        setIsTransitioning(false);

        if (step === "question-1") {
          setQ1(optionId as QuestionOneAnswer);
          setStep("question-2");
        } else if (step === "question-2") {
          setQ2(optionId as QuestionTwoAnswer);
          setStep("question-3");
        } else if (step === "question-3") {
          setQ3(optionId as QuestionThreeAnswer);
          setStep("result");
        }
      },
      shouldReduceMotion ? 0 : 180,
    );
  };

  const progress = step === "result" ? 100 : (questionSteps.indexOf(step) + 1) * (100 / 3);
  const recommendation = q1 && q2 && q3 && q1 !== "unsure" ? recommend(q1, q2, q3) : null;
  const question = step === "result" ? null : questions[step];

  return (
    <section className="solution-chooser" aria-live="polite">
      <div className="solution-chooser-inner">
        <header className="solution-chooser-header">
          <span className="eyebrow">FIND YOUR FIT</span>
          <h2>Which service is right for you?</h2>
          <p>
            Answer three quick questions. We'll point you in the right direction — no email
            required.
          </p>
        </header>

        {question && (
          <div className="solution-chooser-question" key={step}>
            <div className="solution-chooser-progress">
              <div className="solution-chooser-progress-copy">
                <span>Question {questionSteps.indexOf(step) + 1} of 3</span>
                {(step === "question-2" || step === "question-3") && (
                  <button className="solution-chooser-text-button" type="button" onClick={restart}>
                    Start over
                  </button>
                )}
              </div>
              <div
                className="solution-chooser-progress-track"
                role="progressbar"
                aria-label="Question progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <m.span
                  className="solution-chooser-progress-fill"
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                />
              </div>
            </div>

            <h3 ref={headingRef} tabIndex={-1}>
              {question.heading}
            </h3>

            <m.div
              className="solution-chooser-options"
              variants={questionVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
            >
              {question.options.map((option) => {
                const Icon = option.icon;
                return (
                  <m.button
                    className={`solution-chooser-option${selectedOption === option.id ? " is-selected" : ""}`}
                    key={option.id}
                    type="button"
                    variants={optionVariants}
                    disabled={isTransitioning}
                    onClick={() => selectOption(option.id)}
                  >
                    <span className="solution-chooser-option-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="solution-chooser-option-label">{option.label}</span>
                    <ChevronRight className="solution-chooser-option-chevron" aria-hidden="true" />
                  </m.button>
                );
              })}
            </m.div>

            {step !== "question-1" && (
              <button
                className="solution-chooser-back"
                type="button"
                onClick={goBack}
                disabled={isTransitioning}
              >
                <ArrowLeft aria-hidden="true" />
                Back
              </button>
            )}
          </div>
        )}

        {step === "result" && recommendation && (
          <m.div
            className="solution-chooser-result"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
          >
            <span className="solution-chooser-result-icon">
              {recommendation.service === "pulse" && <TrendingUp aria-hidden="true" />}
              {recommendation.service === "build" && <Code2 aria-hidden="true" />}
              {recommendation.service === "manage" && <Server aria-hidden="true" />}
              {recommendation.service === "enterprise" && <Building2 aria-hidden="true" />}
            </span>
            <span className="eyebrow">OUR RECOMMENDATION</span>
            <h3 ref={headingRef} tabIndex={-1}>
              {recommendation.title}
            </h3>
            <p>{recommendation.reason}</p>
            <div className="solution-chooser-result-actions">
              <Link className="btn btn-primary" to={recommendation.primaryCta.href}>
                {recommendation.primaryCta.text}
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                className="solution-chooser-secondary-link"
                to={recommendation.secondaryCta.href}
              >
                {recommendation.secondaryCta.text}
              </Link>
            </div>
            <Link className="solution-chooser-all-services" to="/services">
              Not quite right? See all services <ArrowRight aria-hidden="true" />
            </Link>
          </m.div>
        )}

        {step === "result" && q1 === "unsure" && (
          <m.div
            className="solution-chooser-unsure"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
          >
            <h3 ref={headingRef} tabIndex={-1}>
              Let's find the right fit together.
            </h3>
            <p>Here are the services we offer. If you're still unsure, we'll help you decide.</p>
            <div className="solution-chooser-services">
              {(Object.keys(serviceRecommendations) as Service[]).map((service) => {
                const details = serviceRecommendations[service];
                return (
                  <article className="solution-chooser-service-card" key={service}>
                    <span className="solution-chooser-service-icon">
                      {service === "pulse" && <TrendingUp aria-hidden="true" />}
                      {service === "build" && <Code2 aria-hidden="true" />}
                      {service === "manage" && <Server aria-hidden="true" />}
                      {service === "enterprise" && <Building2 aria-hidden="true" />}
                    </span>
                    <h4>{details.title}</h4>
                    <p>{serviceTaglines[service]}</p>
                    <Link to={details.primaryCta.href}>
                      {details.primaryCta.text} <ArrowRight aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
            <Link className="btn btn-primary solution-chooser-talk-cta" to="/contact">
              Talk to us — we'll help you decide <ArrowRight aria-hidden="true" />
            </Link>
          </m.div>
        )}

        {step === "result" && (
          <button className="solution-chooser-restart" type="button" onClick={restart}>
            Start over
          </button>
        )}
      </div>
    </section>
  );
}
