import { useState } from 'react';
import { SITE } from '../../data/siteData';
import SectionHead from '../ui/SectionHead';
import SocialLinks from '../ui/SocialLinks';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', type: '' });
  const [sending, setSending] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = true;
    if (!form.subject.trim()) next.subject = true;
    if (!form.message.trim()) next.message = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus({ text: 'Please fill in all fields correctly.', type: 'error' });
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: '', email: '', subject: '', message: '' });
      setStatus({ text: 'Thank you! Your message has been sent successfully.', type: 'success' });
      setTimeout(() => setStatus({ text: '', type: '' }), 6000);
    }, 1500);
  };

  const fieldClass = (name) => `form-control${errors[name] ? ' is-invalid' : ''}`;

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <SectionHead
          kicker="Let's talk"
          title="Get In Touch"
          accentWord="Touch"
          subtitle="Have a project in mind? Let's build something great together."
        />

        <div className="row g-4">
          <div className="col-lg-5" data-aos="fade-right">
            <div className="contact-info glass-card">
              <h3>Contact Information</h3>
              <p className="contact-lead">
                Reach out through any of the channels below — I usually respond within 24 hours.
              </p>
              <ul className="contact-details">
                <li>
                  <span className="ci-icon"><i className="fa-solid fa-location-dot" /></span>
                  <div><strong>Location</strong><span>{SITE.location}</span></div>
                </li>
                <li>
                  <span className="ci-icon"><i className="fa-solid fa-phone" /></span>
                  <div><strong>Phone</strong><a href={SITE.phoneHref}>{SITE.phone}</a></div>
                </li>
                <li>
                  <span className="ci-icon"><i className="fa-solid fa-envelope" /></span>
                  <div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
                </li>
              </ul>
              <SocialLinks className="contact-socials" />
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-left">
            <form className="contact-form glass-card" noValidate onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className={fieldClass('name')} id="name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  <div className="invalid-feedback">Please enter your name.</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className={fieldClass('email')} id="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  <div className="invalid-feedback">Please enter a valid email.</div>
                </div>
                <div className="col-12">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" className={fieldClass('subject')} id="subject" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
                  <div className="invalid-feedback">Please enter a subject.</div>
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className={fieldClass('message')} id="message" name="message" rows="5" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required />
                  <div className="invalid-feedback">Please enter a message.</div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-accent w-100" disabled={sending}>
                    {sending ? (
                      <><i className="fa-solid fa-spinner fa-spin" /> Sending...</>
                    ) : (
                      <><i className="fa-solid fa-paper-plane" /> Send Message</>
                    )}
                  </button>
                </div>
              </div>
              {status.text && (
                <div className={`form-status ${status.type}`} role="status" aria-live="polite">
                  {status.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
