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
