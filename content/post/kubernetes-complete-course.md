---
title: "Kubernetes Complete Course"
type: "post"
date: 2024-04-01T09:09:35+07:00
description: "In this tutorial, you will learn about: what kubenertes is, what problems that kubenertes can solve, what features that container orchestration tools offer.s"
keywords: ["Kubernetes Complete Course"]
categories: ["devops"]
tags: ["k8s", "kubenertes"]
image: "https://gist.github.com/assets/31009750/1b212337-e0b7-4412-9177-eb9a113fc383"
---

## Overview

🔥 What is Kubernetes 🔥
► What problems does Kubernetes solve?
► What features do container orchestration tools offer?

### What Kubenertes is?

- Open source **Container Orchestration** Tool
- Developed by **Google**
- Helps you mange **containerized applications** in different **deployment environments**: physical, virtual machine, cloud, hybrid

### What problem does Kubenertes solve?

**1st problem: The need for a container orchestration tool**

- Trend from **Monolith** to **Microservices**
- Increased usage of **containers**
- Demand for a **proper way** of **managing** those hundreds of containers

### What features do container orchestration tools offer?

- **High Availability** or no downtime
- **Scalability** or high performance
- **Disater recovery** - backup and restore

## Introduction to K8s

### Kubenertes Components

**Pod**

- Smallest unit of K8s
- Abstraction over container
- Usually 1 application per Pod
- You can run multiple applications per Pod ( bad practice)
- Each pod gets its own IP Address
- New IP Address on re-recreation

Eg: your DB container died, then k8s auto re-create and replace the dead one but it use another IP Address.

![image](https://gist.github.com/assets/31009750/63add615-23c5-4c6b-955f-55d996794f6e)

### Replication

![image](https://gist.github.com/assets/31009750/7e00771e-7632-433a-9526-8c2f104fed7d)

## Advanced Concepts

### Master Node and Worker Node in Kubernetes

Overview

![image](https://gist.github.com/assets/31009750/2b296865-7d7c-411b-bfe5-a67c57b228c7)

#### Worker Node

There are 3 processes in Worker Node

- Container Runtime ( can be docker )
- KubeProxy : Kind of virtual network
- Kubelet: connect node and container

#### Master Node

There are 4 processes in Master Node

- Api: cluster's gateway, gate keeper for authentication
- Scheduler: add/remove pods
- Controller Manager: detects cluster state changes
- ETCD: Cluster Brain, Key-Value Store

### Let's dive into practical excercises

#### Minikube

- A K8s Node in your local

![image](https://gist.github.com/assets/31009750/3ee54682-d92e-4e8f-bc03-b8389a7df721)

#### Kubetl

- CLI Tool to interact with K8s API Server

![image](https://gist.github.com/assets/31009750/487edd2d-9908-4b83-a6b9-9784e8597c0f)

You can use kubectl to interact with Cloud K8s Nodes

![image](https://gist.github.com/assets/31009750/3da768a1-314a-4237-8657-17c032373894)

### Let's install them

#### Install kubectl

If in our computer, Docker Desktop had been installed already, just enable K8s

![image](https://gist.github.com/assets/31009750/5b1e06c4-f5e4-4b86-961f-28989330f2ce)

If not, please follow k8s official doc to install on your appropriate os.

- [Install K8s tools](https://kubernetes.io/docs/tasks/tools/)

In this topic, i used MACOS, so here is the details

```sh
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/arm64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
sudo chown root: /usr/local/bin/kubectl
kubectl version --client
```

When it is ready, you can test with this command line

```sh
kubectl cluster-info
```

![image](https://gist.github.com/assets/31009750/8fd6095f-7407-4eaa-aae1-7fe862b088b1)

#### Install minikube

- [Minikube](https://minikube.sigs.k8s.io/docs/start/)

The sample will be in MACOS

```sh
brew install minikube
# remove if you don't need it anymore
brew unlink minikube
brew link minikube
```

```sh
minikube start
```

![image](https://gist.github.com/assets/31009750/46aebadc-060f-45fe-a632-719269040428)

When it's ready

![image](https://gist.github.com/assets/31009750/64331a33-ff26-48f1-a660-2a2faba4c644)

Let's run some check commands

```sh
kubectl get nodes
# and you get
minhson@NBVN-KIENTC blog.phpguru.net % kubectl get nodes
NAME       STATUS   ROLES           AGE    VERSION
minikube   Ready    control-plane   3m4s   v1.28.3
minikube status
# and
minhson@NBVN-KIENTC blog.phpguru.net % minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

And with docker desktop, you may see this

![image](https://gist.github.com/assets/31009750/7455b123-c986-4845-b104-6450f24bd30a)

## Kubectl Basic Commands

```sh
kubectl get nodes
kubectl get pod
kubectl get services
```

You don't create Pod directly, always create a deployment - abstractions over Pods

```sh
kubctl create deployment --help
# and you will see this instruction
kubectl create deployment NAME --image=image -- [COMMAND] [args...] [options]
```

Let's practice with creating a nginx deployment

```sh
kubectl create deployment k8s-nginx --image=nginx
kubectl get deployment
# and
NAME        READY   UP-TO-DATE   AVAILABLE   AGE
k8s-nginx   1/1     1            1           51s
# then
kubectl get replicaset
# and
NAME                   DESIRED   CURRENT   READY   AGE
k8s-nginx-6fcb9b44f8   1         1         1       89s
# then
kubectl get pod
# and
NAME                         READY   STATUS    RESTARTS   AGE
k8s-nginx-6fcb9b44f8-85rbz   1/1     Running   0          29s

```

Everything under deployment will be created automatically by k8s

![image](https://gist.github.com/assets/31009750/0a1c7a4a-8c5a-4418-a6d2-5e02d8d6ef6c)

Let's change nginx image version

```sh
kubectl edit deployment k8s-nginx
# then edit the image from nginx to nginx:stable-alpine3.17
# just edit like vim editor, press i to edit and save with :wq!
```

And you will see this

![image](https://gist.github.com/assets/31009750/e1c534ee-2126-4851-91e6-9f0522faff4f)

One Pod is creating while the other one is running, it will be removed soon

What about replicaset

![image](https://gist.github.com/assets/31009750/36452184-881a-4570-83ca-6583ad5403a9)

```sh
kubectl logs k8s-nginx-f57b78788-4m59z # not found
kubectl logs k8s-nginx-6fcb9b44f8-766bk # you will see the log output
```

How about delete

```sh
kubectl delete deployment k8s-nginx
```
