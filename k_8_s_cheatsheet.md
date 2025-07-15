# 🐳 Kubernetes + Docker Cheat Sheet

This cheat sheet outlines the steps for building Docker images and deploying services to a Kubernetes cluster.

---

## 📦 1. After Editing Code (Backend)

### If you made changes to backend code:

```bash
# Navigate to the backend service folder
cd backend/artist-service

# Rebuild the Docker image (default tag is 'latest')
docker build -t artist-service .

# (Optional) Tag explicitly as 'latest' (same as above)
docker build -t artist-service:latest .


# (Optional) Run locally to test it before pushing to Kubernetes
# Not useful without environment variables:
# docker run -p 5001:5001 artist-service

# Run service container with env vars loaded from .env
# Use this to verify the service works before deploying to Kubernetes
docker run -p 5001:5001 --env-file .env artist-service

```

---

## ☘️ 2. Apply Kubernetes Files

### If you changed `.yaml` files or want to (re)deploy your service:

```bash
# From the project root
kubectl apply -f k8s/artist-env-secret.yaml
kubectl apply -f k8s/artist-service-deployment.yaml
```

---

## 🧹 3. Cleanup (If Needed)

```bash
# Delete the running pod (Kubernetes will recreate it automatically)
kubectl delete pod -l app=artist-service
```

---

## 📋 4. Check Pod Status and Logs

```bash
kubectl get pods
kubectl logs <pod-name>

# The following command will show why it's stuck in Pending — often under Events near the bottom.
kubectl describe pod <pod-name>
```

> Replace `<pod-name>` with the name of the pod (e.g. `artist-service-xxxxx`)

---

## 🚪 5. Access the Service (via Port Forward)

```bash
kubectl port-forward service/artist-service 5001:5001
```

- Press `Ctrl + C` to stop forwarding.
- To restart it, just run the same `port-forward` command again.

---

## 📌 When to Use `docker-compose`

Use `docker-compose` only for **local development** of multiple services (e.g. backend, DB, frontend) **before moving to Kubernetes**.

```bash
# From project root
docker-compose up --build
```

---

## 📌 Notes

- `.env` files are ignored by Docker and Kubernetes. Use Kubernetes Secrets for env variables in production.
- To inspect your secret:
  ```bash
  kubectl get secret artist-env -o yaml
  ```

---

## ✅ Typical Update Flow (Code Change)

```bash
docker build -t artist-service .
kubectl apply -f k8s/artist-service-deployment.yaml
kubectl delete pod -l app=artist-service
kubectl get pods
kubectl logs <pod-name>
kubectl port-forward service/artist-service 5001:5001
```

---

## ✅ Typical Update Flow (YAML Change)

```bash
kubectl apply -f k8s/artist-env-secret.yaml
kubectl apply -f k8s/artist-service-deployment.yaml
kubectl delete pod -l app=artist-service
kubectl get pods
kubectl logs <pod-name>
kubectl port-forward service/artist-service 5001:5001
```

---

## 🎵 Add Album Service (Backend)

- Create folder: `backend/album-service`
- Add `Dockerfile`, source code, and deployment YAML:

```bash
# Build image
cd backend/album-service
docker build -t album-service .

# Apply YAMLs
kubectl apply -f k8s/album-service-deployment.yaml
kubectl apply -f k8s/album-env-secret.yaml
```

- Port forward:

```bash
kubectl port-forward service/album-service 5002:5002
```

---

## 🍃 Add MongoDB Service

- Add `k8s/mongo-deployment.yaml` and `mongo-service.yaml`

```bash
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml
```

- Update your services' `MONGODB_URI` to point to MongoDB's Kubernetes DNS: e.g., `mongodb://mongo-service:27017/your-db`

---

## 🌐 Add React Frontend

- Create folder: `frontend/react-app`
- Add `Dockerfile` for React build
- Create `k8s/frontend-deployment.yaml` and `frontend-service.yaml`

```bash
# Build React image
cd frontend/react-app
docker build -t react-frontend .

# Apply frontend YAML
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# Port forward
kubectl port-forward service/react-frontend 3000:3000
```

---

Happy coding! 🚀

