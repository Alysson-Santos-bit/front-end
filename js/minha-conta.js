
document.addEventListener('DOMContentLoaded', async () => {
    const mensagemBoasVindas = document.getElementById('mensagemBoasVindas');
    const informacoesUsuario = document.getElementById('informacoesUsuario');
    const logoutButton = document.getElementById('logoutButton');

     // **IMPORTANTE:** Configure a URL da sua API Go aqui.
// Substitua 'https://sua-api-no-render.com' pela URL real da sua API no Render
const API_BASE_URL = 'https://beck-end-oafv.onrender.com'; // <--- ATUALIZE AQUI!
const API_REGISTRO_ENDPOINT = `${API_BASE_URL}/api/perfil`; // ou /auth/login, /api/perfil
    const authToken = localStorage.getItem('authToken'); // Pega o token armazenado

    if (!authToken) {
        // Se não houver token, o usuário não está logado
        alert('Você precisa fazer login para acessar esta página.');
        window.location.href = 'fazer-login.html'; // Redireciona para o login
        return; // Sai da função
    }
    async function fetchUserProfile() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        // --- ALTERAR ESTA LINHA ---
        // const response = await fetch('http://localhost:8080/perfil', {
        const response = await fetch('http://localhost:8080/api/perfil', { // <--- CORRIGIDO A URL
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('usernameDisplay').textContent = user.username;
            document.getElementById('emailDisplay').textContent = user.email;
            // ... (resto da lógica de exibir perfil)
        } else {
            const errorData = await response.json(); // Tenta ler o erro como JSON
            console.error('Erro ao buscar perfil:', errorData.message || response.statusText);
            alert('Erro ao buscar perfil: ' + (errorData.message || 'Verifique o console para detalhes.'));
            // Opcional: Redirecionar para login se for erro de autenticação
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('jwtToken');
                window.location.href = 'login.html';
            }
        }
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        alert('Erro ao buscar perfil: ' + error.message);
    }
}
    try {
        const response = await fetch(API_PERFIL_ENDPOINT, {
            method: 'GET', // Usamos GET para buscar dados
            headers: {
                'Authorization': `Bearer ${authToken}` // Enviamos o token no cabeçalho Authorization
            }
        });

        const data = await response.json();

        if (response.ok) { // Status 2xx
            // Assumindo que sua API retorna algo como { username: "nome", email: "email@ex.com" }
            mensagemBoasVindas.textContent = `Bem-vindo(a), ${data.username || data.email}!`;
            informacoesUsuario.textContent = `Seu email: ${data.email || 'N/A'}`;
            // Você pode exibir mais informações do usuário aqui
        } else {
            // Se o token for inválido, expirado, ou outro erro de autorização (status 401, 403)
            alert('Sua sessão expirou ou é inválida. Por favor, faça login novamente.');
            localStorage.removeItem('authToken'); // Remove o token inválido
            window.location.href = 'fazer-login.html'; // Redireciona para o login
        }
    } catch (error) {
        alert('Erro ao carregar dados do usuário. Verifique sua conexão.');
        console.error('Erro ao buscar perfil:', error);
        // Opcional: Redirecionar para login em caso de erro de rede persistente
        // localStorage.removeItem('authToken');
        // window.location.href = 'fazer-login.html';
    }

    // Funcionalidade de Logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('authToken'); // Remove o token
        alert('Você foi desconectado(a).');
        window.location.href = 'fazer-login.html'; // Redireciona para o login
    });
});
