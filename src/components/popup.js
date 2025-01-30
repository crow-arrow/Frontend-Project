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


app.post('/send', async (req, res) => {
    console.log(req.body); // Выводим данные в консоль для проверки

    const { fname, lname, email, tel, description } = req.body;

    try {
        await transporter.sendMail({
            from: `"${fname} ${lname}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'New job enquiry',
            text: `
Имя: ${fname} ${lname}
Email: ${email}
Телефон: ${tel || 'Null'}
Описание: ${description}`,
        });

        res.send('The message was sent successfully');
    } catch (error) {
        console.error('Submit error:', error);
        res.status(500).send('Submit error.');
    }
});