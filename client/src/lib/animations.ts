/**
 * Animation utilities and effects for the marketing website
 */

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

/**
 * Intersection Observer for scroll animations
 */
export const createScrollObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: ScrollAnimationOptions = {}
): IntersectionObserver => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  return new IntersectionObserver(callback, {
    threshold,
    rootMargin
  });
};

/**
 * Smooth scroll to element with easing
 */
export const smoothScrollTo = (
  element: HTMLElement | string,
  options: ScrollIntoViewOptions = {}
): void => {
  const target = typeof element === 'string' 
    ? document.getElementById(element) 
    : element;

  if (!target) return;

  const defaultOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };

  target.scrollIntoView({ ...defaultOptions, ...options });
};

/**
 * Parallax scroll effect
 */
export const createParallaxEffect = (
  element: HTMLElement,
  options: ParallaxOptions = {}
): (() => void) => {
  const { speed = 0.5, direction = 'up', disabled = false } = options;

  if (disabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}; // Return empty cleanup function
  }

  const updateParallax = () => {
    const rect = element.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;
    
    const yPos = direction === 'up' ? -rate : rate;
    element.style.transform = `translateY(${yPos}px)`;
  };

  // Initial call
  updateParallax();

  // Add scroll listener
  window.addEventListener('scroll', updateParallax, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', updateParallax);
    element.style.transform = '';
  };
};

/**
 * Stagger animation delays for multiple elements
 */
export const staggerAnimations = (
  elements: NodeListOf<Element> | Element[],
  baseDelay: number = 100
): void => {
  Array.from(elements).forEach((element, index) => {
    const delay = baseDelay * index;
    (element as HTMLElement).style.animationDelay = `${delay}ms`;
    (element as HTMLElement).style.transitionDelay = `${delay}ms`;
  });
};

/**
 * Fade in animation with intersection observer
 */
export const fadeInOnScroll = (
  selector: string,
  options: ScrollAnimationOptions = {}
): (() => void) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const observer = createScrollObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        if (options.triggerOnce !== false) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);

  elements.forEach((element) => {
    element.classList.add('opacity-0', 'translate-y-8');
    observer.observe(element);
  });

  return () => observer.disconnect();
};

/**
 * Slide up animation with intersection observer
 */
export const slideUpOnScroll = (
  selector: string,
  options: ScrollAnimationOptions = {}
): (() => void) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const observer = createScrollObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
        if (options.triggerOnce !== false) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);

  elements.forEach((element) => {
    element.classList.add('opacity-0', 'translate-y-12');
    observer.observe(element);
  });

  return () => observer.disconnect();
};

/**
 * Scale in animation with intersection observer
 */
export const scaleInOnScroll = (
  selector: string,
  options: ScrollAnimationOptions = {}
): (() => void) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const observer = createScrollObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-scale-in');
        if (options.triggerOnce !== false) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);

  elements.forEach((element) => {
    element.classList.add('opacity-0', 'scale-95');
    observer.observe(element);
  });

  return () => observer.disconnect();
};

/**
 * Counter animation for numbers
 */
export const animateCounter = (
  element: HTMLElement,
  target: number,
  duration: number = 2000,
  suffix: string = ''
): void => {
  const start = 0;
  const startTime = performance.now();

  const updateCounter = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    
    element.textContent = current.toLocaleString() + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };

  requestAnimationFrame(updateCounter);
};

/**
 * Typing animation effect
 */
export const typeWriter = (
  element: HTMLElement,
  text: string,
  speed: number = 50
): Promise<void> => {
  return new Promise((resolve) => {
    let index = 0;
    element.textContent = '';

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    };

    type();
  });
};

/**
 * Magnetic hover effect for buttons
 */
export const magneticHover = (
  element: HTMLElement,
  strength: number = 0.3
): (() => void) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    element.style.transform = '';
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
    element.style.transform = '';
  };
};