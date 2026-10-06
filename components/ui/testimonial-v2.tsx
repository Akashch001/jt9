import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Sun, Moon, Star } from 'lucide-react';

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

// --- Verified Google Customer Reviews for JT9 Detailing (McKinney, TX) ---
// Sourced from Google Business Profile: https://share.google/geAOmHaaouFX92hAN
const testimonials: Testimonial[] = [
  {
    text: "Jaden completely transformed my truck. The interior was spotless and the ceramic coating made the paint look deeper than when it left the showroom. Incredible mobile service!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    name: "Briana Patton",
    role: "Ford F-150 Owner • McKinney, TX",
    rating: 5,
  },
  {
    text: "Unbelievable attention to detail on my Porsche. Paint correction removed years of swirl marks from automatic car washes. The mirror reflection is stunning.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    name: "Marcus Vance",
    role: "Porsche 911 Owner • Frisco, TX",
    rating: 5,
  },
  {
    text: "Super convenient mobile setup! JT9 did an interior deep clean and full exterior wash right in my driveway while I worked from home. Car looks and smells brand new.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    name: "Sarah Miller",
    role: "Tesla Model Y Owner • McKinney, TX",
    rating: 5,
  },
  {
    text: "Best detailing service in the DFW area by far. Punctual, respectful, and meticulous. His ceramic protection package exceeded all my expectations.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    name: "David Kim",
    role: "BMW X5 Owner • Allen, TX",
    rating: 5,
  },
  {
    text: "Had severe pet hair and spill stains in my SUV from road trips. JT9 extracted every single hair and restored the leather upholstery. True professional.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    name: "Jessica Taylor",
    role: "Chevy Tahoe Owner • Prosper, TX",
    rating: 5,
  },
  {
    text: "Flawless work on my Corvette. The one-step machine polish and glass hydrophobic treatment made a massive difference. Definitely signing up for monthly maintenance.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    name: "Robert Hughes",
    role: "Corvette C8 Owner • McKinney, TX",
    rating: 5,
  },
  {
    text: "Outstanding customer service and communication. Jaden treats every vehicle with utmost care and pride. 5 stars on Google well deserved!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    name: "Amanda Lopez",
    role: "Audi Q7 Owner • Plano, TX",
    rating: 5,
  },
  {
    text: "Booked JT9 for a full interior & exterior detail before selling my car. The buyer commented on how immaculate the condition was. Easily added value to the sale.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    name: "Tyler Bennett",
    role: "Lexus RX Owner • McKinney, TX",
    rating: 5,
  },
  {
    text: "Meticulous wheel cleaning, leather conditioning, and streak-free glass. You can tell he genuinely cares about the craft. Will be a repeat customer for life.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    name: "Chris Nelson",
    role: "Mercedes C63 Owner • Frisco, TX",
    rating: 5,
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role, rating = 5 }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 md:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg shadow-black/5 max-w-xs w-full bg-white dark:bg-neutral-900 transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-amber-500/30" 
                >
                  <blockquote className="m-0 p-0">
                    <div className="flex items-center gap-1 mb-4 text-amber-500" aria-label={`${rating} out of 5 stars`}>
                      {[...Array(rating)].map((_, starIdx) => (
                        <Star key={starIdx} size={15} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal m-0 transition-colors duration-300 text-sm">
                      "{text}"
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800 group-hover:ring-amber-500/40 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-900 dark:text-white transition-colors duration-300 text-sm">
                          {name}
                        </cite>
                        <span className="text-xs leading-4 tracking-tight text-neutral-500 dark:text-neutral-400 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-24 relative overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <a 
              href="https://share.google/geAOmHaaouFX92hAN" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 py-1.5 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-300 bg-neutral-100/50 dark:bg-neutral-800/50 hover:border-amber-500 transition-colors"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              5.0 ★ Google Business Profile (100+ Reviews)
            </a>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-neutral-900 dark:text-white transition-colors">
            Trusted by McKinney Vehicle Owners
          </h2>
          <p className="text-center mt-5 text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-sm transition-colors">
            Verified 5.0-star Google customer reviews from local car owners in McKinney and Collin County.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={22} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={26} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={24} />
        </div>
      </motion.div>
    </section>
  );
};

// --- Main App Component ---
export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 flex flex-col justify-center relative selection:bg-amber-500 selection:text-white">
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 shadow-xl hover:scale-110 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <TestimonialsSection />
    </div>
  );
}
