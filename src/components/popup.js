const openButton = document.querySelector('#open_pop_up');
const popup = document.querySelector('.pop_up');
const popupBody = document.querySelector('.pop_up_body');
const closeButton = document.querySelector('.pop_up_close');
const form = document.getElementById('form');

openButton.addEventListener('click', (event) => {
    event.preventDefault();
    popup.classList.remove('hiden');
});

closeButton.addEventListener('click', () => {
    popup.classList.add('hiden');

    form.reset();
    form.classList.remove('form-submitted');

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
            this.style.animation = 'shake 0.3s 0s 3';
        }
    });
});

// Асинхронная отправка формы с помощью fetch
form.addEventListener('submit', (event) => {
    event.preventDefault();  // Предотвращаем перезагрузку страницы

    const formData = new FormData(form);

    fetch('/send', {  // Путь к серверу без указания домена, так как всё на одном домене
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            Toastify({
                text: "Message sent successfully!",
                duration: 3000,
                backgroundColor: "#4CAF50",
            }).showToast();
            form.reset();  // Очистить форму
        } else {
            Toastify({
                text: "There was an error sending the message.",
                duration: 3000,
                backgroundColor: "#f44336",
            }).showToast();
        }
    })
    .catch(error => {
        Toastify({
            text: "There was an error sending the message.",
            duration: 3000,
            backgroundColor: "#f44336",
        }).showToast();
    });
});