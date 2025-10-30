document.addEventListener('DOMContentLoaded', () => {
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
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlayMenu.classList.contains('is-open')) {
            toggleMenu(false);
        }
    });

    const sideLinks = document.querySelectorAll('.side-nav .side-link');
    const sections = Array.from(sideLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(Boolean);

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
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        });

        sections.forEach(section => observer.observe(section));
    }

    sideLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

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

    const tabs = document.querySelectorAll('.business-tabs .tab');
    const images = document.querySelectorAll('.biz-img');

    images.forEach(img => {
        img.classList.toggle('active', img.dataset.tab === 'talent');
    });
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === 'talent');
    });

    tabs.forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            const tabName = tab.dataset.tab;
            images.forEach(img => {
                img.classList.toggle('active', img.dataset.tab === tabName);
            });
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});

const quoteImage = document.querySelector(".image-block.with-quote img");
const links = document.querySelectorAll(".icon-links a");
let fadeTimer;

links.forEach(link => {
  link.addEventListener("mouseenter", e => {
    const newSrc = e.currentTarget.dataset.img;
    if (!newSrc || quoteImage.src.includes(newSrc)) return;

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

const quoteBlock = document.querySelector(".image-block.with-quote");
const quoteImg = quoteBlock.querySelector("img");
const quoteText = quoteBlock.querySelector(".quote-overlay p");

document.querySelectorAll(".icon-links a").forEach(link => {
  link.addEventListener("mouseenter", e => {
    const newSrc = e.currentTarget.dataset.img;
    const newQuote = e.currentTarget.dataset.quote;
    if (!newSrc || quoteImg.src.includes(newSrc)) return;

    const preload = new Image();
    preload.src = newSrc;

    preload.onload = () => {
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



if (typeof gsap === "undefined") {
  console.error("⚠️ GSAP이 로드되지 않았습니다. index.html의 body 끝에 CDN을 추가하세요:");
  console.warn('<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>');
}

document.querySelectorAll(".menu-item").forEach((li) => {
  const panel = li.querySelector(".dropdown-panel");
  if (!panel) return;

  gsap.set(panel, { height: 0, autoAlpha: 0, overflow: "hidden" });

  li.addEventListener("mouseenter", () => {
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

// nav
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


// menu
document.querySelectorAll(".menu-item").forEach(li => {
  const panel = li.querySelector(".dropdown-panel");
  if (!panel) return;

  gsap.set(panel, { height: 0, autoAlpha: 0, overflow: "hidden", display: "block" });

  li.addEventListener("mouseenter", () => {
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

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});



// 헤더
window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".site-header", { y: -60, opacity: 0, duration: 0.8, ease: "power3.out" });
  gsap.from(".side-nav", { x: -40, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });

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



// SIDE NAV ACTIVE
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
