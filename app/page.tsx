"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../links/routes";
import Tracks from "../components/Tracks";
import Championships from "../components/Championships";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ENABLE_SLOT_MACHINE = true; // Đổi thành true để bật hiệu ứng slot machine


const teams = [
  { name: "Mercedes", desc: "Mũi tên bạc. Thống trị kỷ nguyên hybrid với sự theo đuổi sự hoàn hảo không ngừng nghỉ.", bg: "/img/1.png", route: "/teams/mercedes", logo: "/logos/mercedes.svg", glowColor: "rgba(0, 210, 190, 0.6)" },
  { name: "Red Bull", desc: "Chắp cánh cho bạn. Khí động học chưa từng có và phả hệ vô địch.", bg: "/img/2.png", route: "/teams/redbull", logo: "/logos/redbull.svg", glowColor: "rgba(6, 0, 239, 0.5)" },
  { name: "Ferrari", desc: "Đam mê, tốc độ và di sản nước Ý. Màu đỏ biểu tượng chinh phục trái tim của hàng triệu người hâm mộ F1.", bg: "/img/3.png", route: ROUTES.FERRARI, logo: "/logos/ferrari.svg", glowColor: "rgba(220, 0, 0, 0.6)" },
  { name: "McLaren", desc: "Sự kết hợp giữa tốc độ, đổi mới và phong cách vượt thời gian.", bg: "/img/4.png", route: "/teams/mclaren", logo: "/logos/mclaren.svg", glowColor: "rgba(255, 135, 0, 0.6)" },
  { name: "Racing Point", desc: "Từ một đội đua tư nhân đầy tham vọng đến một đối thủ nghiêm túc trên lưới đua.", bg: "/img/5.png", route: "/teams/racingpoint", logo: "/logos/racingpoint.svg", glowColor: "rgba(245, 150, 200, 0.6)" },
  { name: "Renault", desc: "Đam mê, tốc độ và di sản nước Ý. Màu đỏ biểu tượng chinh phục trái tim của hàng triệu người hâm mộ F1.", bg: "/img/6.png", route: "/teams/renault", logo: "/logos/renault.svg", glowColor: "rgba(255, 212, 0, 0.6)" },
  { name: "AlphaTauri", desc: "Thời trang thể thao kết hợp đua xe. Năng động, đổi mới và không ngừng phát triển.", bg: "/img/7.png", route: "/teams/alphatauri", logo: "/logos/alphatauri.svg", glowColor: "rgba(255, 255, 255, 0.6)" },
  { name: "Alfa Romeo", desc: "Di sản Ý kết hợp đổi mới Thụy Sĩ. Tốc độ, phong cách và tinh thần chinh phục.", bg: "/img/8.png", route: "/teams/alfaromeo", logo: "/logos/alfaromeo.svg", glowColor: "rgba(255, 255, 255, 0.5)" },
  { name: "Haas F1", desc: "Giấc mơ Mỹ. Bền bỉ, quyết tâm và chiến đấu cho từng điểm số.", bg: "/img/9.png", route: "/teams/haas", logo: "/logos/haas.svg", glowColor: "rgba(255, 255, 255, 0.5)" },
  { name: "Williams", desc: "Di sản đua xe Anh gặp gỡ phong cách lái xe Mỹ. Tốc độ, sự đổi mới và tinh thần thể thao thuần túy.", bg: "/img/10.png", route: "/teams/williams", logo: "/logos/williams.svg", glowColor: "rgba(0, 160, 222, 0.6)" },
];

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);

  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'done'>('done');
  const [startSlotMachine, setStartSlotMachine] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [currentTeamIndices, setCurrentTeamIndices] = useState<number[]>(
    teams.map((_, i) => ENABLE_SLOT_MACHINE ? (i * 3 + 7) % teams.length : i)
  );

  const hasStartedSlotMachine = useRef(false);

  // Smooth GSAP Entrance Animation - Scoped to mainRef
  useGSAP(() => {
    if (startSlotMachine) {
      gsap.fromTo('.slice',
        { y: '5vh', opacity: 0 },
        { y: '0vh', opacity: 1, duration: 1.2, stagger: 0.05, ease: "power3.out", overwrite: "auto" }
      );
      gsap.fromTo('.team-logo-container',
        { y: -50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.05, delay: 0.3, ease: "back.out(1.5)" }
      );
    }
  }, { scope: mainRef, dependencies: [startSlotMachine] });

  // Speed Lines Animation - Scoped to speedLinesRef
  useGSAP(() => {
    const lines = gsap.utils.toArray('.speed-line') as HTMLElement[];
    lines.forEach((line) => {
      gsap.fromTo(line, 
        { x: '-100vw' },
        {
          x: '100vw',
          duration: Math.random() * 2 + 1.5,
          repeat: -1,
          ease: 'none',
          delay: Math.random() * 2,
        }
      );
    });
  }, { scope: speedLinesRef });

  // Slot Machine Initialization
  useEffect(() => {
    if (!startSlotMachine || hasStartedSlotMachine.current) return;
    hasStartedSlotMachine.current = true;

    if (!ENABLE_SLOT_MACHINE) return;

    const animatingRef = { current: teams.map(() => true) };
    
    const intervalId = setInterval(() => {
      setCurrentTeamIndices(prev => 
        prev.map((val, i) => animatingRef.current[i] ? Math.floor(Math.random() * teams.length) : val)
      );
    }, 80);

    const stopOrder = [...Array(teams.length).keys()].sort(() => Math.random() - 0.5);
    const timeouts = stopOrder.map((colIndex, i) => {
      return setTimeout(() => {
        animatingRef.current[colIndex] = false;
        setCurrentTeamIndices(prev => {
           const next = [...prev];
           next[colIndex] = colIndex;
           return next;
        });
        if (animatingRef.current.every(v => !v)) clearInterval(intervalId);
      }, 600 + i * 200);
    });

    return () => {
      hasStartedSlotMachine.current = false;
      clearInterval(intervalId);
      timeouts.forEach(clearTimeout);
    };
  }, [startSlotMachine]);

  const total = teams.length;
  const baseWidth = 100 / total;
  const hoverWidth = 25;

  const getClipPath = (index: number) => {
    if (hoverIndex === -1) {
      return `polygon(${index * baseWidth}% 0%, ${(index + 1) * baseWidth}% 0%, ${(index + 1) * baseWidth}% 100%, ${index * baseWidth}% 100%)`;
    }

    const minRestWidth = 5;
    const idealLeft = (hoverIndex * baseWidth + baseWidth / 2) - hoverWidth / 2;
    const minLeft = hoverIndex * minRestWidth;
    const maxLeft = 100 - hoverWidth - (total - 1 - hoverIndex) * minRestWidth;
    const leftEdge = Math.max(minLeft, Math.min(idealLeft, maxLeft));
    const rightEdge = leftEdge + hoverWidth;

    if (index === hoverIndex) {
      return `polygon(${leftEdge}% 0%, ${rightEdge}% 0%, ${rightEdge}% 100%, ${leftEdge}% 100%)`;
    }
    if (index < hoverIndex) {
      const wL = leftEdge / hoverIndex;
      return `polygon(${index * wL}% 0%, ${(index + 1) * wL}% 0%, ${(index + 1) * wL}% 100%, ${index * wL}% 100%)`;
    }
    const wR = (100 - rightEdge) / (total - 1 - hoverIndex);
    const offset = rightEdge + (index - hoverIndex - 1) * wR;
    return `polygon(${offset}% 0%, ${offset + wR}% 0%, ${offset + wR}% 100%, ${offset}% 100%)`;
  };

  const getLogoCenter = (index: number) => {
    if (hoverIndex === -1) {
      return index * baseWidth + baseWidth / 2;
    }

    const minRestWidth = 5;
    const idealLeft = (hoverIndex * baseWidth + baseWidth / 2) - hoverWidth / 2;
    const minLeft = hoverIndex * minRestWidth;
    const maxLeft = 100 - hoverWidth - (total - 1 - hoverIndex) * minRestWidth;
    const leftEdge = Math.max(minLeft, Math.min(idealLeft, maxLeft));
    const rightEdge = leftEdge + hoverWidth;

    if (index === hoverIndex) {
      return leftEdge + hoverWidth / 2;
    }
    if (index < hoverIndex) {
      const wL = leftEdge / hoverIndex;
      return index * wL + wL / 2;
    }
    const wR = (100 - rightEdge) / (total - 1 - hoverIndex);
    return rightEdge + (index - hoverIndex - 1) * wR + wR / 2;
  };

  return (
    <main ref={mainRef} className="w-full relative bg-[#0a0a0a]">
      {/* Horizontal Speed Lines Background */}
      <div ref={speedLinesRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className={`speed-line absolute h-[1px] md:h-[2px] rounded-full ${i % 3 === 0 ? 'bg-gradient-to-r from-transparent via-[#e10600] to-transparent' : 'bg-gradient-to-r from-transparent via-white to-transparent'}`}
            style={{
              top: `${(i * 37) % 100}%`,
              left: '-20%',
              width: `${(i * 19) % 40 + 10}%`,
              opacity: ((i * 13) % 40) / 100 + 0.1,
            }}
          />
        ))}
      </div>

      <div id="hero" ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black z-10">
        {teams.map((team, index) => {
          const currentTeam = teams[currentTeamIndices[index]];
          const isHovered = hoverIndex === index;
          const isOtherHovered = hoverIndex !== -1 && !isHovered;

          return (
            <Link
              href={team.route}
              key={index}
              className="slice absolute top-0 left-0 w-full h-full cursor-pointer z-1 block"
              style={{ clipPath: getClipPath(index) }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
            >
              <div
                className="slice-bg absolute top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  backgroundImage: `url(${currentTeam.bg})`,
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  transformOrigin: `${getLogoCenter(index)}% 50%`,
                  filter: isOtherHovered ? "brightness(0.4) grayscale(0.5)" : "brightness(1) grayscale(0)",
                }}
              />
              <div className="slice-tint absolute inset-0 mix-blend-overlay opacity-60 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div
                className="absolute top-0 left-0 w-full h-[60vh] pointer-events-none z-20 transition-all duration-500 ease-out"
                style={{
                  background: `linear-gradient(to bottom, ${currentTeam.glowColor}, transparent)`,
                  opacity: isOtherHovered ? 0.3 : (isHovered ? 0.8 : 0.5),
                }}
              />
              <div
                className="team-logo-container absolute top-[15%] flex items-center justify-center z-30 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  height: '110px',
                  left: `${getLogoCenter(index)}%`,
                  transform: 'translateX(-50%)',
                  opacity: isOtherHovered ? 0.4 : 1,
                  filter: isOtherHovered ? 'grayscale(0.6)' : 'grayscale(0)',
                }}
              >
                <div className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] flex items-center justify-center relative transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: `scale(${isHovered ? 1.15 : 0.95})` }}
                >
                  <Image
                    src={currentTeam.logo}
                    alt={currentTeam.name}
                    fill
                    style={{objectFit: 'contain' }}
                    sizes="(max-width: 768px) 80px, 130px"
                    className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] z-10"
                  />
                </div>
              </div>
            </Link>
          );
        })}


      </div>

      {loadingPhase === 'done' && (
        <div className="relative z-10 bg-transparent">
          <Tracks />
          <Championships />
        </div>
      )}
    </main>
  );
}
