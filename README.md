# HelpDesk Laboratório

Sistema de HelpDesk para controle de chamados em laboratório de informática.  
Projeto didático para a disciplina de **Implantação de Sistemas**.

---

## 📌 Funcionalidades
- Registro de usuários (alunos/professores e técnicos).
- Abertura de chamados com título, descrição, prioridade e categoria.
- Fluxo do chamado: **Aberto → Em andamento → Concluído**.
- Painel do usuário: visualizar apenas seus chamados.
- Painel do técnico: visualizar todos os chamados, filtrar e atualizar status.
- Relatórios simples (em fase posterior).

---

## 🏗️ Arquitetura
- **Banco**: PostgreSQL (pode usar [Supabase](https://supabase.com/))
- **Backend**: Node.js + Express + Sequelize + JWT
- **Frontend**: React + Vite + Tailwind
- **Deploy sugerido**:  
  - Backend → [Render](https://render.com/)  
  - Frontend → [Vercel](https://vercel.com/)  
  - Banco → Supabase  

---