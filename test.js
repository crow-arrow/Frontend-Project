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

// Добавляем CSS через JavaScript
const style = document.createElement('style');
style.textContent = `
  .header-menu-item.active ~ li:last-child:after {
    right: auto;
  }
  
  .header-menu-item:nth-child(1).active ~ li:last-child:after {
    right: 450%;
  }
  
  .header-menu-item:nth-child(2).active ~ li:last-child:after {
    right: 350%;
  }
  
  .header-menu-item:nth-child(3).active ~ li:last-child:after {
    right: 250%;
  }
  
  .header-menu-item:nth-child(4).active ~ li:last-child:after {
    right: 150%;
  }
  
  .header-menu-item:nth-child(5).active ~ li:last-child:after {
    right: 50%;
  }
`;
document.head.appendChild(style);