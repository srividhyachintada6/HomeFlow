import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomeScene from "../components/HomeScene";
import FeatureCard from "../components/FeatureCard";
import Reveal from "../components/Reveal";
import HomeFlowLogo from "../components/HomeFlowLogo";
import TiltCard from "../components/TiltCard";

import "./Home.css";

const FEATURES = [
  {
    title: "Expenses",
    description: "Track every expense and understand exactly where your money goes.",
    tone: "primary",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14M4 19h16" />
        <path d="M8 15v-4M12 15V9M16 15v-7" />
      </svg>
    ),
  },

  {
    title: "Budget",
    description: "Create monthly and category budgets and stay in control.",
    tone: "gold",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M9.5 10.2c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.4-2.5 1.7-2.5.7-2.5 1.7 1 1.7 2.5 1.7 2.5-.7 2.5-1.7" />
      </svg>
    ),
  },

  {
    title: "Grocery",
    description: "Plan your shopping and keep your household essentials organized.",
    tone: "primary",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 8h16l-1.5 10.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9L4 8Z" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </svg>
    ),
  },

  {
    title: "Bills",
    description: "Keep upcoming payments visible and avoid missed due dates.",
    tone: "gold",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
        <path d="M9 10h6M9 14h6M9 18h4" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    number: "01",
    title: "Add your income",
    description:
      "Start with your salary or household income so HomeFlow knows what you can work with.",
  },
  {
    number: "02",
    title: "Plan your spending",
    description:
      "Create monthly and category budgets for food, travel, shopping and everything else.",
  },
  {
    number: "03",
    title: "Watch your money",
    description:
      "Expenses automatically update your budgets so you always know what is left.",
  },
];

const WHY_ITEMS = [
  "Salary and income tracking",
  "Monthly budget planning",
  "Category-based budgets",
  "Expense tracking",
  "Bill reminders",
  "Grocery management",
  "Spending insights",
];

function Home() {
  return (
    <div className="home">

      {/* BACKGROUND DEPTH */}
      <div className="home__background" aria-hidden="true">
        <div className="home__orb home__orb--one" />
        <div className="home__orb home__orb--two" />
        <div className="home__orb home__orb--three" />

        <div className="home__grid" />

        <div className="home__floating-shape home__floating-shape--one" />
        <div className="home__floating-shape home__floating-shape--two" />
      </div>

      <Navbar />

      {/* HERO */}
      <section className="home__hero">

        <div className="home__hero-text">

          <div className="home__hero-badge home__fade home__fade--1">
            <span className="home__hero-badge-dot" />
            Smart household finance
          </div>

          <h1 className="home__fade home__fade--2">
            Your money.
            <br />
            Your home.
            <br />
            <span className="home__hero-highlight">
              One flow.
            </span>
          </h1>

          <p className="home__hero-sub home__fade home__fade--3">
            HomeFlow brings your salary, budgets, expenses, groceries,
            bills and spending insights together in one beautifully simple
            place.
          </p>

          <div className="home__hero-actions home__fade home__fade--4">
            <Link to="/register" className="home__btn home__btn--primary">
              Start Managing →
            </Link>

            <Link to="/login" className="home__btn home__btn--ghost">
              Sign In
            </Link>
          </div>

          <div className="home__trust home__fade home__fade--4">
            <span>
              <b>✓</b> Free to use
            </span>

            <span>
              <b>✓</b> Simple setup
            </span>

            <span>
              <b>✓</b> All in one
            </span>
          </div>

        </div>

        {/* 3D HERO */}
        <div className="home__hero-visual">

          <div className="home__visual-glow" />

          <div className="home__3d-floor" />

          <TiltCard className="home__money-card">

            <div className="money-card__top">
              <span>Available balance</span>
              <span className="money-card__dot">●</span>
            </div>

            <div className="money-card__amount">
              ₹48,520
            </div>

            <div className="money-card__change">
              <span>↑ 12.8%</span>
              <small>this month</small>
            </div>

            <div className="money-card__line">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="money-card__bottom">
              <span>HomeFlow</span>
              <span>08 / 26</span>
            </div>

          </TiltCard>

          <TiltCard className="home__budget-card">

            <div className="budget-card__header">
              <span>Monthly budget</span>
              <span>August</span>
            </div>

            <div className="budget-card__amount">
              ₹32,400
            </div>

            <div className="budget-card__progress">
              <span />
            </div>

            <div className="budget-card__footer">
              <span>₹21,400 spent</span>
              <strong>₹11,000 left</strong>
            </div>

          </TiltCard>

          <TiltCard className="home__salary-card">

            <div className="salary-card__icon">
              ₹
            </div>

            <div>
              <small>Monthly salary</small>
              <strong>₹55,000</strong>
            </div>

            <div className="salary-card__arrow">
              ↗
            </div>

          </TiltCard>

          <TiltCard className="home__expense-card">

            <div className="expense-card__icon">
              ↓
            </div>

            <div>
              <small>Today's spending</small>
              <strong>₹1,240</strong>
            </div>

          </TiltCard>

          <div className="home__floating-label home__floating-label--one">
            <span>Budget</span>
            <strong>78%</strong>
          </div>

          <div className="home__floating-label home__floating-label--two">
            <span>Expenses</span>
            <strong>↓ 8.4%</strong>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="home__stats">

        <TiltCard className="home__stat-card">
          <span className="home__stat-number">01</span>
          <strong>Salary</strong>
          <p>Know your monthly income.</p>
        </TiltCard>

        <TiltCard className="home__stat-card">
          <span className="home__stat-number">02</span>
          <strong>Budget</strong>
          <p>Give every rupee a purpose.</p>
        </TiltCard>

        <TiltCard className="home__stat-card">
          <span className="home__stat-number">03</span>
          <strong>Expenses</strong>
          <p>Track where your money goes.</p>
        </TiltCard>

        <TiltCard className="home__stat-card">
          <span className="home__stat-number">04</span>
          <strong>Insights</strong>
          <p>Understand your habits.</p>
        </TiltCard>

      </section>

      {/* FEATURES */}
      <section id="features" className="home__features">

        <Reveal>
          <div className="home__section-eyebrow">
            EVERYTHING IN ONE PLACE
          </div>

          <h2 className="home__section-title">
            Your household,
            <span> beautifully organized.</span>
          </h2>

          <p className="home__section-description">
            From your salary to your smallest expense, HomeFlow keeps
            everything connected.
          </p>
        </Reveal>

        <div className="home__features-grid">

          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 80}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="home__steps">

        <Reveal>

          <div className="home__section-eyebrow">
            HOW IT WORKS
          </div>

          <h2 className="home__section-title">
            Simple enough for
            <span> every day.</span>
          </h2>

        </Reveal>

        <div className="home__steps-row">

          {STEPS.map((step, index) => (

            <Reveal key={step.number} delay={index * 100}>

              <TiltCard className="home__step">

                <span className="home__step-number">
                  {step.number}
                </span>

                <div className="home__step-line" />

                <h3>{step.title}</h3>

                <p>{step.description}</p>

              </TiltCard>

            </Reveal>

          ))}

        </div>

      </section>

      {/* WHY */}
      <section id="why-homeflow" className="home__why">

        <Reveal className="home__why-text">

          <div className="home__section-eyebrow">
            BUILT AROUND YOUR LIFE
          </div>

          <h2>
            More than an expense
            <span> tracker.</span>
          </h2>

          <p>
            HomeFlow connects your income, budgets and everyday spending
            so your financial picture stays updated automatically.
          </p>

          <ul className="home__why-list">

            {WHY_ITEMS.map((item) => (

              <li key={item}>
                <span className="home__why-check">
                  ✓
                </span>

                {item}
              </li>

            ))}

          </ul>

        </Reveal>

        <Reveal delay={120} className="home__why-visual">

          <TiltCard className="home__dashboard-preview">

            <div className="preview__top">
              <span>August overview</span>
              <span>•••</span>
            </div>

            <div className="preview__balance">
              <small>Remaining</small>
              <strong>₹24,780</strong>
            </div>

            <div className="preview__bars">

              <div>
                <span style={{ height: "72%" }} />
                <small>Food</small>
              </div>

              <div>
                <span style={{ height: "48%" }} />
                <small>Bills</small>
              </div>

              <div>
                <span style={{ height: "58%" }} />
                <small>Travel</small>
              </div>

              <div>
                <span style={{ height: "32%" }} />
                <small>Other</small>
              </div>

              <div>
                <span style={{ height: "64%" }} />
                <small>Shop</small>
              </div>

            </div>

          </TiltCard>

        </Reveal>

      </section>

      {/* CTA */}
      <section className="home__cta">

        <div className="home__cta-orb home__cta-orb--one" />
        <div className="home__cta-orb home__cta-orb--two" />

        <Reveal>

          <div className="home__cta-badge">
            HOMEFLOW
          </div>

          <h2>
            Make your money
            <br />
            <span>flow better.</span>
          </h2>

          <p>
            Start organizing your household finances today.
          </p>

          <Link to="/register" className="home__btn home__btn--cta">
            Create Your HomeFlow →
          </Link>

        </Reveal>

      </section>

      {/* FOOTER */}
      <footer className="home__footer">

        <div className="home__footer-top">

          <HomeFlowLogo />

          <div className="home__footer-links">

            <div className="home__footer-col">

              <p className="home__footer-heading">
                Product
              </p>

              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#why-homeflow">Why HomeFlow</a>

            </div>

            <div className="home__footer-col">

              <p className="home__footer-heading">
                Get Started
              </p>

              <Link to="/register">Create Account</Link>
              <Link to="/login">Sign In</Link>

            </div>

          </div>

        </div>

        <p className="home__footer-copy">
          © {new Date().getFullYear()} HomeFlow. Built for calmer households.
        </p>

      </footer>

    </div>
    
  );
}

export default Home;