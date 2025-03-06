document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = {
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        cultivo: document.getElementById("cultivo").value,
        tanque: document.getElementById("tanque").value,
        alimento: document.getElementById("alimento").value,
        cantidad: document.getElementById("cantidad").value,
        temperatura: document.getElementById("temperatura").value,
        observaciones: document.getElementById("observaciones").value
    };

    fetch("https://script.google.com/macros/s/AKfycbylLd2VdHp9s0JxOLzuvGqqSphbTbS6ERJDgsHgB3QD3zfZPXvORMszvPAxXq6g09P62w/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);
        alert("Registro guardado exitosamente.");
        document.getElementById("form").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al guardar el registro.");
    });
});
