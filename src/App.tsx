import { FormEvent, ReactNode, useMemo, useState } from "react";
import "./styles.css";

type ChatStep = "home" | "faq" | "appointment" | "success";
type Inquiry = {
  name: string;
  email: string;
  phone: string;
  project: string;
  timing: string;
  notes: string;
};

const emptyInquiry: Inquiry = {
  name: "",
  email: "",
  phone: "",
  project: "",
  timing: "",
  notes: "",
};

// Production photography used by the Vercel build.
const images = {
  hero: "https://images.unsplash.com/photo-1769326541248-5e09a8ace25b?auto=format&fit=crop&fm=jpg&q=84&w=2200",
  living: "https://images.unsplash.com/photo-1768144092684-c1a5dd6c7aad?auto=format&fit=crop&fm=jpg&q=84&w=2200",
  bath: "https://images.unsplash.com/photo-1782805134528-9b4e58e20069?auto=format&fit=crop&fm=jpg&q=84&w=2200",
};

const faqs = [
  {
    q: "What types of projects do you take on?",
    a: "NANO CONTRACTING focuses on kitchens, bathrooms, whole-home remodeling, and interior improvement projects.",
  },
  {
    q: "How does pricing work?",
    a: "We use transparent pricing. If unexpected work is uncovered, we explain it first and agree on any added cost before moving forward.",
  },
  {
    q: "Can I request an appointment here?",
    a: "Yes. You can submit a preferred date and time through this assistant. The request is not confirmed until NANO CONTRACTING follows up.",
  },
];

function ServiceIcon({ type }: { type: "kitchen" | "bath" | "home" | "interior" }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "bath") {
    return (
      <svg {...common}>
        <path d="M8 22h24v5c0 4.5-3.5 8-8 8h-8c-4.5 0-8-3.5-8-8v-5Z" />
        <path d="M11 22V11c0-3 2-5 5-5 2.5 0 4.5 1.6 5 4" />
        <path d="M11 35v2M29 35v2" />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg {...common}>
        <path d="m7 19 13-12 13 12" />
        <path d="M10 17v17h20V17" />
        <path d="M17 34V23h6v11" />
      </svg>
    );
  }

  if (type === "interior") {
    return (
      <svg {...common}>
        <rect x="8" y="8" width="24" height="24" />
        <path d="M8 18h24M23 18v14M26 23h3M26 27h3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="8" y="9" width="24" height="22" />
      <path d="M19 9v22M8 20h24M12 14h3M24 14h4M24 25h4" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState<ChatStep>("home");
  const [inquiry, setInquiry] = useState<Inquiry>(emptyInquiry);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const year = useMemo(() => new Date().getFullYear(), []);

  const updateInquiry = (field: keyof Inquiry, value: string) => {
    setInquiry((current) => ({ ...current, [field]: value }));
  };

  const handleProjectSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleAppointmentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChatStep("success");
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NANO CONTRACTING home">
          <span className="brand-mark">N</span>
          <span>NANO CONTRACTING</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Past Projects</a>
          <a className="nav-cta" href="#inquiry" onClick={() => setMenuOpen(false)}>
            Discuss your project
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow light">QUALITY YOU CAN TRUST</p>
            <h1>New house.<br />Same address.</h1>
            <p className="hero-lede">
              Home renovation and remodeling, with transparent pricing and guaranteed workmanship.
            </p>
            <a className="button button-gold hero-button" href="#inquiry">
              Discuss your project
            </a>
          </div>

          <div className="hero-image-wrap">
            <img
              src={images.hero}
              alt="Contemporary kitchen with warm wood, marble and brass finishes"
              className="hero-image"
            />
            <div className="hero-image-label">
              <span>RENOVATION</span>
              <span>DESIGN + BUILD</span>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="services-heading">
            <div>
              <p className="eyebrow">OUR EXPERTISE</p>
              <h2>Every room.<br />New possibilities.</h2>
            </div>
            <p className="services-intro">
              Whether you’re updating one space or rethinking your entire home, we focus on the details that make everyday living better.
            </p>
          </div>

          <div className="service-list">
            <Service type="kitchen" title="Kitchen remodeling">
              A more functional layout, considered finishes, and a kitchen made for gathering.
            </Service>
            <Service type="bath" title="Bathroom renovations">
              Calm, comfortable spaces with practical storage and thoughtful material choices.
            </Service>
            <Service type="home" title="Whole home remodeling">
              A cohesive transformation that connects your rooms and reflects your lifestyle.
            </Service>
            <Service type="interior" title="Interior improvements">
              Refined flooring, finish work, and purposeful updates that make a meaningful difference.
            </Service>
          </div>
        </section>

        <section className="approach" id="about">
          <div className="approach-image-wrap">
            <img
              src={images.living}
              alt="Warm modern living room with cream upholstery, wood furniture and navy accents"
              className="approach-image"
            />
          </div>

          <div className="approach-copy">
            <p className="eyebrow">OUR APPROACH</p>
            <h2>Good design is in the details.</h2>
            <p className="approach-body">
              We work with you to understand what you want to change, establish a clear plan, and complete the renovation with care and attention to detail.
            </p>
            <div className="promise">
              <strong>Transparent pricing. No surprises!</strong>
              <span>
                No hidden fees, just clear communication. If something unexpected comes up, we explain it before moving forward.
              </span>
            </div>
            <a className="text-arrow" href="#inquiry">About NANO <span>↗</span></a>
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="projects-heading">
            <div>
              <p className="eyebrow">PAST PROJECTS</p>
              <h2>Built for real life.</h2>
            </div>
            <p>
              Thoughtful spaces, refined materials, and renovation work designed to feel at home from day one.
            </p>
          </div>

          <div className="project-grid">
            <ProjectCard image={images.hero} title="Kitchen transformation" category="Kitchen remodeling" />
            <ProjectCard image={images.bath} title="Calm, modern retreat" category="Bathroom renovation" />
            <ProjectCard image={images.living} title="Warm whole-home refresh" category="Interior remodeling" />
          </div>
        </section>

        <section className="inquiry section" id="inquiry">
          <div className="inquiry-copy">
            <p className="eyebrow light">START A CONVERSATION</p>
            <h2>Dream home starts here.</h2>
            <p>
              Tell us what you want to change. We’ll use your notes to start a focused conversation about scope, timing, and next steps.
            </p>
          </div>

          {submitted ? (
            <div className="success-card">
              <span className="success-icon">✓</span>
              <h3>Thanks, {inquiry.name || "we got it"}.</h3>
              <p>
                Your project inquiry is ready for follow-up. We’ll connect this form to your preferred service when you approve that integration.
              </p>
              <button className="button button-light-outline" onClick={() => { setSubmitted(false); setInquiry(emptyInquiry); }}>
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleProjectSubmit}>
              <div className="field-row">
                <label>
                  Name
                  <input required value={inquiry.name} onChange={(e) => updateInquiry("name", e.target.value)} />
                </label>
                <label>
                  Email
                  <input required type="email" value={inquiry.email} onChange={(e) => updateInquiry("email", e.target.value)} />
                </label>
              </div>
              <div className="field-row">
                <label>
                  Phone
                  <input value={inquiry.phone} onChange={(e) => updateInquiry("phone", e.target.value)} />
                </label>
                <label>
                  Project type
                  <select required value={inquiry.project} onChange={(e) => updateInquiry("project", e.target.value)}>
                    <option value="">Select a project</option>
                    <option>Kitchen remodeling</option>
                    <option>Bathroom renovation</option>
                    <option>Whole home remodeling</option>
                    <option>Interior improvements</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <label>
                Ideal timing
                <input placeholder="Example: Spring 2027" value={inquiry.timing} onChange={(e) => updateInquiry("timing", e.target.value)} />
              </label>
              <label>
                Tell us about your project
                <textarea required rows={5} value={inquiry.notes} onChange={(e) => updateInquiry("notes", e.target.value)} />
              </label>
              <button className="button button-gold" type="submit">Send project inquiry</button>
            </form>
          )}
        </section>
      </main>

      <footer>
        <div>
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">N</span>
            <span>NANO CONTRACTING</span>
          </a>
          <p>Thoughtful renovations. Beautifully built.</p>
        </div>
        <div className="footer-meta">
          <span>© {year} NANO CONTRACTING</span>
          <a href="#top">Accessibility</a>
        </div>
      </footer>

      <button className="chat-launcher" onClick={() => setChatOpen(true)}>
        <span className="chat-icon">▱</span>
        <span>Let’s talk</span>
        <span className="chat-plus">+</span>
      </button>

      {chatOpen && (
        <div className="chat-panel" role="dialog" aria-modal="true" aria-label="NANO project assistant">
          <div className="chat-header">
            <div>
              <span className="chat-kicker">NANO PROJECT ASSISTANT</span>
              <strong>Let’s talk</strong>
            </div>
            <button aria-label="Close assistant" onClick={() => setChatOpen(false)}>×</button>
          </div>

          <div className="chat-body">
            {chatStep === "home" && (
              <>
                <p>How can I help with your renovation?</p>
                <button className="chat-choice" onClick={() => setChatStep("faq")}>Ask a common question</button>
                <button className="chat-choice" onClick={() => setChatStep("appointment")}>Request an appointment</button>
                <a className="chat-choice link-choice" href="#inquiry" onClick={() => setChatOpen(false)}>Start a project inquiry</a>
              </>
            )}

            {chatStep === "faq" && (
              <>
                <button className="back-button" onClick={() => setChatStep("home")}>← Back</button>
                <div className="faq-list">
                  {faqs.map((item) => (
                    <details key={item.q}>
                      <summary>{item.q}</summary>
                      <p>{item.a}</p>
                    </details>
                  ))}
                </div>
              </>
            )}

            {chatStep === "appointment" && (
              <>
                <button className="back-button" onClick={() => setChatStep("home")}>← Back</button>
                <p>Send a preferred time. This is a request only and still needs confirmation.</p>
                <form className="appointment-form" onSubmit={handleAppointmentSubmit}>
                  <label>
                    Name
                    <input required value={inquiry.name} onChange={(e) => updateInquiry("name", e.target.value)} />
                  </label>
                  <label>
                    Email
                    <input required type="email" value={inquiry.email} onChange={(e) => updateInquiry("email", e.target.value)} />
                  </label>
                  <label>
                    Preferred date
                    <input required type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
                  </label>
                  <label>
                    Preferred time
                    <input required type="time" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} />
                  </label>
                  <button className="button button-gold" type="submit">Send appointment request</button>
                </form>
              </>
            )}

            {chatStep === "success" && (
              <div className="chat-success">
                <span className="success-icon">✓</span>
                <h3>Request captured.</h3>
                <p>Your preferred time is ready for follow-up. It is not confirmed until NANO CONTRACTING responds.</p>
                <button className="button button-outline" onClick={() => setChatStep("home")}>Back to assistant</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Service({
  type,
  title,
  children,
}: {
  type: "kitchen" | "bath" | "home" | "interior";
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="service-row">
      <div className="service-icon"><ServiceIcon type={type} /></div>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
      <span className="service-arrow">↗</span>
    </article>
  );
}

function ProjectCard({ image, title, category }: { image: string; title: string; category: string }) {
  return (
    <article className="project-card">
      <div className="project-image-wrap">
        <img src={image} alt="" className="project-image" />
      </div>
      <p>{category}</p>
      <h3>{title}</h3>
    </article>
  );
}

export default App;
