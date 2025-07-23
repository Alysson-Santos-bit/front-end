
document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const mensagemErro = document.getElementById('mensagemErro');

    // **IMPORTANTE:** Configure a URL da sua API Go aqui.
// Substitua 'https://sua-api-no-render.com' pela URL real da sua API no Render
const API_BASE_URL = 'https://beck-end-oafv.onrender.com'; // <--- ATUALIZE AQUI!
const API_REGISTRO_ENDPOINT = `${API_BASE_URL}/auth/register`; // ou /auth/login, /api/perfil
 

    registroForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        mensagemErro.textContent = ''; // Limpa mensagens de erro anteriores

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(API_REGISTRO_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indicamos que estamos enviando JSON
                },
                body: JSON.stringify({ // Convertemos os dados para JSON
                    username: username,
                    email: email,
                    password: password
                })
            });

            const data = await response.json(); // Analisa a resposta JSON da API

            if (response.ok) { // Status 2xx (200, 201, etc.)
                alert('Conta criada com sucesso! Redirecionando para a página de login...');
                window.location.href = 'fazer-login.html'; // Redireciona para a próxima página
            } else {
                // Se a API Go retornar um erro (ex: status 400, 409)
                mensagemErro.textContent = data.message || 'Erro ao criar conta. Por favor, tente novamente.';
                console.error('Erro da API:', data.message);
            }
        } catch (error) {
            // Erros de rede ou outros problemas na requisição
            mensagemErro.textContent = 'Erro de conexão com o servidor. Verifique sua rede ou tente mais tarde.';
            console.error('Erro na requisição:', error);
        }
    });
});
