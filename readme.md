## Minikube

Minikube is a local instance of a Kubernetes cluster. It provides developer a very useful playground to start learning kubernetes commands.

### Pre-requisites

- Install Docker
- Install VirtualBox
- Install brew

### Installation

The following commands will install minikube and add it to your path, kubectl command line tool and virtualBox.

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.28.2/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
brew install kubernetes-cli
brew cask install virtualbox
```

Run minikube and verify your installation by running: 

```bash
minikube start
kubectl version
minikube status
kubectl cluster-info
```

Once the application started, you can start interacting with your kubernetes cluster. At any moment, you can launch `minikube dashboard` to access the Kubernetes dashboard.
