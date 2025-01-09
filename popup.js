const openButton = document.querySelector('#open_pop_up');
const popup = document.querySelector('.pop_up');
const popupBody = document.querySelector('.pop_up_body');
const closeButton = document.querySelector('.pop_up_close'); 

const downloadButton = document.querySelector('#downloadCV');

openButton.addEventListener('click', (event) => {
    event.preventDefault();
    popup.classList.remove('hiden');
});

closeButton.addEventListener('click', () => {
    popup.classList.add('hiden');
});

// popup.addEventListener('click', (event) => {
//     if (event.target === popupBody) {
//         popup.classList.add('hiden');
//     }
// });

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = './images/pdf/Lebenslauf.pdf';
    link.download = 'Lebenslauf.pdf';
    link.click();
});

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    this.classList.add('form-submitted');
});

// Дополнительно для обработки потери фокуса
document.querySelectorAll('.textbox input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value === '') {
        this.form.classList.add('form-submitted');
        }
    });
});

document.querySelector('.pop_up_close').addEventListener('click', function() {
    document.getElementById('form').classList.remove('form-submitted');
});