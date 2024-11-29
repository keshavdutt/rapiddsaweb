import React from 'react';
import {
  BarChart,
  ChevronRight,
  File,
  Globe,
  HeartHandshake,
  Rss,
  Shield
} from 'lucide-react';
import Marquee from './magic-ui/marquee';
import CtaCard from './InViewMotion';



const CTASection = () => {
  const tiles = [
    {
      icon: HeartHandshake,
      bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px]'
    },
    {
      icon: Globe,
      bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 blur-[20px]'
    },
    {
      icon: File,
      bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-70 blur-[20px]'
    },
    {
      icon: Shield,
      bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 blur-[20px]'
    },
    {
      icon: Rss,
      bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px]'
    },
    {
      icon: BarChart,
      bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px]'
    }
  ];

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Generate shuffled tile arrays
  const randomTiles1 = shuffleArray(tiles);
  const randomTiles2 = shuffleArray(tiles);
  const randomTiles3 = shuffleArray(tiles);
  const randomTiles4 = shuffleArray(tiles);

  return (
    <section id="cta" className="py-14">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee reverse className="-delay-[200ms] animate-marquee-slow" repeat={5}>
            {randomTiles1.map(({ icon: Icon, bg }, id) => (
              <CtaCard key={id}>
                <Icon className="size-full" />
                <div className={bg}></div>
              </CtaCard>
            ))}
          </Marquee>
          <Marquee className="animate-marquee-slow" repeat={5}>
            {randomTiles2.map(({ icon: Icon, bg }, id) => (
              <CtaCard key={id}>
                <Icon className="size-full" />
                <div className={bg}></div>
              </CtaCard>
            ))}
          </Marquee>
          <Marquee reverse className="-delay-[200ms] animate-marquee-medium" repeat={5}>
            {randomTiles1.map(({ icon: Icon, bg }, id) => (
              <CtaCard key={id}>
                <Icon className="size-full" />
                <div className={bg}></div>
              </CtaCard>
            ))}
          </Marquee>
          <Marquee className="animate-marquee-longest" repeat={5}>
            {randomTiles2.map(({ icon: Icon, bg }, id) => (
              <CtaCard key={id}>
                <Icon className="size-full" />
                <div className={bg}></div>
              </CtaCard>
            ))}
          </Marquee>


          <div className="absolute z-10">
            <div
              className="mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32"
            >
              <HeartHandshake className="mx-auto size-16 text-black dark:text-white lg:size-24" />
            </div>
            <div className="z-10 mt-4 flex flex-col items-center text-center text-primary">
              <h1 className="text-3xl font-bold lg:text-4xl">Stop wasting time on other sites.</h1>
              <p className="mt-2">Start your 7-day free trial. No credit card required.</p>
              <button
                className="group mt-4 rounded-[2rem] px-6 py-2 border border-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Get Started
                <ChevronRight
                  className="ml-1 inline-block size-4 transition-all duration-300 ease-out group-hover:translate-x-1"
                />
              </button>
            </div>
            <div
              className="bg-background absolute inset-0 -z-10 rounded-full opacity-40 blur-xl dark:bg-background"
            />
          </div>
          <div
            className="to-background absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-70% dark:to-background"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;