// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa os módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Cria uma instância do Express
const app = express();

// Configura o middleware para analisar os dados do corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));

// Define a rota para o envio de e-mails
app.post('/send-email', (req, res) => {
    // Extrai os dados do corpo da requisição
    const { name, email, message } = req.body;

    // Configura o transporte de e-mail usando o serviço do Gmail e as variáveis de ambiente
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Usuário do e-mail
            pass: process.env.EMAIL_PASS  // Senha do e-mail
        }
    });

    // Define as opções do e-mail
    const mailOptions = {
        from: process.env.EMAIL_USER, // E-mail do remetente
        to: process.env.EMAIL_USER, // E-mail do destinatário
        subject: 'Nova mensagem de contato!', // Assunto do e-mail
        text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}` // Corpo do e-mail
    };

    // Envia o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // Retorna uma resposta de erro se o envio falhar
            return res.status(500).send('Erro ao enviar e-mail.');
        }
        // Retorna uma resposta de sucesso se o envio for bem-sucedido
        res.send('E-mail enviado com sucesso!');
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
