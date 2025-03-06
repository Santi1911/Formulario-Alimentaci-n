document.addEventListener("DOMContentLoaded", function () {
    // 🔹 URL del script de Google Apps Script
    const scriptURL = "https://script.google.com/macros/s/AKfycbylLd2VdHp9s0JxOLzuvGqqSphbTbS6ERJDgsHgB3QD3zfZPXvORMszvPAxXq6g09P62w/exec";
    
    // 🔹 Elementos del formulario
    const form = document.getElementById("formulario");
    const mensaje = document.getElementById("mensaje");

    // 🔹 Función para enviar datos a Google Sheets
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita el envío normal del formulario

        // Captura los valores del formulario
        const datos = {
            fecha: document.getElementById("fecha").value,
            hora: document.getElementById("hora").value,
            cultivo: document.getElementById("cultivo").value,
            tanque: document.getElementById("tanque").value,
            alimento: document.getElementById("alimento").value,
            cantidad: document.getElementById("cantidad").value,
            temperatura: document.getElementById("temperatura").value,
            observaciones: document.getElementById("observaciones").value
        };

        console.log("Datos a enviar:", datos);

        // 🔹 Enviar datos con `fetch`
        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors", // 🔹 Evita errores CORS
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })
        .then(() => {
            console.log("✅ Registro enviado correctamente.");
            mensaje.innerText = "✅ Datos enviados con éxito.";
            mensaje.style.color = "green";

            // 🔹 Limpiar formulario después de enviar
            form.reset();
        })
        .catch(error => {
            console.error("❌ Error al enviar los datos:", error);
            mensaje.innerText = "❌ Error al enviar los datos.";
            mensaje.style.color = "red";
        });
    });
});

