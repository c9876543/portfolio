document.addEventListener('DOMContentLoaded', () => {
    // --- Overlay Menu ---
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('overlayClose');
    const overlayMenu = document.getElementById('overlayMenu');

    const toggleMenu = (isOpen) => {
        overlayMenu.classList.toggle('is-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        menuBtn.setAttribute('aria-expanded', isOpen);
    };

    menuBtn?.addEventListener('click', () => toggleMenu(true));
    closeBtn?.addEventListener('click', () => toggleMenu(false));
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlayMenu.classList.contains('is-open')) {
            toggleMenu(false);
        }
    });

    // --- Side Navigation Active State on Scroll ---
    const sideLinks = document.querySelectorAll('.side-nav .side-link');
    const sections = Array.from(sideLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(Boolean);

    // 기본 active NEWS
    sideLinks.forEach(link => link.classList.remove('active'));
    if (sideLinks[0]) sideLinks[0].classList.add('active');

    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const id = entry.target.id;
                    sideLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px', // viewport의 중앙 지점을 기준으로 판별
            threshold: 0
        });

        sections.forEach(section => observer.observe(section));
    }

    // 클릭시 슬라이드 형태로 이동
    sideLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
                const headerOffset = 70; // 헤더 높이
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                // 슬라이드 형태로 이동 (requestAnimationFrame)
                const startY = window.scrollY;
                const distance = offsetPosition - startY;
                const duration = 600;
                let start;

                function slideScroll(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percent = Math.min(progress / duration, 1);
                    window.scrollTo(0, startY + distance * easeInOutQuad(percent));
                    if (percent < 1) {
                        requestAnimationFrame(slideScroll);
                    }
                }
                function easeInOutQuad(t) {
                    return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
                }
                requestAnimationFrame(slideScroll);
            }
            sideLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 페이지 진입 시 NEWS로 자연스럽게 스크롤
    window.addEventListener('load', () => {
        const newsSection = document.getElementById('news');
        if (newsSection) {
            setTimeout(() => {
                const headerOffset = 70;
                const elementPosition = newsSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                const startY = window.scrollY;
                const distance = offsetPosition - startY;
                const duration = 700;
                let start;

                function slideScroll(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percent = Math.min(progress / duration, 1);
                    window.scrollTo(0, startY + distance * easeInOutQuad(percent));
                    if (percent < 1) {
                        requestAnimationFrame(slideScroll);
                    }
                }
                function easeInOutQuad(t) {
                    return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
                }
                requestAnimationFrame(slideScroll);
            }, 120);
        }
    });

    // 비즈니스 탭 전환 효과 (텍스트 없이 이미지만)
    document.addEventListener('DOMContentLoaded', () => {
        const tabs = document.querySelectorAll('.business-tabs .tab');
        const images = document.querySelectorAll('.business-images .biz-img');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                images.forEach(img => {
                    if (img.dataset.tab === tab.dataset.tab) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
            });
        });
    });

    // business swiper 탭 클릭 시 이미지 전환
    document.addEventListener('DOMContentLoaded', () => {
        const paginations = document.querySelectorAll('.business-pagination li');
        const slides = document.querySelectorAll('.business-slide');
        paginations.forEach(li => {
            li.addEventListener('click', () => {
                paginations.forEach(p => p.classList.remove('active'));
                li.classList.add('active');
                const idx = li.getAttribute('data-index');
                slides.forEach(s => {
                    if (s.getAttribute('data-index') === idx) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    });

    // 비즈니스 탭 hover 시 이미지 및 active 탭 전환 (마우스 오버 후 상태 유지)
    const tabs = document.querySelectorAll('.business-tabs .tab');
    const images = document.querySelectorAll('.biz-img');

    // 기본 이미지 및 탭 세팅
    images.forEach(img => {
        img.classList.toggle('active', img.dataset.tab === 'talent');
    });
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === 'talent');
    });

    tabs.forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            const tabName = tab.dataset.tab;
            // 이미지 전환
            images.forEach(img => {
                img.classList.toggle('active', img.dataset.tab === tabName);
            });
            // 탭 active 전환
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
        // 마우스 leave 이벤트 제거 (상태 유지)
    });
});

// CULTURE 섹션 이미지 교체 (레이아웃 유지 & 깜빡임 없음)
const quoteImage = document.querySelector(".image-block.with-quote img");
const links = document.querySelectorAll(".icon-links a");
let fadeTimer;

links.forEach(link => {
  link.addEventListener("mouseenter", e => {
    const newSrc = e.currentTarget.dataset.img;
    if (!newSrc || quoteImage.src.includes(newSrc)) return;

    // 미리 로드
    const preload = new Image();
    preload.src = newSrc;

    preload.onload = () => {
      clearTimeout(fadeTimer);
      quoteImage.style.transition = "0.3s";
      quoteImage.style.opacity = 0.2;

      fadeTimer = setTimeout(() => {
        quoteImage.src = newSrc;
        quoteImage.style.opacity = 1;
      }, 200);
    };
  });
});

// CULTURE 섹션 이미지 & 텍스트 동시 전환 (깜빡임 없음)
const quoteBlock = document.querySelector(".image-block.with-quote");
const quoteImg = quoteBlock.querySelector("img");
const quoteText = quoteBlock.querySelector(".quote-overlay p");

document.querySelectorAll(".icon-links a").forEach(link => {
  link.addEventListener("mouseenter", e => {
    const newSrc = e.currentTarget.dataset.img;
    const newQuote = e.currentTarget.dataset.quote;
    if (!newSrc || quoteImg.src.includes(newSrc)) return;

    // 미리 로드
    const preload = new Image();
    preload.src = newSrc;

    preload.onload = () => {
      // 부드러운 페이드
      quoteImg.style.transition = "0.1s ease-in-out";
      quoteText.style.transition = "0.1s ease-in-out";
      quoteImg.style.opacity = 0.2;
      quoteText.style.opacity = 0;

      setTimeout(() => {
        quoteImg.src = newSrc;
        quoteImg.style.opacity = 1;
        if (newQuote) quoteText.textContent = newQuote;
        quoteText.style.opacity = 1;
      }, 200);
    };
  });
});


// === GNB 드롭다운 (안정 & 세련된 GSAP 버전) ===

// 먼저 GSAP이 로드되어 있는지 확인
if (typeof gsap === "undefined") {
  console.error("⚠️ GSAP이 로드되지 않았습니다. index.html의 body 끝에 CDN을 추가하세요:");
  console.warn('<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>');
}

// 모든 메뉴 항목 순회
document.querySelectorAll(".menu-item").forEach((li) => {
  const panel = li.querySelector(".dropdown-panel");
  if (!panel) return; // 서브 메뉴 없는 경우 패스

  // 초기 상태 숨김
  gsap.set(panel, { height: 0, autoAlpha: 0, overflow: "hidden" });

  // hover 시 드롭다운 열기
  li.addEventListener("mouseenter", () => {
    // 다른 메뉴 닫기
    document.querySelectorAll(".menu-item .dropdown-panel").forEach((p) => {
      if (p !== panel) {
        gsap.to(p, {
          height: 0,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });

    // 현재 메뉴 열기
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      height: "auto",
      autoAlpha: 1,
      duration: 0.45,
      ease: "power3.out",
      onStart: () => {
        panel.style.overflow = "visible";
      },
    });
  });

  // 마우스가 벗어났을 때 닫기
  li.addEventListener("mouseleave", () => {
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      height: 0,
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => {
        panel.style.overflow = "hidden";
      },
    });
  });
});

// 전체 네비게이션에서 벗어나면 모든 메뉴 닫기
const nav = document.querySelector(".main-nav");
if (nav) {
  nav.addEventListener("mouseleave", () => {
    document.querySelectorAll(".dropdown-panel").forEach((panel) => {
      gsap.to(panel, {
        height: 0,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          panel.style.overflow = "hidden";
        },
      });
    });
  });
}


// === GSAP 드롭다운 복구용 안정 버전 ===
document.querySelectorAll(".menu-item").forEach(li => {
  const panel = li.querySelector(".dropdown-panel");
  if (!panel) return;

  // 초기 상태
  gsap.set(panel, { height: 0, autoAlpha: 0, overflow: "hidden", display: "block" });

  // hover 시 열기
  li.addEventListener("mouseenter", () => {
    // 다른 메뉴 닫기
    document.querySelectorAll(".dropdown-panel").forEach(p => {
      if (p !== panel) {
        gsap.to(p, {
          height: 0,
          autoAlpha: 0,
          duration: 0,
          ease: "power2.inOut"
        });
      }
    });

    // 현재 메뉴 열기
    const h = panel.scrollHeight;
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      height: h,
      autoAlpha: 1,
      duration: 0,
      ease: "power3.out",
      onStart: () => (panel.style.overflow = "visible")
    });
  });

  // 마우스 벗어나면 닫기
  li.addEventListener("mouseleave", () => {
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      height: 0,
      autoAlpha: 0,
      duration: 0.1,
      ease: "power2.inOut",
      onComplete: () => (panel.style.overflow = "hidden")
    });
  });
});

// === 스크롤 시 헤더 그림자 효과 ===
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});



// === GSAP 전역 섹션 모션 ===
window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  // HEADER & SIDENAV
  gsap.from(".site-header", { y: -60, opacity: 0, duration: 0.8, ease: "power3.out" });
  gsap.from(".side-nav", { x: -40, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });

  // NEWS SECTION
  gsap.from(".section1 .main, .section1 .side > *", {
    scrollTrigger: {
      trigger: ".section1",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true
    },
    y: 70,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.15
  });

  // CULTURE SECTION
  gsap.from("#culture .text-block", {
    scrollTrigger: { trigger: "#culture", start: "top 80%", once: true },
    x: -60,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out"
  });
  gsap.from("#culture .image-block", {
    scrollTrigger: { trigger: "#culture", start: "top 80%", once: true },
    x: 60,
    opacity: 0,
    duration: 0.9,
    delay: 0.2,
    ease: "power3.out"
  });

  // BUSINESS SECTION
  gsap.from("#business .business-left", {
    scrollTrigger: { trigger: "#business", start: "top 85%", once: true },
    x: -70,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
  gsap.from("#business .business-images img.active", {
    scrollTrigger: { trigger: "#business", start: "top 85%", once: true },
    scale: 1.15,
    opacity: 0,
    duration: 1.1,
    delay: 0.3,
    ease: "power3.out"
  });

// === GUIDE 섹션 ===
window.addEventListener("load", () => {
  ScrollTrigger.refresh(true);

  const guideSection = document.querySelector("#guide");
  if (!guideSection) return;

  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger && st.trigger.id === "guide") st.kill();
  });

  // GUIDE
  gsap.from("#guide .shortcuts-grid a", {
    scrollTrigger: {
      trigger: "#guide",
      start: "top 85%",
      end: "bottom 30%",
      scrub: false,
      once: true,
      toggleActions: "play none none none",
      onEnter: () => console.log("🟠 GUIDE 섹션 트리거 작동됨"),
    },
    y: 60,
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: { each: 0.12, from: "start" },
    onStart: () => {
      gsap.to("#guide .shortcuts-grid a", {
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        duration: 0.5,
        ease: "power2.out"
      });
    },
    onComplete: () => {
      gsap.to("#guide .shortcuts-grid a", {
        boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
        duration: 0.8,
        ease: "power1.inOut"
      });
    }
  });
});


  // FOOTER
  gsap.from(".site-footer", {
    scrollTrigger: { trigger: ".site-footer", start: "top 95%", once: true },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out"
  });
});



// === SIDE NAV ACTIVE 표시 (ScrollTrigger 기반) ===
window.addEventListener("load", () => {
  const navLinks = gsap.utils.toArray(".side-nav a");

  navLinks.forEach(link => {
    const targetId = link.getAttribute("href");
    const section = document.querySelector(targetId);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActive(link),
      onEnterBack: () => setActive(link),
    });
  });

  function setActive(activeLink) {
    navLinks.forEach(l => l.classList.remove("active"));
    activeLink.classList.add("active");
  }
});
