import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navItems = ["Work", "Experience", "Education", "Approach"];

interface NavbarProps {
  foregroundColor: string;
}

const Navbar = ({ foregroundColor }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6"
    >
      <a
        href="#"
        className="font-sans-body font-semibold text-[15px] tracking-[0.2em] uppercase transition-colors duration-500"
        style={{ color: foregroundColor }}
      >
        KUNAL WAGH
      </a>
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-sans-body text-[14px] transition-colors duration-500"
            style={{ color: foregroundColor, opacity: 0.8 }}
          >
            {item}
          </a>
        ))}
        <ThemeToggle foregroundColor={foregroundColor} />
      </div>
    </motion.nav>
  );
};

export default Navbar;
