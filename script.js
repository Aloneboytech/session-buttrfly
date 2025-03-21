function generateQRCode() {
    let output = document.getElementById("output");
    output.innerHTML = "<p>Génération du QR Code...</p>";

    // Simulation d'un QR Code (Dans une vraie app, récupérer le QR via une API)
    setTimeout(() => {
        output.innerHTML = "<img src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp-session' alt='QR Code'>";
    }, 2000);
}

function generatePairCode() {
    let output = document.getElementById("output");
    let pairCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    output.innerHTML = "<p>Votre Pair Code : <strong>" + pairCode + "</strong></p>";
}
