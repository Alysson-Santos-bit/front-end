
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const mensagemErroLogin = document.getElementById('mensagemErroLogin');

     // **IMPORTANTE:** Configure a URL da sua API Go aqui.
// Substitua 'https://sua-api-no-render.com' pela URL real da sua API no Render
const API_BASE_URL = 'https://beck-end-oafv.onrender.com'; // <--- ATUALIZE AQUI!
const API_LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`; // Este é o endpoint correto para login

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        mensagemErroLogin.textContent = '';

        const usernameOrEmail = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch(API_LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameOrEmail, // ou 'email' dependendo de como sua API aceita
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) { // Status 2xx
                // **Assumindo que sua API Go retorna um token JWT na resposta (ex: { "token": "seu.jwt.aqui" })**
                const authToken = data.token;
                if (authToken) {
                    localStorage.setItem('authToken', authToken); // Armazena o token no localStorage
                    alert('Login bem-sucedido! Redirecionando para a sua conta...');
                    window.location.href = 'minha-conta.html'; // Redireciona para a página da conta
                } else {
                    mensagemErroLogin.textContent = 'Erro: Token de autenticação não recebido.';
                }
            } else {
                // Ex: Senha incorreta, usuário não encontrado (status 401, 404)
                mensagemErroLogin.textContent = data.message || 'Credenciais inválidas. Verifique seu nome de usuário/email e senha.';
                console.error('Erro da API:', data.message);
            }
        } catch (error) {
            mensagemErroLogin.textContent = 'Erro de conexão com o servidor. Tente novamente.';
            console.error('Erro na requisição:', error);
        }
    });
});