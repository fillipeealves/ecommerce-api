## Identificação
Projeto: E-commerce Dashboard API  
Disciplina: Desenvolvimento de API REST  

---

## Descrição do Projeto
API REST desenvolvida para um sistema de E-commerce, permitindo o gerenciamento de usuários, produtos, pedidos e consultas, além de fornecer dados para um dashboard administrativo.

O projeto utiliza autenticação JWT e persistência em banco de dados MySQL.

---

## Design de Referência (Figma)
https://www.figma.com/design/mfhajk2WVwiFd7zYopP4YN/E-commerce-Dashboard-Template--Community-?node-id=2-2&p=f&t=labiWC3Fx6Qfzvc9-0

---

## Tecnologias Utilizadas
- Node.js
- Express
- MySQL (XAMPP)
- Sequelize
- JWT

---

## Como Executar o Projeto

### 1. Iniciar o XAMPP
Inicie os serviços Apache e MySQL.

### 2. Criar o banco de dados
```sql
CREATE DATABASE ecommerce_api;
```

### 3. Criar usuário do banco
```sql
CREATE USER IF NOT EXISTS 'ecom'@'localhost' IDENTIFIED BY 'ecom123';
GRANT ALL PRIVILEGES ON ecommerce_api.* TO 'ecom'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Configurar o arquivo .env
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecommerce_api
DB_USER=ecom
DB_PASS=ecom123
JWT_SECRET=supersecret123
PORT=3000
```

### 5. Instalar dependências
```bash
npm install
```

### 6. Executar o projeto
```bash
npm run dev
```

A API estará disponível em:
http://localhost:3000/api

---

## Observações
Projeto desenvolvido para fins acadêmicos.
