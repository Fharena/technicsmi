import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

type Sample =
  | { kind: "img"; el: HTMLImageElement; src: string }
  | { kind: "bg";  el: HTMLElement;      src: string }
  | { kind: "video"; el: HTMLVideoElement; src: string };

function intersectArea(a: DOMRect, b: DOMRect) {
  const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return x * y;
}
const firstBgUrl = (v: string) => v.match(/url\((['"]?)(.*?)\1\)/i)?.[2] ?? null;

type Props = {
  magnify?: number;        // 볼록감
  refractScale?: number;   // 굴절 강도
  enableBlurFallback?: boolean;
};

const NavigationLens: React.FC<Props> = ({
  magnify = 1.08,
  refractScale = 36,
  enableBlurFallback = true,
}) => {
  const navRef = useRef<HTMLElement>(null);

  //하위메뉴 추가하기
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const [navRect, setNavRect] = useState<DOMRect | null>(null);
  const [sample, setSample] = useState<Sample | null>(null);
  const overlapRef = useRef(0);           // 현재 샘플과의 겹침 면적(히스테리시스용)
  const location = useLocation();
  const navigate = useNavigate();
  const uid = useId();

  // 현재 페이지 이름 가져오기
  const getCurrentPageName = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'HOME';
      case '/about':
        return 'ABOUT';
      case '/work':
        return 'WORK';
      case '/libra':
        return 'LIBRA';
      case '/aqua':
        return 'AQUARIUS';
      case '/froma':
        return 'FRØMA';
      case '/archive':
        return 'ARCHIVE';
      case '/stock':
        return 'STOCK';
      default:
        return 'HOME';
    }
  };

  // 네비 아래 시각 소스 찾기: <img>, background-image, <video>
  const pickUnderlyingVisual = () => {
    const nav = navRef.current;
    if (!nav) return;

    const nrect = nav.getBoundingClientRect();
    setNavRect(nrect);

    let best: Sample | null = null;
    let bestArea = 0;

    // IMG
    for (const im of Array.from(document.images) as HTMLImageElement[]) {
      const cs = getComputedStyle(im);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const r = im.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const area = intersectArea(nrect, r);
      if (area > bestArea) { bestArea = area; best = { kind: "img", el: im, src: im.currentSrc || im.src }; }
    }
    // background-image (큰 블록 위주)
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("section, header, main, footer, div"))) {
      const url = firstBgUrl(getComputedStyle(el).backgroundImage);
      if (!url) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const area = intersectArea(nrect, r);
      if (area > bestArea) { bestArea = area; best = { kind: "bg", el, src: url }; }
    }
    // VIDEO
    for (const v of Array.from(document.querySelectorAll<HTMLVideoElement>("video"))) {
      const cs = getComputedStyle(v);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const r = v.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const area = intersectArea(nrect, r);
      // 일부 브라우저에서 cross-origin 재생 제약 → muted/playsInline로 우회
      if (area > bestArea) { bestArea = area; best = { kind: "video", el: v, src: (v.currentSrc || v.src) ?? "" }; }
    }

    if (!best) return; // 후보 없으면 유지(폴백이 보여짐)

    // ✅ 히스테리시스: 기존 샘플 대비 15% 이상 개선될 때만 교체 (깜빡임 방지)
    if (bestArea >= overlapRef.current * 1.15 || overlapRef.current === 0) {
      setSample(best);
      overlapRef.current = bestArea;
    }
  };

  // 스크롤/리사이즈/라우트 변경 시 갱신
  useEffect(() => {
    let raf = 0;
    const onTick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (navRef.current) setNavRect(navRef.current.getBoundingClientRect());
        pickUnderlyingVisual();
      });
    };
    onTick();
    window.addEventListener("scroll", onTick, { passive: true });
    window.addEventListener("resize", onTick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onTick);
      window.removeEventListener("resize", onTick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // 최신 rect 기준 정렬
  const imgBox = useMemo(() => {
    if (!sample || !navRect) return null;
    const r = ("el" in sample ? sample.el.getBoundingClientRect() : null) ?? sample.el.getBoundingClientRect?.();
    const rect = r as DOMRect;
    if (!rect?.width || !rect?.height) return null;
    return {
      x: -(rect.left - navRect.left),
      y: -(rect.top  - navRect.top),
      w: rect.width,
      h: rect.height,
      src: sample.src,
    };
  }, [sample, navRect]);

  const navScaleTransform = useMemo(() => {
    if (!navRect) return "";
    const cx = navRect.width / 2, cy = navRect.height / 2;
    return `translate(${cx} ${cy}) scale(${magnify}) translate(${-cx} ${-cy})`;
  }, [navRect, magnify]);

  // 비디오 복제 노드 (필요 시)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (sample?.kind !== "video" || !videoRef.current) return;
    const srcVid = sample.el;
    const dstVid = videoRef.current;
    dstVid.muted = true; dstVid.playsInline = true;
    // 같은 소스로 재생 시작
    const start = async () => { try { await dstVid.play(); } catch {} };
    start();

    let raf = 0;
    const sync = () => {
      try {
        if (!dstVid.paused && srcVid.readyState >= 2) {
          // 느슨한 동기화 (정밀 필요 없으면 생략 가능)
          if (Math.abs(dstVid.currentTime - srcVid.currentTime) > 0.1) {
            dstVid.currentTime = srcVid.currentTime;
          }
        }
      } catch {}
      raf = requestAnimationFrame(sync);
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [sample]);
  // const toggleOpen = () => setOpen(o => !o); // 사용하지 않는 함수 주석 처리

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <div 
        className="nav-shell"
        onMouseEnter={() => {
            // 닫기 타이머 취소
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
            setOpen(true);
        }}
        onMouseLeave={() => {
            // 200ms 지연 후 닫기
            closeTimerRef.current = setTimeout(() => {
                setOpen(false);
                setSubOpen(false);
            }, 200);
        }}
    >
        <nav
            ref={navRef}
            aria-label="Primary navigation"
            className={`navigation ios-glass ${open ? "open" : ""} ${subOpen ? "sub-open" : ""}`}
            onFocus={() => setOpen(true)}
            onBlur={() => { setOpen(false); setSubOpen(false); }}
        >
        {/* ▼ 네비 전체 렌즈 오버레이 */}
            <div className="nav-overlay" aria-hidden="true">
                {imgBox && navRect && sample ? (
                sample.kind === "video" ? (
                    // ▶ 비디오 소스: HTML <video>에 SVG 필터 적용 (CSS filter url(#...))
                    <video
                    ref={videoRef}
                    src={imgBox.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    style={{
                        position: "absolute",
                        left: `${imgBox.x}px`,
                        top:  `${imgBox.y}px`,
                        width: `${imgBox.w}px`,
                        height:`${imgBox.h}px`,
                        objectFit: "cover",
                        transformOrigin: "center",
                        transform: `translateZ(0)`,
                        filter: `url(#nav-refract-${uid})`,
                        WebkitFilter: `url(#nav-refract-${uid})`,
                        pointerEvents: "none",
                    }}
                    />
                ) : (
                    // 🖼️ 이미지/백그라운드: SVG <image> + 필터
                    <svg className="nav-refract-svg" viewBox={`0 0 ${navRect.width} ${navRect.height}`} preserveAspectRatio="none">
                    <defs>
                        <filter id={`nav-refract-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves={2} seed={4} result="noise" />
                        <feGaussianBlur in="noise" stdDeviation="0.5" result="map" />
                        <feDisplacementMap in="SourceGraphic" in2="map" scale={refractScale} xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </defs>
                    <image
                        href={imgBox.src}
                        x={imgBox.x}
                        y={imgBox.y}
                        width={imgBox.w}
                        height={imgBox.h}
                        transform={navScaleTransform}
                        filter={`url(#nav-refract-${uid})`}
                        style={{ pointerEvents: "none" }}
                    />
                    </svg>
                )
                ) : (
                enableBlurFallback && (
                    <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backdropFilter: "blur(18px) saturate(140%) contrast(108%)",
                        WebkitBackdropFilter: "blur(18px) saturate(140%) contrast(108%)",
                    }}
                    />
                        )
                        )}
                    </div>
                    <div className="nav-left-icon" />
            {/* ▼ 실제 네비 콘텐츠 */}
            <ul className="nav-list">
                {/* 디폴트 상태: 현재 페이지 이름만 표시 */}
                <li className="current-page">
                    <span className="current-page-text">{getCurrentPageName()}</span>
                </li>
                
                {/* 확장 상태: 모든 메뉴 표시 */}
                <li className="home">
                    <NavLink 
                        to="/" 
                        end       
                        className={({isActive}) => `nav-link${isActive ? " active" : ""}`}
                        onClick={() => {
                            setOpen(false);
                            setSubOpen(false);
                        }}
                    >
                        HOME
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about"      
                        className={({isActive}) => `nav-link${isActive ? " active" : ""}`}
                        onClick={() => {
                            setOpen(false);
                            setSubOpen(false);
                        }}
                    >
                        ABOUT
                    </NavLink>
                </li>
                <li
                    className="has-sub"
                    onMouseEnter={() => {
                        // 닫기 타이머 취소 (안정성 확보)
                        if (closeTimerRef.current) {
                            clearTimeout(closeTimerRef.current);
                            closeTimerRef.current = null;
                        }
                        setSubOpen(true);
                    }}
                >
                    <NavLink 
                        to="/work" 
                        className={({isActive}) => `nav-link${isActive ? " active" : ""}`}
                        onClick={() => {
                            setOpen(false);
                            setSubOpen(false);
                        }}
                    >
                        WORK
                    </NavLink>

                    {/* 하위 메뉴 (네비 안쪽 아래로 펼쳐짐) */}
                    <ul 
                        className="submenu"
                        onMouseEnter={() => {
                            // 서브메뉴에서도 타이머 취소 (추가 안전장치)
                            if (closeTimerRef.current) {
                                clearTimeout(closeTimerRef.current);
                                closeTimerRef.current = null;
                            }
                        }}
                    >
                        <li>
                            <button 
                                className="sub-link"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    // 즉시 상태 초기화
                                    setOpen(false);
                                    setSubOpen(false);
                                    
                                    // 타이머 정리
                                    if (closeTimerRef.current) {
                                        clearTimeout(closeTimerRef.current);
                                        closeTimerRef.current = null;
                                    }
                                    
                                    // 네비게이션 실행
                                    navigate('/libra');
                                }}
                            >
                                LIBRA
                            </button>
                        </li>
                        <li>
                            <button 
                                className="sub-link"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    // 즉시 상태 초기화
                                    setOpen(false);
                                    setSubOpen(false);
                                    
                                    // 타이머 정리
                                    if (closeTimerRef.current) {
                                        clearTimeout(closeTimerRef.current);
                                        closeTimerRef.current = null;
                                    }
                                    
                                    // 네비게이션 실행
                                    navigate('/aqua');
                                }}
                            >
                                AQUARIUS
                            </button>
                        </li>
                        <li>
                            <button 
                                className="sub-link"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    // 즉시 상태 초기화
                                    setOpen(false);
                                    setSubOpen(false);
                                    
                                    // 타이머 정리
                                    if (closeTimerRef.current) {
                                        clearTimeout(closeTimerRef.current);
                                        closeTimerRef.current = null;
                                    }
                                    
                                    // 네비게이션 실행
                                    navigate('/froma');
                                }}
                            >
                                FRØMA
                            </button>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink 
                        to="/archive"    
                        className={({isActive}) => `nav-link${isActive ? " active" : ""}`}
                        onClick={() => {
                            setOpen(false);
                            setSubOpen(false);
                        }}
                    >
                        ARCHIVE
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/stock"    
                        className={({isActive}) => `nav-link${isActive ? " active" : ""}`}
                        onClick={() => {
                            setOpen(false);
                            setSubOpen(false);
                        }}
                    >
                        STOCK
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  );
};

export default NavigationLens;
