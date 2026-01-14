# E-commerce Dashboard API (Express + Sequelize + MySQL)

API REST criada para a **Atividade Avaliativa – Desenvolvimento de API REST** (JWT, validação, persistência, controllers/middlewares e mínimo de endpoints) e baseada no layout do **E-commerce Dashboard Template**.

## ✅ Tecnologias
- Node.js + Express
- Sequelize + MySQL
- JWT (jsonwebtoken)
- Validação com Joi

## 📦 Pré-requisitos
- Node.js 18+
- MySQL 8+ (ou compatível)

## ⚙️ Configuração
1. Clone/extraia este projeto
2. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

3. Edite o `.env` com suas credenciais do MySQL.

4. Crie o banco (se ainda não existir):

```sql
CREATE DATABASE ecommerce_api;
```

## ▶️ Como rodar

### 1) Instalar dependências
```bash
npm install
```

### 2) Subir a API
```bash
npm run dev
```
A API sobe em `http://localhost:3000` (ou na porta do seu `.env`).

> Na primeira execução, as tabelas são criadas/ajustadas automaticamente via `sequelize.sync({ alter: true })`.

### (Opcional) Popular dados de exemplo
```bash
npm run seed
```
Cria um usuário admin e alguns produtos semelhantes aos do dashboard.

- Admin: `admin@example.com`
- Senha: `admin123`

## 🔐 Autenticação
Use o fluxo:
1. `POST /api/auth/register` ou `POST /api/auth/login`
2. Pegue o `token` retornado
3. Envie o header:

```
Authorization: Bearer <token>
```

## 🧭 Endpoints (>= 10)
Base URL: `/api`

### Health
- `GET /health`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Users (JWT)
- `GET /users` (admin)
- `GET /users/:id` (admin ou o próprio)
- `PUT /users/:id` (admin ou o próprio)
- `DELETE /users/:id` (admin ou o próprio)

### Products (JWT)
- `GET /products?search=&limit=&offset=`
- `POST /products` (admin)
- `GET /products/:id`
- `PUT /products/:id` (admin)
- `DELETE /products/:id` (admin)

### Orders (JWT)
- `GET /orders?limit=&offset=&userId=` (se não for admin, retorna só do usuário logado)
- `POST /orders`
- `GET /orders/:id`
- `PUT /orders/:id` (admin)
- `DELETE /orders/:id` (admin)

### Inquiries (JWT)
- `GET /inquiries` (admin vê todos; usuário vê só as próprias)
- `POST /inquiries`
- `GET /inquiries/:id`
- `PUT /inquiries/:id`
- `DELETE /inquiries/:id` (admin)

### Dashboard (JWT)
- `GET /dashboard/summary`
  - Retorna um resumo coerente com o dashboard: `subscribers`, `orders`, `inquiries`, `revenue`.

## 🧪 Exemplos de payload

### Register
`POST /api/auth/register`
```json
{ "name": "João", "email": "joao@email.com", "password": "123456" }
```

### Login
`POST /api/auth/login`
```json
{ "email": "admin@example.com", "password": "admin123" }
```

### Create product (admin)
`POST /api/products`
```json
{ "name": "New UI Kit", "sku": "NUK10001", "price": 9.99, "purchases": 0 }
```

### Create order
`POST /api/orders`
```json
{
  "userId": 1,
  "status": "paid",
  "currency": "USD",
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

## 📁 Estrutura
- `src/controllers` — controllers por responsabilidade
- `src/routes` — rotas por recurso
- `src/middlewares` — autenticação, validação e tratamento de erro
- `src/models` — models Sequelize + relacionamentos

---

Se quiser, eu também posso te gerar uma coleção do **Insomnia/Postman** com todas as rotas prontas.
