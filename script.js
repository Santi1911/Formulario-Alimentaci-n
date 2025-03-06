document.addEventListener("DOMContentLoaded", function () {
    fetch("https://script.google.com/macros/s/AKfycbylLd2VdHp9s0JxOLzuvGqqSphbTbS6ERJDgsHgB3QD3zfZPXvORMszvPAxXq6g09P62w/exec")
        .then(response => response.json())
        .then(data => {
            console.log("Datos recibidos:", data);

            llenarSelect("cultivo", data.cultivo);
            llenarSelect("tanque", data.tanque);
            llenarSelect("alimento", data.alimento);
        })
        .catch(error => console.error("Error al obtener datos:", error));
});

function llenarSelect(id, opciones) {
    let select = document.getElementById(id);
    if (!select) return; // Si no existe el select, salir

    select.innerHTML = ""; // Limpiar opciones anteriores

    opciones.forEach(item => {
        let option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });

    console.log(`Opciones agregadas a ${id}:`, select.innerHTML);
}
