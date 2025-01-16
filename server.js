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

app.post('/send', async (req, res) => {
    const { fname, lname, email, tel, describtion } = req.body;

    try {
        await transporter.sendMail({
            from: `${email}`,
            to: process.env.EMAIL_USER,
            subject: 'New job enquiry',
            text: `
Имя: ${fname} ${lname}
Email: ${email}
Телефон: ${tel || 'Null'}
Описание: ${describtion}`,
        });

        res.send('The message was sent successfully');
    } catch (error) {
        console.error('Submit error:', error);
        res.status(500).send('Submit error.');
    }
});

// Запуск сервера на порту 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.PORT || 'http://localhost:443'}`);
});