'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROVERBS = [
  { text: "Boond boond se sagar banta hai", meaning: "Drop by drop makes an ocean. Start small.", context: "finance" },
  { text: "Jahan chah, wahan raah", meaning: "Where there is a will, there is a way.", context: "risk" },
  { text: "Umeed pe duniya kayam hai", meaning: "The world rests on hope.", context: "landing" },
  { text: "Kal kare so aaj kar, aaj kare so ab", meaning: "What you must do tomorrow, do today.", context: "checklist" },
  { text: "Mehnat ka fal meetha hota hai", meaning: "The fruit of hard work is sweet.", context: "general" },
  { text: "Bina jokhim ke labh nahi", meaning: "No risk, no reward.", context: "risk" },
  { text: "Samay hi dhan hai", meaning: "Time is money.", context: "finance" },
  { text: "Akela chana bhand nahi phod sakta", meaning: "A single grain cannot crack the pot. Build a team.", context: "general" },
  { text: "Jaisa desh, waisa bhesh", meaning: "Adapt to your market.", context: "landing" },
  { text: "Sabar ka phal meetha hota hai", meaning: "Patience brings sweet rewards.", context: "finance" },
  { text: "Jitni chadar, utne pair pasaro", meaning: "Cut your coat according to your cloth. Budget wisely.", context: "finance" },
  { text: "Naya nau din, purana sau din", meaning: "New is nice, but old is reliable. Build trust.", context: "general" },
  { text: "Naud nakad, na terah udhar", meaning: "Nine in cash is better than thirteen on credit.", context: "finance" },
  { text: "Aage daud, pichhe chaud", meaning: "Don't expand so fast that you lose your base.", context: "risk" },
  { text: "Haath kangan ko aarsi kya", meaning: "Evidence doesn't need proof. Build a good product.", context: "landing" },
  { text: "Ek panth, do kaaj", meaning: "Kill two birds with one stone. Be efficient.", context: "checklist" },
  { text: "Khoda pahaad, nikli chuhiya", meaning: "Don't over-engineer. Focus on ROI.", context: "risk" },
  { text: "Aam ke aam, guthliyon ke daam", meaning: "Maximize your profits and utility.", context: "finance" },
  { text: "Jo sota hai, wo khota hai", meaning: "The early bird catches the worm. Be proactive.", context: "general" },
  { text: "Chhota munh, badi baat", meaning: "Let your work speak for itself.", context: "landing" }
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
            <p className="font-hindi text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
              "{proverb.text}"
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wider uppercase">
              {proverb.meaning}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
