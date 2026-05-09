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
```

## 🔖 Layout

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/design/HIFjZqN7GXpXPLIuuREWSd/Plataforma-de-Chamados--Community-?node-id=0-1&p=f&m=dev). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

##  Acesso a REPOSITÓRIO DA API  
  

Você pode acessar o REPOSITÓRIO DA API através [DESSE LINK](https://github.com/frederico-codes/HELPDESK-API)


## 🌍 Deploy  
  

Você pode acessar o aplicativo completo (end to end) através [DESSE LINK](https://benevolent-pixie-0eb846.netlify.app/)


## 📜 Scripts

```bash
npm run dev
npm run build
npm run preview

```

## 📁 Estrutura do projeto

```
src/
  assets/
  componentes/
  contexts/
  dtos/
  hooks/
  pages/
  routes/
  services/
  utils/
```

## 🔐 Autenticação

A aplicação utiliza JWT para autenticação.

O token é armazenado no front-end e enviado automaticamente nas requisições para a API.


## :memo: Licença

Esse projeto está sob a licença MIT.

---