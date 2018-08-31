# Docker / Kubernetes on Azure

Developing and deploying resilient application in the cloud has become one of the hardest challenge of our era. Of course, in order to succeed, multiple tools has emerged to facilitate the jobs of developer and DevOps: 

- Docker provides consistency across multiple environments by defining the framework for your application
- Kubernetes maintains the state of your application in a declarative way

Understanding how those tools works is essential in the current context. In this course we will set up a microservice application, running on docker containers and communicating together. We will then deploy those containers in a local Kubernetes cluster using miniKube.

Running your application locally will be the first milestone in this course. After that, we will go through deploying our own kubernetes cluster on top of the Azure Container Service. This will help us understand how to run and configure it on top of docker.

Finally we will use Azure Kubernetes service to test the fully managed service offer by Microsoft.

# Course plan

- Introduction
  - Bare metal, IaaS, PaaS, Containers: Brief History
  - Pre-requisite
  - Microservices introduction
  - Application presentation
- Docker
  - Container vs VM
  - Dockerfile
  - Cache optimization in docker
  - Running multiple containers using docker-compose
- Kubernetes
  - Pods, deployment, services: Introduction to Kubernetes Orchestration
  - Running miniKube locally
  - Deploying our application on miniKube
  - Scaling, network and secrets: deep dive into Kubernetes
- Azure
  - Running containers in Azure Container Service
  - Creating a container registry
  - Deploying a kubernetes cluster in ACS
  - Configuring a kubernetes cluster
  - Introduction to Azure Kubernetes Service
  - Creating the kubernetes cluster in AKS
  - Running the application in AKS
  - Cluster administration