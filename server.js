require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 443;

// Мидлвэр для парсинга JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Обработчик формы отправки данных
app.post('/send', async (req, res) => {
    console.log(req.body);  // Проверяем данные, которые пришли на сервер

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

        res.send('Message sent successfully');
    } catch (error) {
        console.error('Submit error:', error);
        res.status(500).send('Submit error.');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});