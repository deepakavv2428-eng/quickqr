const qrType = document.getElementById("qrType");
const inputArea = document.getElementById("inputArea");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

const qrColor = document.getElementById("qrColor");
const bgColor = document.getElementById("bgColor");

const qrContainer = document.getElementById("qrcode");
const placeholder = document.getElementById("placeholder");

let qrCode = null;


/* -----------------------------
   INPUT FIELDS
----------------------------- */

function showInputs() {

    const type = qrType.value;

    inputArea.innerHTML = "";

    if (type === "text") {

        inputArea.innerHTML = `
            <label>Text or URL</label>
            <input
                type="text"
                id="mainInput"
                placeholder="https://example.com"
            >
        `;

    }

    else if (type === "whatsapp") {

        inputArea.innerHTML = `
            <label>WhatsApp Number</label>
            <input
                type="tel"
                id="mainInput"
                placeholder="919876543210"
            >

            <label>Message</label>
            <input
                type="text"
                id="message"
                placeholder="Hello!"
            >
        `;

    }

    else if (type === "phone") {

        inputArea.innerHTML = `
            <label>Phone Number</label>
            <input
                type="tel"
                id="mainInput"
                placeholder="+919876543210"
            >
        `;

    }

    else if (type === "email") {

        inputArea.innerHTML = `
            <label>Email Address</label>
            <input
                type="email"
                id="mainInput"
                placeholder="example@email.com"
            >

            <label>Subject</label>
            <input
                type="text"
                id="subject"
                placeholder="Hello"
            >

            <label>Message</label>
            <input
                type="text"
                id="message"
                placeholder="Your message"
            >
        `;

    }

    else if (type === "wifi") {

        inputArea.innerHTML = `
            <label>Wi-Fi Name</label>
            <input
                type="text"
                id="ssid"
                placeholder="My WiFi"
            >

            <label>Password</label>
            <input
                type="password"
                id="password"
                placeholder="Password"
            >

            <label>Security</label>

            <select id="security">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
            </select>
        `;
    }
}


/* -----------------------------
   GET QR DATA
----------------------------- */

function getQRData() {

    const type = qrType.value;

    if (type === "text") {

        return document.getElementById("mainInput").value.trim();

    }

    if (type === "whatsapp") {

        const number =
            document.getElementById("mainInput").value.trim();

        const message =
            document.getElementById("message").value.trim();

        return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    }

    if (type === "phone") {

        const number =
            document.getElementById("mainInput").value.trim();

        return `tel:${number}`;

    }

    if (type === "email") {

        const email =
            document.getElementById("mainInput").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();

        return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    }

    if (type === "wifi") {

        const ssid =
            document.getElementById("ssid").value;

        const password =
            document.getElementById("password").value;

        const security =
            document.getElementById("security").value;

        return `WIFI:T:${security};S:${ssid};P:${password};;`;
    }
}


/* -----------------------------
   GENERATE QR
----------------------------- */

function generateQR() {

    const data = getQRData();

    if (!data) {

        alert("Please enter something first.");

        return;
    }

    qrContainer.innerHTML = "";

    qrCode = new QRCode(qrContainer, {

        text: data,

        width: 256,
        height: 256,

        colorDark: qrColor.value,
        colorLight: bgColor.value,

        correctLevel: QRCode.CorrectLevel.H

    });

    placeholder.style.display = "none";

    downloadBtn.style.display = "block";
}


/* -----------------------------
   DOWNLOAD
----------------------------- */

downloadBtn.addEventListener("click", function () {

    const image = qrContainer.querySelector("img");

    if (!image) {

        alert("Generate a QR code first.");

        return;
    }

    const link = document.createElement("a");

    link.href = image.src;

    link.download = "quickqr.png";

    link.click();

});


/* -----------------------------
   EVENTS
----------------------------- */

qrType.addEventListener("change", showInputs);

generateBtn.addEventListener("click", generateQR);

qrColor.addEventListener("change", function () {

    if (qrContainer.innerHTML !== "") {
        generateQR();
    }

});

bgColor.addEventListener("change", function () {

    if (qrContainer.innerHTML !== "") {
        generateQR();
    }

});


/* -----------------------------
   INITIALIZE
----------------------------- */

showInputs();

downloadBtn.style.display = "none";