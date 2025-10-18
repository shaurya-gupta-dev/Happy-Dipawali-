import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Scene3D from './components/Scene3D';
import ContentSection from './components/ContentSection';
import DayCard from './components/DayCard';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      // Track scroll progress for 3D scene
      ScrollTrigger.create({
        trigger: '#content-overlay',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    }
  }, [loading]);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  const daysData = [
    {
      number: 1,
      title: 'Dhanteras',
      description: 'The day of wealth and prosperity. People clean their homes, create beautiful rangoli designs, and purchase gold, silver, or new utensils to welcome Goddess Lakshmi into their homes.'
    },
    {
      number: 2,
      title: 'Naraka Chaturdasi',
      description: 'Also known as Choti Diwali, this day commemorates Lord Krishna\'s victory over the demon Narakasura. It is a day for ritual cleansing, removing negativity, and preparing for the main celebration.'
    },
    {
      number: 3,
      title: 'Lakshmi Puja',
      description: 'The main day of the festival. Families gather to perform prayers to Goddess Lakshmi and Lord Ganesha, followed by grand feasts, exchange of gifts, and spectacular fireworks displays.'
    },
    {
      number: 4,
      title: 'Govardhan Puja',
      description: 'This day honors Lord Krishna lifting the Govardhan Hill to protect villagers from torrential rain. It is also celebrated as Balipratipada, a day to show gratitude to nature and its bounty.'
    },
    {
      number: 5,
      title: 'Bhai Dooj',
      description: 'The festival concludes by celebrating the sacred bond between brothers and sisters. Sisters pray for their brothers\' long life and well-being, while brothers pledge to protect their sisters.'
    }
  ];

  return (
    <div className="dark min-h-screen bg-[#0A0A10]">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {!loading && (
        <>
          {/* 3D Background Scene */}
          <Scene3D scrollProgress={scrollProgress} />
          
          {/* Content Overlay */}
          <div id="content-overlay" className="relative z-10 pointer-events-none">
            
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center px-[5vw] py-24 relative z-10 pointer-events-auto">
              <div className="text-center bg-[rgba(10,10,16,0.7)] backdrop-blur-[20px] border border-[rgba(255,215,0,0.2)] rounded-[20px] p-12 md:p-16 max-w-5xl">
                <h1 className="text-5xl md:text-7xl font-serif mb-6 text-[#F0F0F0]">
                  The Festival of Lights
                </h1>
                <p className="text-2xl md:text-3xl text-[#FFD700] mb-8">
                  A Cinematic 3D Journey Through Diwali
                </p>
                <p className="text-lg md:text-xl text-[#F0F0F0] max-w-2xl mx-auto">
                  Experience the magic of Deepavali in an immersive, fully animated 3D environment. Scroll to begin your journey.
                </p>
              </div>
            </section>

            {/* What is Diwali */}
            <ContentSection id="what-is-diwali" title="What is Deepavali?">
              <p>
                Diwali, or Deepavali, is the Hindu festival of lights celebrated over five days. It symbolizes the spiritual <strong>victory of light over darkness, good over evil, and knowledge over ignorance</strong>.
              </p>
              <p>
                The name is derived from the Sanskrit word 'Deepavali', meaning 'row of lamps'. Millions of lights illuminate homes, temples, and public spaces, signifying the inner light that protects us from spiritual darkness.
              </p>
              <p>
                This ancient festival brings together families and communities in a celebration of hope, renewal, and the triumph of righteousness.
              </p>
            </ContentSection>

            {/* Story of Rama */}
            <ContentSection id="story-rama" title="The Return of Lord Rama">
              <p>
                The most famous legend behind Diwali is the return of <strong>Lord Rama</strong>, his wife <strong>Sita</strong>, and his brother <strong>Lakshmana</strong> to Ayodhya after a 14-year exile. This return followed Rama's victory over the demon king Ravana.
              </p>
              <p>
                The people of Ayodhya lit countless <strong>diyas</strong> (clay lamps) to illuminate their path on the dark, moonless night, celebrating the triumph of righteousness. This act of lighting lamps is the central tradition of Diwali that continues to this day.
              </p>
              <p>
                The epic Ramayana tells us that the entire kingdom rejoiced, and the glow of a million lamps turned the night into day, symbolizing the return of dharma (righteousness) to the land.
              </p>
            </ContentSection>

            {/* Goddess Lakshmi */}
            <ContentSection id="lakshmi" title="Worshipping Goddess Lakshmi">
              <p>
                Diwali is also inextricably linked with <strong>Goddess Lakshmi</strong>, the deity of wealth, prosperity, and abundance. The main day of Diwali is dedicated to her worship, along with <strong>Lord Ganesha</strong>, the remover of obstacles.
              </p>
              <p>
                It is believed that Lakshmi visits the cleanest and most brightly lit homes on this auspicious night, bringing fortune and blessings for the coming year. Families perform elaborate <strong>Puja</strong> ceremonies and light firecrackers to ward off evil spirits.
              </p>
              <p>
                The ritual of welcoming Lakshmi represents our invitation to prosperity, not just in material wealth, but in spiritual richness and inner peace.
              </p>
            </ContentSection>

            {/* Five Days */}
            <section className="min-h-screen flex flex-col justify-center items-center px-[5vw] py-24 relative z-10 pointer-events-auto">
              <div className="max-w-7xl w-full">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-[#FFD700] to-[#8B5CF6] bg-clip-text text-transparent">
                    The Five Sacred Days
                  </h2>
                  <p className="text-lg md:text-xl text-[#F0F0F0] max-w-4xl mx-auto">
                    Diwali is a five-day festival, each with its own unique significance and rituals, creating a beautiful progression of celebration and spiritual renewal.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {daysData.map((day, index) => (
                    <DayCard
                      key={day.number}
                      number={day.number}
                      title={day.title}
                      description={day.description}
                      delay={index * 0.15}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Traditions */}
            <ContentSection id="traditions" title="Timeless Traditions">
              <p>
                Diwali celebrations are rich with traditions that have been passed down through generations. <strong>Lighting diyas</strong> and candles symbolizes the dispelling of darkness and ignorance. <strong>Creating rangoli</strong> patterns at the entrance of homes welcomes guests and deities with vibrant, intricate designs made from colored powders, flowers, and rice.
              </p>
              <p>
                Families exchange <strong>sweets (mithai)</strong> and gifts, strengthening bonds of love and friendship. The bursting of <strong>fireworks</strong> adds to the festive atmosphere, though many now choose eco-friendly celebrations to protect the environment.
              </p>
              <p>
                New clothes are worn, homes are thoroughly cleaned and decorated, and prayers are offered with devotion. These traditions create a tapestry of joy, spirituality, and community that defines the essence of Diwali.
              </p>
            </ContentSection>

            {/* Global Celebration */}
            <ContentSection id="global" title="A Global Festival">
              <p>
                Diwali has transcended geographical boundaries and is now celebrated by millions around the world. Indian communities in countries like the <strong>United States, United Kingdom, Canada, Australia, Malaysia, and Singapore</strong> organize grand public events, cultural performances, and spectacular fireworks displays.
              </p>
              <p>
                Many countries recognize Diwali as a public holiday, and major cities illuminate landmarks in honor of the festival. The universal themes of light triumphing over darkness and good prevailing over evil resonate with people of all backgrounds.
              </p>
              <p>
                This global celebration of Diwali showcases the rich cultural heritage of India while promoting values of peace, prosperity, and unity that are cherished worldwide.
              </p>
            </ContentSection>

            {/* Footer */}
            <footer className="relative z-10 text-center py-12 px-[5vw] bg-[rgba(0,0,0,0.9)] border-t-2 border-[rgba(255,215,0,0.2)]">
              <p className="text-xl text-[#F0F0F0] tracking-[2px] mb-3">
                Happy Dipawali
              </p>
              <p className="text-xl text-[#F0F0F0] tracking-[2px]">
                Made with ❤️ by{' '}
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FF8C00] to-[#FFD700] bg-clip-text text-transparent">
                  Shaurya
                </span>
              </p>
            </footer>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

