import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContentSection = ({ id, title, children, className = '' }) => {
  const boxRef = useRef();

  useEffect(() => {
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: boxRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <section
      id={id}
      className={`min-h-screen flex flex-col justify-center items-center px-[5vw] py-24 relative z-10 pointer-events-auto ${className}`}
    >
      <div
        ref={boxRef}
        className="bg-[rgba(10,10,16,0.85)] backdrop-blur-[20px] border border-[rgba(255,215,0,0.2)] rounded-[20px] p-12 md:p-16 max-w-4xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] opacity-0"
      >
        {title && (
          <h2 className="text-4xl md:text-5xl font-serif mb-8 bg-gradient-to-r from-[#FFD700] to-[#8B5CF6] bg-clip-text text-transparent">
            {title}
          </h2>
        )}
        <div className="text-[#F0F0F0] text-lg md:text-xl leading-relaxed space-y-5">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;

