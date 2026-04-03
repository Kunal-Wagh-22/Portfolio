interface ContactSectionProps {
  foregroundColor: string;
  mutedColor: string;
}

const ContactSection = ({ foregroundColor, mutedColor }: ContactSectionProps) => {
  const linkStyle = { color: foregroundColor };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <h2 className="text-4xl font-semibold mb-6" style={{ color: foregroundColor }}>
          Contact Me
        </h2>
        <p className="text-lg mb-10" style={{ color: mutedColor }}>
          I’m always open to connecting. Reach out over email or check my profile links below.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 text-base">
          <a href="mailto:waghkunal314@gmail.com" className="underline" style={linkStyle}>
            Email:  waghkunal314@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/kunal-wagh-a45513208/" target="_blank" rel="noopener noreferrer" className="underline" style={linkStyle}>
            LinkedIn
          </a>
          <a href="https://github.com/Kunal-Wagh-22" target="_blank" rel="noopener noreferrer" className="underline" style={linkStyle}>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
