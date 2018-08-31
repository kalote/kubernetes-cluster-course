## Step 3 - Creating our application as deployments and statefulSets

Another way of deploying our application is to create deployments instead of pods. Deployments will gives us multiple nice features like healthCheck, deployment strategy, desired states of replicas, and control the number of replicas we want. Also, it will gives us an entrypoint for our service, which will enable load balancing.

For "Stateful" application like mongoDB, that relies on a Volume, we will create a statefulSet rather than a deployment. It will basically do the same and provide the same feature, but are here to manage distributed application.

Also, as we are creating descriptive files for our applications, we will put multiple resources per files(i.e, deployment and service).

#### Creating the company API deployment

To create a deployment you can either use the kubectl CLI, or create a yaml file. Using the "--dry-run" parameter gives you a way of testing your command before actually creating any resources. The "-o yaml" ask the kubectl command to return us the actual deployment file that will be created.

```bash
kubectl run company-api --image=company-api:1.0.0 --env="SPRING_PROFILES_ACTIVE=minikube" --env="MONGODB_HOST=mongo-0" -l env=localkube,app=company-api --replicas=1 --dry-run -o yaml
```

#### Deploying and exposing our company API deployment

After changing some values, in the yaml file, we can create our company api using the following command:

```bash
kubectl create -f company-dc.yml
```

This will create our deployment, deploy our pod, and create the service to access it.

#### Creating the employee API deployment

Same as before.

```bash
kubectl run employee-api --image=employee-api:1.0.0 --env="MONGODB_HOST=mongo-0" -l env=localkube,app=employee-api --replicas=1 --dry-run -o yaml
```

#### Deploying and exposing our employee API deployment

After changing some values, in the yaml file, we can create our employee api using the following command:

```bash
kubectl create -f employee-dc.yml
```

This will create our deployment, deploy our pod, and create the service to access it.

#### Creating the frontend deployment

Same as before, but remember to rebuild your image to point your frontend app on the correct API endpoints.

```bash
cd kubernetes-docker-course/frontend/
docker build --build-arg EMPLOYEE_API=$(minikube service employee-api --url) --build-arg COMPANY_API=$(minikube service company-api --url) -t frontend:1.0.0 .
kubectl run frontend --image=frontend:1.0.0 --env="PORT=3000" -l env=localkube,app=company-api --replicas=1 --dry-run -o yaml
```

#### Deploying and exposing our frontend

After changing some values, in the yaml file, we can create our company api using the following command:

```bash
kubectl create -f frontend-dc.yml
```

This will create our deployment, deploy our pod, and create the service to access it. You can run `minikube service frontend` to automatically open it in your default browser.

You can also try to scale up one of your deployment by running `kubectl scale deployment/company-api --replicas=2`