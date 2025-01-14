document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Функция для проверки, является ли устройство сенсорным
  const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  // Если устройство не сенсорное, добавляем анимацию
  if (!isTouchDevice()) {
      document.querySelectorAll(".portfolio-card").forEach((item) => {
          const tl = gsap.timeline({
              scrollTrigger: {
                  trigger: item,
                  start: "center 85%",
                  end: "center 20%",
                  scrub: true,
                  invalidateOnRefresh: true,
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
  }

  // Создание ScrollTrigger для анимации градиента
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

  if (window.scrollY > 10 && !header.classList.contains(active_class)) {
      header.classList.add(active_class);
  } else if (window.scrollY <= 10 && header.classList.contains(active_class)) {
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

// Смена темы
const toggleTheme = () => {
  const htmlElement = document.documentElement; // Получаем элемент <html>
  const isDarkMode = htmlElement.classList.contains('darkmode'); // Проверяем, активна ли темная тема

  // Переключаем класс .darkmode
  if (isDarkMode) {
      htmlElement.classList.remove('darkmode');
  } else {
      htmlElement.classList.add('darkmode');
  }

  // Сохраняем выбранную тему в localStorage
  localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
};

// Восстанавливаем выбранную тему при загрузке страницы
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.documentElement.classList.add('darkmode');
}

document.querySelector('#theme-switch').addEventListener('click', toggleTheme);