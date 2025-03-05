document.addEventListener("DOMContentLoaded", function () {
    cargarDesplegables();

    // Autocompletar fecha y hora actuales
    let ahora = new Date();
    document.getElementById("fecha").value = ahora.toISOString().split("T")[0];
    document.getElementById("hora").value = ahora.toTimeString().slice(0, 5);

    document.getElementById("formAlimentacion").addEventListener("submit", function (e) {
        e.preventDefault();
        enviarFormulario();
    });
});

function cargarDesplegables() {
    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getOptions")
        .then(response => response.json())
        .then(data => {
            llenarSelect("cultivo", data.cultivo);
            llenarSelect("tanque", data.tanque);
            llenarSelect("alimento", data.alimento);
        });
}

function llenarSelect(id, opciones) {
    let select = document.getElementById(id);
    opciones.forEach(opcion => {
        let option = document.createElement("option");
        option.value = opcion;
        option.textContent = opcion;
        select.appendChild(option);
    });
}

function enviarFormulario() {
    let datos = {
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        cultivo: document.getElementById("cultivo").value,
        tanque: document.getElementById("tanque").value,
        alimento: document.getElementById("alimento").value,
        cantidad: document.getElementById("cantidad").value,
        temperatura: document.getElementById("temperatura").value,
        observaciones: document.getElementById("observaciones").value,
    };

    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=submit", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("mensaje").textContent = "Registro guardado correctamente.";
    })
    .catch(error => console.error("Error:", error));
}
