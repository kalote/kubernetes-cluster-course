## Step 1 - Creating a Persistent Volume and Persistent Volume Claim for MongoDB

In order to run MongoDB in our local cluster, we will create a volume to persist the data. A volume is basically a USB key plugged onto the running application: if the application crashes, the data are still available in the Volume.

To be able to use a Volume in our pods, we need to:
- create the Persistent Volume: this will provisionned a specific amount of Disk on the specified storage class. On Minikube, only "manual" storage class is available (this resolves to a "HostPath", binding a part of your host computer disk into the minikube VM)
- create the Persistent Volume Claim: this will create a "request" to get a volume. This is this information that we will link into our pod.
- mount the volume in your yaml file by referencing the persistentVolumeClaim

### Command

#### Create the PV / PVC

```bash
kubectl create -f pv.yml
kubectl create -f pvc.yml
```

#### Running MongoDB

```bash
kubectl create -f mongo-pod.yml # This will create our mongoDB pod
kubectl expose pod mongo --port=27017 # Expose mongoDB inside the cluster, making it available for other pods (only available inside our cluster)
```