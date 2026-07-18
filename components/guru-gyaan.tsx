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
  { text: "Sher ke muh mein jaane ka ek hi raasta hai", meaning: "There's only one way into a lion's mouth. Don't take unnecessary risks.", context: "risk" }
];

export function GuruGyaan({ context = 'general' }: { context?: string }) {
  const [proverb, setProverb] = useState(PROVERBS[4]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const relevant = PROVERBS.filter(p => p.context === context || p.context === 'general');
    const random = relevant[Math.floor(Math.random() * relevant.length)];
    setProverb(random);
    setMounted(true);
  }, [context]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto my-6"
      >
        <div className="relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-r from-teal-500/20 via-amber-500/20 to-teal-500/20 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-amber-500/10 to-teal-500/10 blur-xl" />
          <div className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-6 py-4 rounded-xl text-center border border-white/10">
            <p className="font-hindi text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent italic">
              ❝ {proverb.text} ❞
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {proverb.meaning}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
