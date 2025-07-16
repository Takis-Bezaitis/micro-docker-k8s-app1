# 🧭 Deployment Guide

This document explains how to deploy your microservices app using two common industry-standard approaches:

- [Render Deployment (using Docker)](#render-deployment-using-docker)
- [Kubernetes Deployment (via GitHub Actions)](#kubernetes-deployment-via-github-actions)

---

## ✅ Render Deployment (Using Docker)

### When to Use

Render is great for fast deployments without needing to manage infrastructure. It automatically builds and deploys your app from your GitHub repo.

### Steps

1. **Create a Render Account**

   - Visit [https://render.com](https://render.com) and sign up.

2. **Create a Web Service**

   - Connect your GitHub repo
   - Choose the **Docker environment**
   - Select the Dockerfile path (e.g., `backend/artist-service/Dockerfile`)
   - Leave Build & Start command blank (Render uses Dockerfile)

3. **Add Environment Variables**

   - Set secrets like `MONGODB_URI` in the Render dashboard

4. **Deploy**

   - Render builds and deploys the container
   - You’ll get a public URL like: `https://your-service.onrender.com`

5. **Subsequent Deployments**

   - On every `git push`, Render auto-deploys changes

### Optional: Remove GitHub Actions Deployment

If using Render, you can remove the `deploy:` job from `.github/workflows/ci.yml`

```yaml
# deploy:
#   needs: build-and-test
#   ...
```

---

## ✅ Kubernetes Deployment (via GitHub Actions)

### Requirements

To deploy via Kubernetes, you will need:

- A Kubernetes cluster (e.g., GKE, EKS, DigitalOcean Kubernetes, etc.)
- A GitHub Secret containing the `kubeconfig` file or service account JSON
- DockerHub or GitHub Container Registry (optional)
- Kubernetes YAML manifests (already created in `k8s/` folder)

### Sample GitHub Actions Job

```yaml
deploy:
  needs: build-and-test
  runs-on: ubuntu-latest
  environment:
    name: production
    # url: https://your-production-url.com

  steps:
    - name: ⬇️ Checkout code
      uses: actions/checkout@v4

    - name: 🧰 Set up kubectl
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.29.0'

    - name: 🔐 Configure kubeconfig
      run: |
        echo "${{ secrets.KUBECONFIG_PROD }}" > $HOME/.kube/config

    - name: 🚀 Apply Kubernetes manifests
      run: |
        kubectl apply -f k8s/
```

### Optional: Build and Push Docker Image

If you need to push images:

```yaml
    - name: 🔐 Login to DockerHub
      run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin

    - name: 🐫 Build and Push Docker image
      run: |
        docker build -t your-user/artist-service:latest ./backend/artist-service
        docker push your-user/artist-service:latest
```

Update your Kubernetes YAML to reference the pushed image.

---

## ✅ Summary Table

| Deployment Option      | Infra Needed                 | Trigger        |
| ---------------------- | ---------------------------- | -------------- |
| **Render (Docker)**    | Render account only          | GitHub push    |
| **Kubernetes (CI/CD)** | k8s cluster + GitHub secrets | GitHub Actions |

---

## 📁 Suggested Folder Structure

```
project-root/
├── backend/
│   ├── artist-service/
│   └── album-service/
├── k8s/
│   ├── mongo-deployment.yaml
│   ├── artist-service-deployment.yaml
│   └── album-service-deployment.yaml
├── .github/
│   └── workflows/
│       └── ci.yml
├── docs/
│   └── deployment-guide.md   <-- You are here
```

---

Feel free to update this file with additional environments or cloud providers as you scale your application.

