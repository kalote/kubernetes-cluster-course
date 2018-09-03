## Step 2 - Creating our application as single pods

One way to deploy your application is to create pods. We will create 1 pod for each of our component (company-api, employee-api, frontend).

As the frontend needs to know the employee and company api endpoint, we will have to proceed in order:
- create the company-api pod
- expose it as a service available outside of our cluster
- create the employee-api pod
- expose it as a service available outside of our cluster
- build our frontend with the employee and company api endpoints
- create the frontend pod
- expose it as a service available outside of our cluster

By default, minikube can access dockerhub images, but not our local images. In order to fix this, we need to bind our local docker with minikube, so that it can access our local images.

#### Bind minikube docker instance and build our API images

```bash
cd kubernetes-docker-course/ # cd into the root folder
eval $(minikube docker-env) # This command will bind the local docker with minikube
docker build -t company-api:1.0.0 ../company-api # build our company-api image
docker build -t employee-api:1.0.0 ../employee-api # build our employee-api image
```

#### Running the company API

```bash
kubectl create -f pod-company.yml # This will create a pod running our company API
kubectl expose pod company-api --type=LoadBalancer # This will expose our API and make it available outside our cluster
```

#### Running the employee API

```bash
kubectl create -f pod-employee.yml # This will create a pod running our employee API
kubectl expose pod company-api --type=LoadBalancer # This will expose our API and make it available outside our cluster
```

#### Building and running the Frontend

```bash
docker build --build-arg EMPLOYEE_API=$(minikube service employee-api --url) --build-arg COMPANY_API=$(minikube service company-api --url) -t frontend:1.0.0 ../frontend # Here we are getting the API endpoint URL and feed the docker build process with it to build our frontend app
kubectl create -f pod-frontend.yml # This will create a pod running our employee API
kubectl expose pod frontend --type=LoadBalancer # This will expose our API and make it available outside our cluster
```

#### Accessing our application

```bash
minikube service frontend # This will open our application in Chrome
```