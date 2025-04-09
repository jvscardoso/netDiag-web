# NetDiag - Frontend

Interface web para visualização e análise de diagnósticos de rede.  

## 🧠 Sobre o projeto

Este frontend foi desenvolvido em **React + Vite**, com foco em performance, design responsivo e boas práticas de autenticação, controle de acesso e visualização de dados.  
Permite ao usuário:

- Visualizar diagnósticos em tabela paginada
- Filtrar dados por cidade, estado, latência e outros critérios
- Alternar entre visualização em tabela e gráficos agregados
- Gerenciar usuários (admins)
- Autenticar e manter sessão via JWT

## 🛠️ Tecnologias utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI (MUI)](https://mui.com/)
- [ApexCharts](https://apexcharts.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [JWT](https://jwt.io/)

## 📦 Instalação

Antes de iniciar, certifique-se de que o **backend** da aplicação esteja rodando (porta padrão: `5000`).

1. Clone o repositório:
   ```bash
   git clone https://github.com/jvscardoso/netDiag-web.git
   cd netDiag-web
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com a seguinte variável (opcional):
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

   Se não informado, será usada a URL padrão local.

4. Rode a aplicação:
   ```bash
   npm run dev
   ```

   Acesse: [http://localhost:5173](http://localhost:5173)


## 🔑 Credenciais

>email: admin@netdiag.io

>email: user@netdiag.io

>email: analyst@netdiag.io

Todos os usuários usam a senha 'admin123'

**Desenvolvido por [João Vitor Cardoso]**
