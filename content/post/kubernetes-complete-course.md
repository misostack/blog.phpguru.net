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

This sample is for window

```sh
winget install minikube
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

### Let's create configuration file for K8s

> nginx-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx-main
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx-main
  template:
    metadata:
      labels:
        app: nginx-main
    spec:
      containers:
        - name: nginx-main
          image: nginx:stable-alpine3.17
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: "256Mi"
              cpu: "50m"
            limits:
              memory: "512Mi"
              cpu: "200m"
```

```sh
kubectl apply -f nginx-deployment.yaml
kubectl get pod
kubectl get replicaset
kubectl get deployment
```

With this configuration file, you only need to update this file, and run apply command, k8s will take care the rest for you.

### Connecting Services to Deployments

![image](https://gist.github.com/assets/31009750/c2461820-befb-4c7d-bff9-7673abef62bc)
![image](https://gist.github.com/assets/31009750/139ea026-f9f8-4bca-9f6f-d4fb86c5da0c)

> nginx-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx-main
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080 # should match with container port
      # nodePort: 30007 # Uncomment if you want to specify the NodePort; otherwise, it's dynamically allocated.
```

```sh
kubectl apply -f nginx-service.yaml
# check status
kubectl describe service nginx-service
kubectl get pod -o wide
kubectl get deployment nginx-deployment -o yaml > nginx-deployment-result.yaml
```

### K8s command cheatsheet

> Deployment CRUD Commands

```sh
kubeclt create deployment [name]
kubeclt edit deployment [name]
kubeclt delte deployment [name]
```

> Status of different K8s components

```sh
kubectl get nodes | pod | services | replicaset | deployment
```

> Debuging pods

```sh
kubectl logs pod-name
kubectl exec -it [podname] -- bin/sh
```

> Use Configuration File

```sh
kubectl apply -f [filename] # create/update
kubectl delete -f [filename] # delete
```

### Reading K8s configuration file

1. Metadata
2. Specification
3. Status

![image](https://gist.github.com/assets/31009750/8dba9d69-99e1-499c-9d4d-f36c57129a44)

## Secret

- Create secret with command line

```sh
kubectl create secret generic mysql-root-password-secret --from-literal=mysql_root_password='yourpassword'

# from text file
kubectl create secret generic mysql-root-password-secret --from-file=mysql_root_password=mysql_root_password.txt
# verify
kubectl get secret mysql-root-password-secret
```

- If you wanna define secret in your config file, the value must be base64

```sh
# sample
echo -n '123456' | base64
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-root-password-secret
  namespace: my-namespace
type: Opaque
data:
  mysql_root_password: MTIzNDU2
```

Usage

```yaml
env:
  - name: MYSQL_ROOT_PASSWORD
    valueFrom:
      secretKeyRef:
        name: mysql-root-password-secret
        key: mysql_root_password
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-deployment
  labels:
    app: mysql-main
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql-main
  template:
    metadata:
      labels:
        app: mysql-main
    spec:
      containers:
        - name: mysql-main
          image: mysql:8.3.0
          ports:
            - containerPort: 3306
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-root-password-secret
                  key: mysql_root_password
          resources:
            requests:
              memory: "1024Mi"
              cpu: "1000m"
            limits:
              memory: "1024Mi"
              cpu: "1000m"
```

## Service

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-deployment
  labels:
    app: mysql-main
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql-main
  template:
    metadata:
      labels:
        app: mysql-main
    spec:
      containers:
        - name: mysql-main
          image: mysql:8.3.0
          ports:
            - containerPort: 3306
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-root-password-secret
                  key: mysql_root_password
          resources:
            requests:
              memory: "1024Mi"
              cpu: "1000m"
            limits:
              memory: "1024Mi"
              cpu: "1000m"
---
apiVersion: v1
kind: Service
metadata:
  name: mysql-service
spec:
  selector:
    app: mysql-main
  ports:
    - protocol: TCP
      port: 3306
      targetPort: 3306
```

You can define your service with seperated config file, but k8s support us to define it in the same file with your deployment config.
Service is something like a proxy between your pod with other service in your cluster

## Config Map

How do we connect two services? Eg: your phpmyadmin-service with your mysql-service.
Don't worry ConfigMap live for this reason

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-configmap
data:
  mysql-database-url: mysql-service
```

Usage, same as secret, but instead of getting value from secret, just get them from configmap

```yaml
env:
  - name: PMA_HOST
    valueFrom:
      configMapKeyRef:
        name: mysql-configmap
        key: mysql-database-url
```

**mysql-database-url** <==> **mysql-service**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: phpmyadmin
spec:
  selector:
    matchLabels:
      app: phpmyadmin
  template:
    metadata:
      labels:
        app: phpmyadmin
    spec:
      containers:
        - name: phpmyadmin
          image: phpmyadmin:latest
          resources:
            limits:
              memory: "512Mi"
              cpu: "500m"
          ports:
            - containerPort: 80
          env:
            - name: PMA_HOST
              valueFrom:
                configMapKeyRef:
                  name: mysql-configmap
                  key: mysql-database-url
            - name: PMA_USER
              value: root
            - name: PMA_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-root-password-secret
                  key: mysql_root_password
---
apiVersion: v1
kind: Service
metadata:
  name: phpmyadmin-service
spec:
  selector:
    app: phpmyadmin
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      # must be between 30,000-32,767
      nodePort: 30000
```

## Namespaces

### Default namespace

![image](https://gist.github.com/assets/31009750/81b2537d-6159-42ae-a61e-27df3a89ab08)

### Group resources with namespace

![image](https://gist.github.com/assets/31009750/fb6392b4-8c7d-4f25-87e6-b7f7615f565f)

### Resolve conflicts: many teams, same application, different services

![image](https://gist.github.com/assets/31009750/7148c0d3-38d5-45c9-991c-ddc6cf6d591e)

### Resource Sharing: Blue/Green Deployment

![image](https://gist.github.com/assets/31009750/e3ff0e54-25f4-40d8-ab32-62398a308b08)

### Access Resource Limits on Namespace

You can limit:

- Access
- CPU
- RAM
- Storage

> Resource Quota

![image](https://gist.github.com/assets/31009750/5333da2b-8b3b-4791-a7bd-63d065a342dc)

#### What you can't access between namespace

- Config Map
- Secret

#### What you can access between namespace

- Service: {service}.{namespace}

#### Some components which can't be created in a namespace

- Volume
- Node

```sh
kubectl api-resources --namespaced=false
```

#### Practice

```sh
kubectl create namespace my-namespace
kubectl get configmap -n=default
kubectl get configmap -n=my-namespace
kubectl apply -f mysql-configmap.yaml -n=my-namespace
kubectl get configmap -n=my-namespace
kubectl get all -n=my-namespace
kubectl delete -f mysql-configmap.yaml -n=my-namespace
kubectl delete namespace my-namespace
```

You can create a component inside a namespace with this syntax, but it is not covenient, and you can't keep track on it.

```sh
kubectl apply -f mysql-configmap.yaml -n=my-namespace
```

So it's better to determine the namespace inside config file like this.

```sh
apiVersion: v1
kind: Secret
metadata:
  name: mysql-root-password-secret
  namespace: my-namespace
type: Opaque
data:
  mysql_root_password: MTIzNDU2
```

Everytime your wanna get information about your components, you must specify your namespace.

```sh
kubectl get configmap -n=my-namespace
```

There is another tool that support you to change your active namespace called "[kubectx](https://github.com/ahmetb/kubectx/)"

On MAC

```sh
brew install kubectx
```

And then you will be provided this command "**kubens**"

```sh
# list all namespace
kubens
# change active namespace
kubens your-target-namespace
```

## Real world service deployment with Ingress

![image](https://gist.github.com/assets/31009750/d850f2fc-1334-46af-80c2-d468310ab31d)

![image](https://gist.github.com/assets/31009750/e77623d2-116c-4f03-8e43-3e6957622846)

![image](https://gist.github.com/assets/31009750/d0b7fedf-a5a8-41ff-b743-732188b94fa8)

### Architecture

![image](https://gist.github.com/assets/31009750/8aa34cb7-ad28-447d-9a60-b16243bd3ee1)

In cloud

![image](https://gist.github.com/assets/31009750/eee8f701-4515-4abb-a1e1-0ff10a3747af)

In bare metal server

![image](https://gist.github.com/assets/31009750/71f508a3-a749-4d10-a54e-797e198b6521)

### Practice

Steps

- Install ingress controller
- Setup ingress rules

- [ingress-minikube](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)

```sh
minikube addons enable ingress
```

![image](https://gist.github.com/assets/31009750/6a7278da-b335-40d1-8c9d-252752c8cea1)

```sh
kubectl get pods -n ingress-nginx
```

![image](https://gist.github.com/assets/31009750/b0e10a8c-0214-4390-b3f2-237bb8e50356)

Let's start with assign a domain to dashboard addons

Dashboard

```sh
minikube addons list | grep dashboard
# | dashboard                   | minikube | disabled     | Kubernetes                     |
minikube addons enable dashboard
kubectl get ns
kubectl get all -n kubernetes-dashboard
```

Dashboard Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: k8s-dashboard-ingress
  namespace: kubernetes-dashboard
  labels:
    name: k8s-dashboard-ingress
spec:
  rules:
    - host: dashboard.k8s-phpguru.local
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: kubernetes-dashboard
                port:
                  number: 80
```

```sh
kubectl apply -f dashboard-ingress.yaml
kubectl get ingress -n kubernetes-dashboard --watch
# then use the ipaddress, assign it with your dns to resolve the domain
# in local we'll modify /etc/hosts
sudo nano /etc/hosts
# then tunnel to keep accessible
minikube tunnel
# then open http://dashboard.k8s-phpguru.local in your browser
```

```sh
## k8s tutorial: because of using Docker Driver -> we must use this local ip address
127.0.0.1 dashboard.k8s-phpguru.local
```

And you will see this

![image](https://gist.github.com/assets/31009750/7c88d3e5-6967-4ef0-9029-0f4958c337d0)

If you have to create ssl

![image](https://gist.github.com/assets/31009750/82fbff77-406e-401d-b7f0-ff16c458e766)

### Quick test ingress and ingress-dns addons

```sh
kubectl create deployment web --image=gcr.io/google-samples/hello-app:1.0
kubectl expose deployment web --port=8080
kubectl apply -f example-ingress.yaml
```

## Helm

![image](https://gist.github.com/assets/31009750/d56d1796-e650-4e0a-8576-fbcdd9377e9a)
![image](https://gist.github.com/assets/31009750/0c6b95bf-d06f-4307-8f30-ce56fdc17ab3)

- [Helm](https://helm.sh/)

### Helm Charts - Sharing, Reusing Configuration

- You may consider it is a package manager for k8s, so you can reuse/share your configuration.

![image](https://gist.github.com/assets/31009750/d56d1796-e650-4e0a-8576-fbcdd9377e9a)
![image](https://gist.github.com/assets/31009750/0c6b95bf-d06f-4307-8f30-ce56fdc17ab3)

### Templating Engine

So instead of having multiple configuration files for similar services, you only need to define a template file and a variable file.

![image](https://gist.github.com/assets/31009750/4f78779b-bb14-4f8a-b7ee-a0f50a513564)
![image](https://gist.github.com/assets/31009750/874caf23-afa7-4673-85a7-2a280cac0d57)

Very useful for CI/CD, the main usecase is deployment your application on different env

![image](https://gist.github.com/assets/31009750/78303bbe-ded3-46e9-b150-2053d2b50c94)

### Helm Charts Structure

![image](https://gist.github.com/assets/31009750/b2ba5731-b946-4a3e-a93d-013cabbd7f14)

```sh
helm install [chart-name]
# template files will be filled with values from values.yaml
```

#### Helm v2

> Tiller

![image](https://gist.github.com/assets/31009750/48f52759-efc6-4be7-b978-4e43bc821b6a)
![image](https://gist.github.com/assets/31009750/e4a05537-dd3e-4ac8-b207-bbcd87b3fcda)

But in v3, it had been removed!!!

![image](https://gist.github.com/assets/31009750/866b583e-16c4-4d49-95c0-57c71050df7d)

### K8s Volumes

Due to the needs of data persistent, k8s provide several components to persist your data

**Storage requirements**

- Doesn't depend on the pod lifecycle
- Must be available on all nodes
- Must survive even if cluster crashes

![image](https://gist.github.com/assets/31009750/b2a94841-abf6-47e2-8286-5de2fcabb1fa)

#### Persistent Volume

- The primary component in k8s system to persist your data
- Cluster Resource
- It must be backed by physical storage in local(inside cluster) or in cloud service(network file system).
- Usually created by admin
- For Database must use cloud

![image](https://gist.github.com/assets/31009750/2c4c941d-7cc0-4ab1-8fb6-b2335c1ece29)

NFS Storage

![image](https://gist.github.com/assets/31009750/ff0965f8-ef79-4e94-953f-63cea2031064)

Local Storage

![image](https://gist.github.com/assets/31009750/299efd58-f881-4d5c-9624-87d6adf052d6)

![image](https://gist.github.com/assets/31009750/813dc8b7-72e5-4def-8112-03fb01ee99cf)

#### Persistent Volume Claim

![image](https://gist.github.com/assets/31009750/7e71d5f9-940a-4676-ac6c-9511051e9f9a)

- Abstraction of Persistent Volume
- Same namespace with Pod
- Easy to use for users(developers)

![image](https://gist.github.com/assets/31009750/9d7dd414-cbfe-45d6-84c0-19ecf23824e7)

Flow

![image](https://gist.github.com/assets/31009750/b72f8f6b-0e25-4345-b9dc-0266bdc1b588)

Example

![image](https://gist.github.com/assets/31009750/46b1be5e-12d3-4b78-b5d9-c645dc90795f)

#### Storage Class

Issue: Imagination, you have a big system, a lot of developers claim for a volume with PVC, so as admin you have to create enough PV to fullfil the needs, it can be extremely time consuming and will get messy very fast.

![image](https://gist.github.com/assets/31009750/44b45b35-c767-4953-b9fa-1d3ef41472ee)

Fortunately, k8s provide us a solution for it, named "Storage Class". What does it do?

- Provisions persistent volumes dynamically when PVC claim it
- It must be backed by a provisioner: internal(k8s)/external(another services)

Example

![image](https://gist.github.com/assets/31009750/362fcf18-78b0-4398-82f0-08f90979d9a5)

### K8s StatefulSet

#### Stateless application

A stateless process or application, however, does not retain information about the user's previous interactions. There is no stored knowledge of or reference to past transactions. Each transaction is made as if from scratch for the first time

![image](https://gist.github.com/assets/31009750/e8b3b7df-61da-4212-9321-69820e668262)

![image](https://gist.github.com/assets/31009750/6cf09454-b02b-49c6-a0bf-4d4e8f645a47)

#### Stateful Application

Stateful applications save data to persistent disk storage for use by the server, by clients, and by other applications. An example of a stateful application is a database or key-value store to which data is saved and retrieved by other applications.

#### What deployment does?

![image](https://gist.github.com/assets/31009750/eeaee8a3-540e-4486-9d77-2789d0007ab1)

#### Statefulset

![image](https://gist.github.com/assets/31009750/496a59cc-cf8f-4b98-853d-4e3659cc7120)

But why you need to pod identity is not interchangable.

To scale your database, we will use master slave mechanism

![image](https://gist.github.com/assets/31009750/f611a84f-b0e8-4e9e-a8f0-309380ecfdf7)

![image](https://gist.github.com/assets/31009750/66c82493-9502-4e06-b2b3-332dd64c7b94)

![image](https://gist.github.com/assets/31009750/31f681e7-6661-412a-bbbd-5169476c4b50)

So you have to specify which pod is master. So that pod must not be interchangable.

![image](https://gist.github.com/assets/31009750/98e51358-f9cc-407f-8dc0-e7a96cfb6671)

Also, you need to use remote storage, because local storage is usually tied to a specific node

![image](https://gist.github.com/assets/31009750/420e410f-12b1-41b9-b1de-fce7a1899fd2)

#### Conclusion

![image](https://gist.github.com/assets/31009750/898bdae1-6e8b-4fa9-bfdc-ca12cc6f1e2c)

![image](https://gist.github.com/assets/31009750/a1ca4b84-6211-4fb0-9af4-d9edb5550e97)
![image](https://gist.github.com/assets/31009750/1a34fb6c-be6c-4da2-a899-83c76ea9ce89)
![image](https://gist.github.com/assets/31009750/4366d05e-7359-4f4f-9892-e9f5d56525ad)
![image](https://gist.github.com/assets/31009750/1bd7b9bf-0b6d-4d40-91a3-f9d3d3577b3e)

### K8s Service

![image](https://gist.github.com/assets/31009750/958ae790-0a76-4d8b-acc0-85752ad6af7f)

![image](https://gist.github.com/assets/31009750/7ad1abe5-a4c8-495c-b0dd-2ca492a95cd0)

#### ClusterIP Services

![image](https://gist.github.com/assets/31009750/b707016f-62af-42bc-aeec-8eb9a907802f)

Service will select all pods that has the matched selector attribute

![image](https://gist.github.com/assets/31009750/5604649e-2c36-45d7-9e36-54ab844b4802)
![image](https://gist.github.com/assets/31009750/e61df315-5ec2-4868-9fc3-638a8c2ead5f)

Note: the service port can be arbitrary, but the targerPort must match the port that the container is listening at.

If you have multiple ports in your services, you must name it

![image](https://gist.github.com/assets/31009750/8a98c702-49e5-44d3-883e-c9f7b9856ff1)

#### Headless Services

![image](https://gist.github.com/assets/31009750/19d2222e-a194-4db1-938a-a061048b8adf)

![image](https://gist.github.com/assets/31009750/234d8351-207a-4c6f-bb48-f834b8ac7d77)

![image](https://gist.github.com/assets/31009750/bb05e2b3-f4d5-4502-8e6a-4c53090abf25)

#### NodePort Services

> For testing purpose

![image](https://gist.github.com/assets/31009750/ab9168b6-a95f-4d37-b6cc-b8e6ea655b1f)

> For external traffic, but it is secured!!!

![image](https://gist.github.com/assets/31009750/0f99175f-40f4-494f-9329-b31481ff07be)

#### LoadBalancer Services

> For Production

![image](https://gist.github.com/assets/31009750/c544e9e8-4d02-4789-9ff9-ac853c65db0d)
![image](https://gist.github.com/assets/31009750/f3216957-b937-480a-93a5-4fe777054ff9)

#### Summary Configuration

![image](https://gist.github.com/assets/31009750/5b0217c3-009c-476e-8766-abcc913f07a6)

## Terminology

### Ports

```yaml
apiVersion: v1
kind: Service
metadata:
  name: example-service
spec:
  type: NodePort
  selector:
    app: example-app
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30000
```

- **Port** (80): Other Pods within the cluster can reach the Service at example-service.<namespace>.svc.cluster.local:80.
- **TargetPort** (8080): The Service routes this internal traffic to port 8080 on the selected Pods.
- **NodePort** (30000): External traffic can access the Service by targeting http://<node-ip>:30000, which routes to port 8080 on the Pods.
