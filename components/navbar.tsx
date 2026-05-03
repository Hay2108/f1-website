"use client";

import Link from "next/link";
import { ROUTES } from "../links/routes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function Navbar() {
  const pathname = usePathname();
  // Xác định các page luôn hiện navbar
  const alwaysShow = ["/"];
  // Xác định page team detail: /teams/*
  const isTeamDetail = pathname.startsWith("/teams/");
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isTeamDetail) {
      const timer = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(timer);
    }
    setShow(false);
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isTeamDetail]);

  return (
    <nav
      className={`nav-bar fixed top-0 left-0 w-full z-[100] px-[50px] py-[25px] flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div className={`transition-all duration-700 ease-out pointer-events-auto ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
        <div className="nav-logo font-orbitron text-[1.8rem] font-black text-white tracking-[3px] uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
          <Link href={ROUTES.HOME}>F1 Teams</Link>
        </div>
      </div>
      <div className="nav-links flex gap-[40px]">
        <div className={`transition-all duration-700 delay-[200ms] ease-out pointer-events-auto ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <Link 
            href={ROUTES.HOME}
            className="font-orbitron text-[1.1rem] font-medium text-white/70 no-underline uppercase tracking-[1.5px] transition-all duration-300 relative drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] hover:text-white hover:-translate-y-0.5 after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:w-full hover:after:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            Home
          </Link>
        </div>
        <div className={`transition-all duration-700 delay-[400ms] ease-out pointer-events-auto ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <Link 
            href={ROUTES.TRACKS}
            className="font-orbitron text-[1.1rem] font-medium text-white/70 no-underline uppercase tracking-[1.5px] transition-all duration-300 relative drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] hover:text-white hover:-translate-y-0.5 after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:w-full hover:after:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            Tracks list
          </Link>
        </div>
        <div className={`transition-all duration-700 delay-[600ms] ease-out pointer-events-auto ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <Link 
            href={ROUTES.CHAMPIONSHIPS}
            className="font-orbitron text-[1.1rem] font-medium text-white/70 no-underline uppercase tracking-[1.5px] transition-all duration-300 relative drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] hover:text-white hover:-translate-y-0.5 after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:w-full hover:after:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            Championships
          </Link>
        </div>
      </div>
    </nav>
  );
}
