# 🚀 Render Deployment Guide for MERN Microservices with Docker & MongoDB Atlas

This guide will help you deploy your MERN microservices application (using Docker and Kubernetes locally) to **Render**, using **MongoDB Atlas** for database hosting.

---

## 📦 1. Prerequisites

- A Render account: [https://render.com](https://render.com)
- A GitHub repo for your project (Render pulls from GitHub)
- A MongoDB Atlas account and cluster

---

## 🧭 Overview

| Component     | Local (Dev)         | Production (Render)         |
| ------------- | ------------------- | --------------------------- |
| MongoDB       | Mongo Pod via YAML  | MongoDB Atlas URI           |
| Env Variables | `.env`, K8s Secrets | Defined in Render Dashboard |
| Services      | Docker + Kubernetes | Dockerfile per service      |
| Deployment    | `kubectl apply`     | GitHub + Render auto-deploy |

---

## 🧪 Local vs Production

| Environment | Use Mongo Pod | Use MongoDB Atlas | Uses Docker | Uses K8s       | Uses .env or Secrets |
| ----------- | ------------- | ----------------- | ----------- | -------------- | -------------------- |
| Local Dev   | ✅ Yes         | ✅ Optional        | ✅ Yes       | ✅ Yes          | ✅ Yes                |
| Render      | ❌ No          | ✅ Yes             | ✅ Yes       | ❌ (abstracted) | ✅ Yes                |

---

## 🧰 2. MongoDB Atlas Setup

1. Create a MongoDB cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create two databases:
   - `artist-service-db`
   - `album-service-db`
3. Add a database user (username/password)
4. Whitelist your IP or allow all IPs for dev purposes
5. Get your connection strings:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/artist-service-db
```

---

## 🔐 3. Environment Variables

In each service, define these env variables via Render's dashboard:

**artist-service**:

```env
PORT=5001
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/artist-service-db
```

**album-service**:

```env
PORT=5002
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/album-service-db
```

> ⚠️ Do NOT include `.env` files in your repo. Add `*.env` to `.gitignore`.

---

## 🐳 4. Dockerfile (Per Service)

Each service (e.g., `artist-service`, `album-service`) should have a `Dockerfile`. Example:

```dockerfile
# Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

## 📁 5. Project Structure

```
root/
├── artist-service/
│   ├── Dockerfile
│   ├── src/
├── album-service/
│   ├── Dockerfile
├── frontend/
│   ├── Dockerfile
├── .github/workflows/ci.yml (optional CI setup)
```

---

## 🌐 6. Deploy to Render

### 🌀 Option A: Deploy Each Service as a Web Service

1. Go to Render > New Web Service
2. Connect to GitHub Repo
3. Select root directory of each service
4. Set environment variables
5. Choose build and start commands:

```bash
# Build Command
npm install

# Start Command
npm start
```

### ⚙️ Option B: Deploy Monorepo with Multiple Services

Use a single repo and deploy multiple Render Web Services pointing to subdirectories.

---

## ✅ Final Checklist

-

---

## 🧾 Bonus: CI/CD with GitHub Actions

Create `.github/workflows/ci.yml` (optional for testing builds)

```yaml
name: CI Build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install Dependencies
        run: npm install
```

---

Let me know if you want a Render-specific YAML or auto-deploy setup.

