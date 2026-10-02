import { FormEvent, useMemo, useState } from "react";
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
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Past Projects</a>
          <a className="nav-cta" href="#inquiry" onClick={() => setMenuOpen(false)}>Discuss your project</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">QUALITY YOU CAN TRUST</p>
            <h1>New house.<br />Same address.</h1>
            <p className="hero-lede">
              Home renovation and remodeling, with transparent pricing and guaranteed workmanship.
            </p>
            <div className="hero-actions">
              <a className="button button-gold" href="#inquiry">Discuss your project</a>
              <a className="text-link" href="#services">Explore services</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Modern renovation concept">
            <div className="architectural-grid" />
            <div className="room-card kitchen-card">
              <div className="cabinet-wall" />
              <div className="island" />
              <div className="pendant p1" />
              <div className="pendant p2" />
              <div className="floor-line" />
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-intro">
            <p className="eyebrow">OUR EXPERTISE</p>
            <h2>Every room. Every possibility.</h2>
          </div>
          <div className="service-grid">
            {[
              ["01", "Kitchen remodeling", "A more functional layout, considered finishes, and a kitchen made for gathering."],
              ["02", "Bathroom renovations", "Calm, comfortable spaces with practical storage and thoughtful material choices."],
              ["03", "Whole home remodeling", "A cohesive transformation that connects your rooms and reflects your lifestyle."],
              ["04", "Interior improvements", "Refined flooring, finish work, and purposeful updates that make a meaningful difference."],
            ].map(([number, title, body]) => (
              <article className="service-card" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="approach section" id="about">
          <div className="approach-visual" aria-hidden="true">
            <div className="room-card living-card">
              <div className="fireplace" />
              <div className="sofa" />
              <div className="chair" />
              <div className="coffee-table" />
            </div>
          </div>
          <div className="approach-copy">
            <p className="eyebrow">OUR APPROACH</p>
            <h2>Good design is in the details.</h2>
            <p>
              We work with you to understand what you want to change, establish a clear plan, and complete the renovation with care and attention to detail.
            </p>
            <div className="promise">
              <strong>Transparent pricing. No surprises!</strong>
              <span>No hidden fees, just clear communication.</span>
            </div>
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="section-intro narrow">
            <p className="eyebrow">PAST PROJECTS</p>
            <h2>Thoughtful renovations. Beautifully built.</h2>
            <p>Replace these placeholders with completed NANO CONTRACTING work as your portfolio grows.</p>
          </div>
          <div className="project-grid">
            {["Kitchen transformation", "Bathroom retreat", "Whole-home refresh"].map((name, index) => (
              <article className="project-card" key={name}>
                <div className={"project-visual visual-" + (index + 1)}>
                  <span>PROJECT {String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="inquiry section" id="inquiry">
          <div className="inquiry-copy">
            <p className="eyebrow">START A CONVERSATION</p>
            <h2>Dream home starts here.</h2>
            <p>
              Tell us what you want to change. We’ll use your notes to start a focused conversation about scope, timing, and next steps.
            </p>
          </div>

          {submitted ? (
            <div className="success-card">
              <span className="success-icon">✓</span>
              <h3>Thanks, {inquiry.name || "we got it"}.</h3>
              <p>Your project inquiry is ready for follow-up. Connect this form to your preferred email, CRM, or free form service when you are ready.</p>
              <button className="button button-outline" onClick={() => { setSubmitted(false); setInquiry(emptyInquiry); }}>
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
              <p className="form-note">Demo source version: submissions stay in the browser until you approve an external service connection.</p>
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
        <span className="chat-dot">N</span>
        <span>Open NANO project assistant</span>
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

export default App;
