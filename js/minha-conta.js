document.addEventListener('DOMContentLoaded', async () => {
    const mensagemBoasVindas = document.getElementById('mensagemBoasVindas');
    const informacoesUsuario = document.getElementById('informacoesUsuario');
    const logoutButton = document.getElementById('logoutButton');

    // **IMPORTANTE:** Configure a URL da sua API Go aqui.
    // Substitua 'https://sua-api-no-render.com' pela URL real da sua API no Render
    const API_BASE_URL = 'https://beck-end-oafv.onrender.com'; // ESTÁ CORRETO
    const API_PERFIL_ENDPOINT = `${API_BASE_URL}/api/perfil`; // <-- CORRIGIDO AQUI!
                                                              // Agora API_PERFIL_ENDPOINT está definida corretamente

    const authToken = localStorage.getItem('authToken'); // Pega o token armazenado

    if (!authToken) {
        alert('Você precisa fazer login para acessar esta página.');
        window.location.href = 'fazer-login.html';
        return;
    }

    // A lógica de fetchUserProfile foi integrada diretamente no bloco DOMContentLoaded
    // Não precisamos de uma função separada ou de API_REGISTRO_ENDPOINT aqui.

    try {
        const response = await fetch(API_PERFIL_ENDPOINT, { // Usamos a variável API_PERFIL_ENDPOINT
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}` // Usamos authToken, não jwtToken
            }
        });

        const data = await response.json();

        if (response.ok) {
            mensagemBoasVindas.textContent = `Bem-vindo(a), ${data.username || data.email}!`;
            informacoesUsuario.textContent = `Seu email: ${data.email || 'N/A'}`;
            // Exiba outras informações do usuário aqui, se houver
        } else {
            alert('Sua sessão expirou ou é inválida. Por favor, faça login novamente.');
            localStorage.removeItem('authToken'); // Remove o token inválido
            window.location.href = 'fazer-login.html';
        }
    } catch (error) {
        alert('Erro ao carregar dados do usuário. Verifique sua conexão.');
        console.error('Erro ao buscar perfil:', error);
    }

    // Funcionalidade de Logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        alert('Você foi desconectado(a).');
        window.location.href = 'fazer-login.html';
    });
});