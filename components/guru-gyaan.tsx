'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROVERBS = [
  { text: "Boond boond se sagar banta hai", meaning: "Drop by drop, an ocean is formed. Every small step counts.", context: "finance" },
  { text: "Jahan chah, wahan raah", meaning: "Where there is a will, there is a way.", context: "risk" },
  { text: "Umeed pe duniya kayam hai", meaning: "The world rests on hope. Keep going.", context: "landing" },
  { text: "Kal kare so aaj kar, aaj kare so ab", meaning: "Don't postpone. Do tomorrow's work today, and today's work right now.", context: "checklist" },
  { text: "Mehnat ka fal meetha hota hai", meaning: "The fruit of hard work is always sweet.", context: "general" },
  { text: "Bina jokhim ke labh nahi", meaning: "There is no gain without risk.", context: "risk" },
  { text: "Samay hi dhan hai", meaning: "Time is the real wealth. Use it wisely.", context: "finance" },
  { text: "Akela chana bhand nahi phod sakta", meaning: "One person alone can't do everything. Build your team.", context: "general" },
  { text: "Jaisa desh, waisa bhesh", meaning: "Dress (and adapt) according to the land you're in. Know your market.", context: "landing" },
  { text: "Sabar ka phal meetha hota hai", meaning: "Patience brings sweet rewards.", context: "finance" },
  { text: "Jitni chadar ho, utne pair pasaro", meaning: "Stretch your legs only as far as your blanket allows. Stay within your budget.", context: "finance" },
  { text: "Naya nau din, purana sau din", meaning: "New things last nine days; old things last a hundred. Build trust and reliability.", context: "general" },
  { text: "Nau nakad na terah udhar", meaning: "Nine in cash is better than thirteen on credit. Prefer real earnings over promises.", context: "finance" },
  { text: "Haath kangan ko aarsi kya", meaning: "A bangle on your wrist needs no mirror — proof is right there. Let results speak.", context: "landing" },
  { text: "Ek panth, do kaaj", meaning: "One path, two objectives. Solve two problems in one go and be efficient.", context: "checklist" },
  { text: "Khoda pahaad, nikla chuha", meaning: "You dug a mountain and found a mouse. Don't over-invest for tiny returns.", context: "risk" },
  { text: "Aam ke aam, guthliyon ke daam", meaning: "Profit from the mango AND its seeds. Maximise every asset's utility.", context: "finance" },
  { text: "Jo sota hai, wo khota hai", meaning: "One who sleeps (is idle) falls behind. Stay alert and proactive.", context: "general" },
  { text: "Ghar ka bhedi Lanka dhave", meaning: "An insider can cause the most damage. Choose partners and employees carefully.", context: "risk" },
  { text: "Sher ke muh mein jaane ka ek hi raasta hai", meaning: "There's only one way into a lion's mouth. Don't take unnecessary risks.", context: "risk" },
  { text: "Kharbooje ko dekh kar kharbooja rang badalta hai", meaning: "A melon changes color seeing another melon. Surround yourself with successful people.", context: "general" },
  { text: "Lalach buri bala hai", meaning: "Greed is a bad disease. Focus on sustainable growth, not quick scams.", context: "finance" },
  { text: "Sasta roye baar baar, mehnga roye ek baar", meaning: "The cheap buyer cries often, the expensive buyer cries once. Invest in quality.", context: "finance" },
  { text: "Jal mein reh kar magar se bair nahi", meaning: "You cannot live in the water and be enemies with the crocodile. Build good relationships with local authorities and partners.", context: "risk" },
  { text: "Oonchi dukaan phika pakwaan", meaning: "Tall shop, tasteless sweets. Don't just focus on marketing; ensure your product is actually good.", context: "landing" },
  { text: "Apna haath Jagannath", meaning: "Your own hand is your Lord. Self-reliance is the best reliance.", context: "general" },
  { text: "Bhes ke aage been bajana", meaning: "Playing the flute in front of a buffalo. Don't waste your pitch on the wrong target audience.", context: "landing" },
  { text: "Sui ki jagah talwar ka kaam nahi", meaning: "A sword cannot do the work of a needle. Use the right tools for the right job.", context: "checklist" },
  { text: "Aage daud pichhe chaud", meaning: "Running forward while leaving the back empty. Don't scale too fast without securing your current operations.", context: "risk" },
  { text: "Rassi jal gayi par aithan nahi gayi", meaning: "The rope burned but the twist remains. Be flexible and willing to pivot your business model.", context: "general" },
  { text: "Naach na jaane aangan tedha", meaning: "Not knowing how to dance and blaming the crooked floor. Take responsibility for your business outcomes.", context: "general" }
];

export function GuruGyaan({ context = 'general' }: { context?: string }) {
  const [proverb, setProverb] = useState(PROVERBS[4]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const relevant = PROVERBS.filter(p => p.context === context || p.context === 'general');
    
    // Initial proverb
    const initialRandom = relevant[Math.floor(Math.random() * relevant.length)];
    setProverb(initialRandom);
    setMounted(true);

    // Auto-Agent interval to change proverb every 12 seconds
    const intervalId = setInterval(() => {
      setProverb(current => {
        let nextRandom;
        do {
          nextRandom = relevant[Math.floor(Math.random() * relevant.length)];
        } while (nextRandom.text === current.text && relevant.length > 1);
        return nextRandom;
      });
    }, 12000);

    return () => clearInterval(intervalId);
  }, [context]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={proverb.text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto my-6"
      >
        <div className="relative rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50/50 via-emerald-50/50 to-teal-50/50" />
          <div className="relative px-6 py-5 text-center">
            <p className="font-hindi text-xl md:text-2xl font-bold text-gray-900 italic">
              ❝ {proverb.text} ❞
            </p>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {proverb.meaning}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
