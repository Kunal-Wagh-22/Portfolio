interface ContactSectionProps {
  foregroundColor: string;
  mutedColor: string;
}

const ContactSection = ({ foregroundColor, mutedColor }: ContactSectionProps) => {
  const linkStyle = { color: foregroundColor };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        
        {/* HEADLINE (Hero style, reduced size) */}
        <h2
          className="font-serif-display text-[clamp(2rem,6vw,4rem)] font-bold tracking-tighter leading-[0.85] mb-6"
          style={{ color: foregroundColor }}
        >
          Contact Me
        </h2>

        {/* BODY (same as hero role text) */}
        <p
          className="text-[clamp(14px,2vw,18px)] mb-10"
          style={{ color: foregroundColor, opacity: 0.6 }}
        >
          I’m always open to connecting. Reach out over email or check my profile links below.
        </p>

        {/* LINKS (unchanged) */}
        <div className="flex flex-col md:flex-row justify-center gap-6 text-base">
          <a href="mailto:hello@kunalwagh.com" className="underline" style={linkStyle}>
            Email: hello@kunalwagh.com
          </a>
          <a
            href="https://www.linkedin.com/in/kunal-wagh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={linkStyle}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/kunalwagh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={linkStyle}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
