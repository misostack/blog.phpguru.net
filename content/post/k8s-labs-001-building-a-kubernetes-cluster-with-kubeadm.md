---
title: "K8s Labs 001 Building a Kubernetes Cluster With Kubeadm"
type: "post"
date: 2024-04-20T12:08:31+07:00
description: "This lab will allow you to practice the process of building a new Kubernetes cluster. You will be given a set of Linux servers, and you will have the opportunity to turn these servers into a functioning Kubernetes cluster. This will help you build the skills necessary to create your own Kubernetes clusters in the real world."
keywords: ["Kubernetes Complete Course"]
categories: ["devops"]
tags: ["k8s", "kubenertes"]
image: "https://gist.github.com/assets/31009750/843c3d75-01bd-429c-8a3e-e83fba3c1b54"
---

> Forehead

This lab will allow you to practice the process of building a new Kubernetes cluster. You will be given a set of Linux servers, and you will have the opportunity to turn these servers into a functioning Kubernetes cluster. This will help you build the skills necessary to create your own Kubernetes clusters in the real world.

![image](https://gist.github.com/assets/31009750/4e817cd5-9c0a-4e43-9348-485b36643d9f)

## Steps

![image](https://gist.github.com/assets/31009750/72a1fc16-7531-4ef1-a4c3-a0c3828acaa6)

## Details

```sh
cloud_user@k8s-control:~$ cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
> overlay
> br_netfilter
> EOF
```

```sh
cloud_user@k8s-control:~$ sudo modprobe overlay
```

```sh
cloud_user@k8s-control:~$ cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
> net.bridge.bridge-nf-call-iptables = 1
> net.ipv4.ip_forward = 1
> net.bridge.bridge-nf-call-ip6tables = 1
> EOF
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-ip6tables = 1
```

**apply system setting immediately**

```sh
sudo sysctl --system
```

**install containerd**

```sh
sudo apt-get update && sudo apt-get install -y containerd
```

**create container d config**

```sh
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl status containerd
```

![image](https://gist.github.com/assets/31009750/a5eb2c1c-a609-419d-be64-8c640557898f)

```sh
sudo swapoff -a
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
```

## Terminologies

1. containerd

![image](https://gist.github.com/assets/31009750/0989cf90-774c-4056-835d-e76fee6ff6a7)

## Reference

- [A CloudGuru Building a Kubernetes 1.27 Cluster with kubeadm Lab](https://learn.acloud.guru/course/82b39fac-b9f7-43d1-8f52-6a89efe5202f/learn/0959d19e-1348-407e-963a-2d9ab44b85bc/00514594-a3ea-404b-9abe-ca8520671e4b/lab/00514594-a3ea-404b-9abe-ca8520671e4b)
- [Minikube vs kubeadm vs kind vs k3s](https://www.padok.fr/en/blog/minikube-kubeadm-kind-k3s)

### Linux Commands

```sh
ls > file # write stdin to file
ls | tee file # write stdin to file and stdout(screen)
```

```sh
cloud_user@k8s-control:~$ cat <<EOF
> Hello
> World!
> echo $HOME
> EOF
Hello
World!
echo /home/cloud_user
cloud_user@k8s-control:~$
```
