document.addEventListener("DOMContentLoaded", function () {
    const scriptURL = "https://script.google.com/macros/s/AKfycbylLd2VdHp9s0JxOLzuvGqqSphbTbS6ERJDgsHgB3QD3zfZPXvORMszvPAxXq6g09P62w/exec";

    // Obtener listas desplegables desde Google Sheets
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            llenarDesplegable("cultivo", data.cultivo);
            llenarDesplegable("tanque", data.tanque);
            llenarDesplegable("alimento", data.alimento);
        })
        .catch(error => console.error("Error cargando las listas desplegables:", error));

    // Función para llenar un desplegable con opciones
    function llenarDesplegable(id, opciones) {
        const select = document.getElementById(id);
        select.innerHTML = ""; // Limpiar opciones previas
        opciones.forEach(opcion => {
            let option = document.createElement("option");
            option.value = opcion;
            option.textContent = opcion;
            select.appendChild(option);
        });
    }

    // Autocompletar fecha y hora actual
    let ahora = new Date();
    document.getElementById("fecha").value = ahora.toISOString().split("T")[0];
    document.getElementById("hora").value = ahora.toTimeString().split(" ")[0].slice(0, 5);

    // Manejo del envío del formulario
    document.getElementById("formulario").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita recargar la página

        let formData = new FormData(event.target);
        let jsonData = {};
        formData.forEach((value, key) => { jsonData[key] = value; });

        fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.text())
        .then(data => {
            alert("✅ Registro guardado correctamente");
            event.target.reset(); // Limpiar formulario
        })
        .catch(error => {
            console.error("❌ Error al registrar los datos:", error);
            alert("❌ Hubo un error al enviar el formulario");
        });
    });
});
