const openButton = document.querySelector('#open_pop_up');
const popup = document.querySelector('.pop_up');
const popupBody = document.querySelector('.pop_up_body');
const closeButton = document.querySelector('.pop_up_close'); 
const downloadButton = document.querySelector('#downloadCV');
const form = document.getElementById('form');

openButton.addEventListener('click', (event) => {
    event.preventDefault();
    popup.classList.remove('hiden');
});

closeButton.addEventListener('click', () => {
    popup.classList.add('hiden');
    // Очистка формы и сброс состояния
    form.reset();
    form.classList.remove('form-submitted');
    // Скрытие звездочек и сброс рамки
    document.querySelectorAll('.textbox input, .textbox textarea').forEach(input => {
        input.classList.remove('invalid');
        input.style.border = '';
        const asterix = input.closest('.textbox').querySelector('.asterix');
        if (asterix) {
            asterix.style.opacity = '0';
            asterix.style.animation = 'none';
        }
    });
});

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = './images/pdf/Lebenslauf.pdf';
    link.download = 'Lebenslauf.pdf';
    link.click();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    this.classList.add('form-submitted');
});

// Дополнительно для обработки потери фокуса
document.querySelectorAll('.textbox input, .textbox textarea').forEach(input => {
    input.addEventListener('blur', function() {
        const isPhone = this.id === 'phone';
        const isEmpty = this.value.trim() === '';

        if (!isPhone && isEmpty) {
            this.classList.add('invalid');
            const asterix = this.closest('.textbox').querySelector('.asterix');
            if (asterix) {
                asterix.style.opacity = '1';
                asterix.style.animation = 'shake 0.3s 0s 3';
            }
        } else {
            this.classList.remove('invalid');
            const asterix = this.closest('.textbox').querySelector('.asterix');
            if (asterix) {
                asterix.style.opacity = '0';
                asterix.style.animation = 'none';
            }
        }

        if (this.checkValidity()) {
            this.style.border = '1px solid #26dfae'; // Зеленая рамка для валидных полей
        } else {
            this.style.border = '1px solid #df2666'; // Красная рамка для невалидных полей
        }
    });
});

document.querySelectorAll('.textbox input, .textbox textarea').forEach(input => {
    input.addEventListener('blur', function() {
        const isPhone = this.id === 'phone';
        const isEmpty = this.value.trim() === '';

        if (!isPhone && isEmpty) {
            this.classList.add('invalid');
            const asterix = this.closest('.textbox').querySelector('.asterix');
            if (asterix) {
                asterix.style.opacity = '1';
                asterix.style.animation = 'shake 0.3s 0s 3';
            }
        } else {
            this.classList.remove('invalid');
            const asterix = this.closest('.textbox').querySelector('.asterix');
            if (asterix) {
                asterix.style.opacity = '0';
                asterix.style.animation = 'none';
            }
        }

        if (this.checkValidity()) {
            this.style.border = 'none';
        } else {
            this.style.border = '1px solid #df2666';
        }
    });
});