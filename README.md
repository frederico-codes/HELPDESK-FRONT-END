# 💻 HelpDesk Front-end

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Interface web do sistema **HelpDesk**, desenvolvida para gerenciamento de chamados, clientes, técnicos e serviços.

---

## 📸 Preview

<p align="center">
  <img src="./src/assets/Cover%20(12).svg" width="900" />
</p>



---

## 🚀 Tecnologias utilizadas

- ⚛️ React
- 🟦 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔀 React Router
- 🌐 Axios
- 🎯 Phosphor Icons

---

## 📌 Funcionalidades

- 🔐 Login de usuários
- 👥 Controle de acesso por perfil:
  - Admin
  - Técnico
  - Cliente
- 📞 Listagem de chamados
- 🔎 Detalhamento de chamados
- 👤 Gerenciamento de clientes
- 🛠 Gerenciamento de técnicos
- 🧩 Gerenciamento de serviços
- ⚙️ Atualização de perfil
- 🖼 Upload de avatar
- 🔗 Integração com API backend

---

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000

## 🌍 Deploy

<p align="center">
  <a href="https://seu-link-deploy.com" target="_blank">
    <img src="https://img.shields.io/badge/Acessar%20Projeto-online-green?style=for-the-badge" />
  </a>
</p>

```

## 📜 Scripts

```bash
npm run dev
npm run build
npm run preview

```
## 📁 Estrutura do projeto

assets/
componentes/
contexts/
dtos/
hooks/
pages/
routes/
services/
utils/

## 🔐 Autenticação

A aplicação utiliza JWT para autenticação.

O token é armazenado no front-end e enviado automaticamente nas requisições para a API.