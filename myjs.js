document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".portfolio-card").forEach((item) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "center 85%",
                end: "center 20%",
                scrub: true,
            },
        });

        tl.to(item, {
            scale: 1.1,
            ease: "none",
        }).to(item, {
            scale: 1.0,
            ease: "none",
        });
    });
    
    

    gsap.registerPlugin(ScrollTrigger);
    
    document.querySelectorAll(".portfolio-card").forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "center 80%",
        end: "center 25%",
        onEnter: () => item.classList.add("animate-gradient"),
        onEnterBack: () => item.classList.add("animate-gradient"),
        onLeave: () => item.classList.remove("animate-gradient"),
        onLeaveBack: () => item.classList.remove("animate-gradient"),
      });
    });
});

// Header

window.addEventListener("scroll", () => {
    const header = document.getElementsByClassName("header")[0];
    const active_class = "is-scrolled";

    if (window.scrollY > 10) {
        header.classList.add(active_class);
    } else {
        header.classList.remove(active_class);
    }
});

// Nav Menu

// Получаем все элементы
const menuLinks = document.querySelectorAll('.header-menu-link');
const sections = document.querySelectorAll('section');

// Обработчик для клика по меню
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    updateActiveState(link.getAttribute('href').substring(1));
  });
});

// Обработчик для скролла
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });
  
  updateActiveState(current);
});

function updateActiveState(sectionId) {
  menuLinks.forEach(link => {
    link.parentElement.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.parentElement.classList.add('active');
    }
  });
}
