import { useState, useEffect } from "react";

interface UseActiveSectionOptions {
  sections: string[];
  offset?: number;
}

export function useActiveSection({ sections, offset = 100 }: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState(sections[0] || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, offset]);

  return activeSection;
}