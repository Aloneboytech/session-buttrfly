const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

let globalSock;

const startSession = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            globalSock = sock;
            latestQR = await QRCode.toDataURL(qr);
        }
        if (connection === 'close') {
            if (lastDisconnect.error) {
                console.log('Déconnecté, tentative de reconnexion...');
                startSession();
            }
        }
    });
};

let latestQR = '';

app.get('/generate', async (req, res) => {
    if (latestQR) {
        res.json({ qr: latestQR });
    } else {
        res.status(500).json({ error: 'QR Code non disponible' });
    }
});

app.listen(3000, () => {
    console.log('Serveur en ligne sur http://localhost:3000');
    startSession();
});
