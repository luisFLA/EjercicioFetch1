document.addEventListener("DOMContentLoaded", function() {
    const usuariosContainer = document.getElementById("usuarios");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const backButton = document.getElementById("backButton");

    let usuariosData = [];

    async function obtenerUsuarios() {
        try {
            const respuesta = await fetch("https://api.escuelajs.co/api/v1/users");
            usuariosData = await respuesta.json();
            mostrarUsuarios(usuariosData); 
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            usuariosContainer.innerHTML = "<p class='text-center text-danger'>Error al cargar los datos.</p>";
        }
    }

    function mostrarUsuarios(usuarios, tamaño = 'normal') {
        usuariosContainer.innerHTML = "";

        if (usuarios.length === 0) {
            usuariosContainer.innerHTML = "<p class='text-center text-warning'>No se encontraron usuarios.</p>";
            return;
        }

        usuarios.forEach(usuario => {
            const userCard = document.createElement("div");
            userCard.className = `col-md-4 col-lg-3 mb-4 card-size-${tamaño}`;

            userCard.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${usuario.avatar}" class="card-img-top img-fluid" alt="Avatar">
                    <div class="card-body">
                        <h5 class="card-title">${usuario.name}</h5>
                        <p class="card-text"><strong>Email:</strong> ${usuario.email}</p>
                        <p class="card-text"><strong>Password:</strong> ${usuario.password}</p>
                    </div>
                </div>
            `;

            usuariosContainer.appendChild(userCard);
        });
    }

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();

        const usuariosFiltrados = usuariosData.filter(usuario =>
            usuario.name.toLowerCase().includes(query) || usuario.email.toLowerCase().includes(query)
        );

        mostrarUsuarios(usuariosFiltrados, 'small'); 

        backButton.style.display = 'block';
    });

    backButton.addEventListener("click", function() {
        mostrarUsuarios(usuariosData, 'normal');
        backButton.style.display = 'none'; 
    });

    obtenerUsuarios(); 
});
