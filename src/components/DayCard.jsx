import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DayCard = ({ number, title, description, delay = 0 }) => {
  const cardRef = useRef();

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="relative bg-[rgba(139,92,246,0.1)] backdrop-blur-[10px] border-2 border-[rgba(139,92,246,0.3)] rounded-2xl p-8 md:p-10 overflow-hidden transition-all duration-400 hover:scale-105 hover:-translate-y-4 hover:border-[#FFD700] hover:shadow-[0_25px_50px_rgba(139,92,246,0.4)] opacity-0 group"
    >
      {/* Background glow effect */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,215,0,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
      
      {/* Day number */}
      <span className="absolute top-5 right-5 text-8xl font-serif font-bold text-[rgba(255,215,0,0.1)]">
        {number}
      </span>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-serif text-[#FFD700] mb-4">
          {title}
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-[#F0F0F0]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DayCard;

