## Step 5 - Automating our docker build and deployment

In this part, we are going to use VSTS to automate our build and deployment process (known as CI/CD). Eventhough we don't have any test for our application, the goal is to use VSTS to automatically build our docker image and trigger the deployment on our AKS cluster on every push to our github repository.

Let's get started!

#### Create an account on Visual Studio Team Services

- Go to the [VSTS website](https://visualstudio.microsoft.com/fr/team-services/) and create an account by clicking on "Get started for free". 
- Create a (private) project, and then head to the "Build & release" tab (left menu).
- Click 