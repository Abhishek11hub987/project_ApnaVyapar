'use client';

import { motion } from 'framer-motion';
import { ExternalLink, AlertCircle } from 'lucide-react';

import { useState, useEffect } from 'react';

const SCHEMES = [
  { name: "PM MUDRA Yojana", amount: "Up to ₹10 Lakhs", desc: "Collateral-free loans for micro and small enterprises.", link: "https://www.mudra.org.in/" },
  { name: "Stand-Up India", amount: "₹10L - ₹1Cr", desc: "Loans for SC/ST and women entrepreneurs.", link: "https://www.standupmitra.in/" },
  { name: "PMEGP", amount: "Up to ₹50 Lakhs", desc: "Subsidy for setting up micro enterprises.", link: "https://www.kviconline.gov.in/" },
  { name: "CGTMSE", amount: "Up to ₹5 Crore", desc: "Credit guarantee for MSEs without collateral.", link: "https://www.cgtmse.in/" },
  { name: "Startup India Seed Fund", amount: "Up to ₹50 Lakhs", desc: "Financial assistance for proof of concept and commercialization.", link: "https://seedfund.startupindia.gov.in/" },
  { name: "MSME Udyam Registration", amount: "Free", desc: "Official registration for MSME benefits and subsidies.", link: "https://udyamregistration.gov.in/" },
  { name: "Atal Innovation Mission", amount: "Up to ₹10 Crore", desc: "Grants for incubation centres.", link: "https://aim.gov.in/" },
  { name: "Venture Capital Assistance", amount: "Up to ₹50 Lakhs", desc: "Financial support for agri-business projects.", link: "http://sfacindia.com/" },
  { name: "Coir Udyami Yojana", amount: "Up to ₹10 Lakhs", desc: "Support for coir-based units.", link: "https://coirboard.gov.in/" },
  { name: "National Small Industries Corporation (NSIC)", amount: "Raw Material Assistance", desc: "Financing for raw materials.", link: "https://www.nsic.co.in/" },
  { name: "Dairy Entrepreneurship Development Scheme", amount: "25-33% Subsidy", desc: "Support for setting up dairy farms.", link: "https://www.nabard.org/" },
  { name: "Credit Linked Capital Subsidy", amount: "15% Subsidy", desc: "Technology upgradation for MSEs.", link: "https://msme.gov.in/" },
  { name: "ZED Certification Scheme", amount: "Up to ₹5 Lakhs", desc: "Subsidy for Zero Defect Zero Effect certification.", link: "https://zed.msme.gov.in/" },
  { name: "Market Development Assistance", amount: "Up to ₹2.5 Lakhs", desc: "Funding for MSMEs to participate in international fairs.", link: "https://msme.gov.in/" },
  { name: "ASPIRE", amount: "Up to ₹1 Crore", desc: "Promotion of innovation and rural industry.", link: "https://aspire.msme.gov.in/" },
  { name: "Lean Manufacturing Competitiveness", amount: "80% Subsidy", desc: "Assistance to MSMEs for Lean implementation.", link: "https://msme.gov.in/" },
  { name: "Design Clinic Scheme", amount: "Up to ₹40 Lakhs", desc: "Design expertise for MSME sector.", link: "https://msme.gov.in/" },
  { name: "Digital MSME Scheme", amount: "Up to ₹1 Lakh", desc: "Subsidy for adopting cloud computing.", link: "https://msme.gov.in/" },
  { name: "Women Entrepreneurship Platform (NITI Aayog)", amount: "Network & Mentoring", desc: "Support ecosystem for women entrepreneurs.", link: "https://wep.gov.in/" },
  { name: "TREAD", amount: "30% Subsidy", desc: "Trade Related Entrepreneurship Assistance for Women.", link: "https://msme.gov.in/" }
];

export function SarkariAlert({ scheme }: { scheme?: { name: string, amount: string, desc: string, link: string } }) {
  const [data, setData] = useState(scheme || SCHEMES[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!scheme) {
      const random = SCHEMES[Math.floor(Math.random() * SCHEMES.length)];
      setData(random);
    }
    setMounted(true);
  }, [scheme]);

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md p-4 group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors" />
      
      <div className="relative z-10 flex items-start gap-3">
        <div className="mt-1 p-2 rounded-full bg-amber-500/20 text-amber-500 shadow-neon-amber">
          <AlertCircle size={20} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-amber-600 dark:text-amber-400">Sarkari Yojana Alert</h4>
            <span className="text-xs font-bold px-2 py-1 rounded bg-amber-500 text-white animate-pulse">
              {data.amount}
            </span>
          </div>
          
          <h5 className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{data.name}</h5>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
            {data.desc}
          </p>
          
          <a 
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 mt-3 hover:underline"
          >
            Check Eligibility <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
