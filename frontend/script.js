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

document.addEventListener('DOMContentLoaded', function() {
    const greetButton = document.getElementById('greetButton');
    const nameInput = document.getElementById('nameInput');
    const resultDiv = document.getElementById('greetResult');

    greetButton.addEventListener('click', greetUser);
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            greetUser();
        }
    });

    async function greetUser() {
        const name = nameInput.value.trim();
        
        if (!name) {
            showResult("Por favor, ingresa tu nombre", true);
            return;
        }

        try {
            const response = await fetch(`/api/greet?name=${encodeURIComponent(name)}`);
            
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }
            
            const data = await response.json(); 
            showResult(data.message, false); 
        } catch (error) {
            showResult(`Error al obtener el saludo: ${error.message}`, true);
        }
    }

    function showResult(message, isError) {
        resultDiv.textContent = message;
        resultDiv.style.display = "block";
        resultDiv.className = isError ? "greet-error" : "greet-success";
    }
});z