import { useEffect } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to('#preloader', {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: onComplete
          });
        }, 500);
      }
    });

    // Lighter appears and moves down
    tl.to('.lighter', { duration: 0.8, opacity: 1, y: 80, ease: 'power2.out' }, 0.5)
      // Lighter flame ignites
      .to('.lighter-flame', { duration: 0.3, opacity: 1, scale: 1, ease: 'back.out' }, 1.3)
      // Lighter flame flickers
      .to('.lighter-flame', { duration: 0.5, scale: 1.1, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 1.6)
      // Diya flame ignites from lighter
      .to('.diya-flame', { duration: 0.5, opacity: 1, scale: 1, ease: 'back.out' }, 2.5)
      // Lighter moves away
      .to('.lighter', { duration: 0.6, y: -50, opacity: 0, ease: 'power2.in' }, 3)
      .to('.lighter-flame', { duration: 0.3, opacity: 0, scale: 0 }, 3)
      // Diya flame grows and flickers
      .to('.diya-flame', { duration: 1, scale: 1.2, ease: 'sine.inOut', repeat: 2, yoyo: true }, 3.5)
      // Text appears
      .to('.loader-text', { duration: 0.8, opacity: 1, y: -10, ease: 'power2.out' }, 3.2);
  }, [onComplete]);

  return (
    <div id="preloader" className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0A10] to-[#1a0a2e]">
      <div className="relative w-[300px] h-[300px]">
        {/* Lighter */}
        <div className="lighter absolute top-5 left-1/2 -translate-x-1/2 rotate-[-45deg] w-[15px] h-[100px] rounded-[3px] opacity-0"
             style={{
               background: 'linear-gradient(180deg, #FF4500 0%, #8B0000 10%, #654321 10%, #8B4513 100%)'
             }}>
          <div className="lighter-flame absolute top-[-25px] left-1/2 -translate-x-1/2 w-[20px] h-[35px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-0 scale-0"
               style={{
                 background: 'radial-gradient(ellipse at center bottom, #FFD700 0%, #FF8C00 50%, #FF4500 80%, transparent 100%)',
                 filter: 'blur(1px)'
               }}></div>
        </div>

        {/* Diya */}
        <div className="preloader-diya absolute bottom-20 left-1/2 -translate-x-1/2 w-[120px] h-[60px]">
          <div className="diya-wick absolute top-[-15px] left-1/2 -translate-x-1/2 w-[8px] h-[20px] rounded-[2px]"
               style={{
                 background: 'linear-gradient(180deg, #8B4513 0%, #654321 100%)'
               }}></div>
          <div className="diya-flame absolute top-[-50px] left-1/2 -translate-x-1/2 w-[30px] h-[60px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-0 scale-0"
               style={{
                 background: 'radial-gradient(ellipse at center bottom, #FFD700 0%, #FF8C00 40%, #FF4500 70%, transparent 100%)',
                 filter: 'blur(2px) drop-shadow(0 0 20px #FF8C00)'
               }}></div>
          <div className="diya-bowl w-[120px] h-[40px] rounded-b-[60px] relative shadow-[0_10px_30px_rgba(255,215,0,0.4)]"
               style={{
                 background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)'
               }}></div>
        </div>
      </div>

      <div className="loader-text mt-12 text-2xl text-[#FFD700] text-center opacity-0">
        Igniting the Festival of Lights...
      </div>
    </div>
  );
};

export default Preloader;

