document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});
 document.getElementById("loadButton").addEventListener("click", async () => {
            const nombre = document.getElementById("nombre").value;
            const resultadoDiv = document.getElementById("greetResult");

            if (!nombre.trim()) {
                resultadoDiv.textContent = "Por favor, escribe tu nombre.";
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/greet?name=${encodeURIComponent(nombre)}`);
                const data = await response.json();
                resultadoDiv.textContent = data.message;
            } catch (error) {
                resultadoDiv.textContent = "Error al llamar al servidor.";
                console.error(error);
            }
        });
