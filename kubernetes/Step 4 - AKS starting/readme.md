## Step 4 - Create the Azure Kubernetes Service cluster

Once everything has been setup and tested on our local machine, let's go in the cloud! This section is all about kick starting our cloud cluster in AKS.

### Create resources in Azure

First step is to register (if you haven't done it yet) on azure. Once registered, you can either use the online shell (by clicking the ">_" icon on the top of your screen), download / install the azure-cli locally (use `brew install azure-cli` if you're on mac), or use the GUI in the portal. I will choose the 2nd option as i prefered dealing with stuff in my own console.

#### Create a resource group

This is where everything related to our Kubernetes cluster will live. I chose to create this group near me, in Japan East. Select the available region / location closer to you.

```bash
az group create --name AKSCluster --location japaneast
```

#### Create the cluster

As easy as this one-liner:

```bash
az aks create --resource-group AKSCluster --name demoCluster --node-count 2 --enable-addons monitoring --generate-ssh-keys
```

This will:
- create a cluster in the resource group we created before
- name the cluster "demoCluster"
- add 2 nodes to our cluster
- enable the monitoring with "Azure Monitor container health"
- generate and copy locally the ssh keys to access our nodes

After 5-10min, you should see a JSON output. Yay, we have our cluster ready! Let's connect to it using `az aks get-credentials --resource-group AKSCluster --name demoCluster` (this will basically add the needed context in the ~/.kube/config file and apply it). 

When you're connected, you can run the following commands:
- `kubectl get nodes` to see your nodes,
- `kubectl describe nodes` to see more details about each nodes,
- `kubectl cluster-info` to see the endpoint of the different services of our cluster

#### Accessing the dashboard

Let's watch our dashboard to get a proper UI to see all the information about our cluster. Run the following command in your terminal to start port-forwarding the cluster dashboard locally:

```bash
az aks browse -g AKSCluster -n demoCluster
```

This will open a browser window with your dashboard. Unfortunately, you will see a lot of warning on the top of the screen, mainly suggesting that the service-account "kubernetes-dashboard" doesn't have the proper permission to list cluster related information. In order to fix that, we are going to:
- create a role in the cluster ("clusterRole") that can access all resources, and name it "kube-dashboard"
- create a roleBinding (which is essentially binding a clusterRole to a serviceAccount) to map our dashboard service account to the "kube-dashboard" clusterRole

```bash
kubectl create -f permission.yml
```

When this is done, you can go back in the dashboard and refresh your window. All the warning should be gone and you should see everything.

### Create an Azure Container Registry

In order to deploy our app in our AKS cluster, we need a registry. We could opt for docker hub, but I'll assume that your application is private and protected, and need a private docker registry. So let's get started.

#### Create a resource group

I prefer creating a dedicated resource group for our registry.

```bash
az group create --name AKSRegistry --location japaneast
```

#### Create the registry

In this scenario, we will create a registry with SKU Basic. As this is for demo purpose, it will be fine, but in the real world, you would prefer Standard SKU.

```bash
az acr create --resource-group AKSRegistry --name myPrivateReg --sku Basic
```

Now that the registry is created, we will push our images onto it

#### Push images to our private registry

In order to push images to a repository, you have to follow 3 steps:
- login to the docker registry
- tag the image you want to push with the name of your registry
- push the image

In order to login, we can use the following command:

```bash
az acr login --name myPrivateReg
```

Which should return "Login Succeeded". After that, we can tag our images with the name of our registry:

```bash
docker tag employee-api:1.0.0 myprivatereg.azurecr.io/employee-api:1.0
docker tag company-api:1.0.0 myprivatereg.azurecr.io/company-api:1.0
docker tag frontend:1.0.0 myprivatereg.azurecr.io/frontend:1.0
```

FInally, we can push the newly tagged images:

```bash
docker push myprivatereg.azurecr.io/employee-api:1.0
docker push myprivatereg.azurecr.io/company-api:1.0
docker push myprivatereg.azurecr.io/frontend-api:1.0
```

#### Give access to our registry from the Kubernetes cluster

The last step is to give access to our registry so that our Kubernetes cluster can access the images. 2 ways of doing so:
- Grant AKS access to our ACR (read only)
- Use a Kubernetes Secret to access it

We will choose the first method as it the simplest:

```bash
# Get the id of the service principal configured for AKS
CLIENT_ID=$(az aks show -g AKSCluster -n demoCluster --query "servicePrincipalProfile.clientId" --output tsv)

# Get the ACR registry resource id
ACR_ID=$(az acr show -n myPrivateReg -g AKSRegistry --query "id" --output tsv)

# Create role assignment
az role assignment create --assignee $CLIENT_ID --role Reader --scope $ACR_ID
```