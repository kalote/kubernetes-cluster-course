## Step 5 - Automating our docker build and deployment

In this part, we are going to use VSTS to automate our build and deployment process (known as CI/CD). Eventhough we don't have any test for our application, the goal is to use VSTS to automatically build our docker image and trigger the deployment on our AKS cluster on every push to our github repository.

Let's get started!

#### Create an account on Visual Studio Team Services

- Go to the [VSTS website](https://visualstudio.microsoft.com/fr/team-services/) and create an account by clicking on "Get started for free". 
- Create a (private) project, and then head to the "Build & release" tab (left menu).

#### Create a new pipeline build

- Click "New pipeline" and follow the wizard
- This will create a "build" pipeline that will trigger on each push, and it will also create the associated "vsts-ci.yml" file in your repository
- See the "vsts-ci.yml" file in this folder

#### push to your private docker registry from VSTS

First thing is to get a password:
- Login in azure portal
- Go to Container registries
- Select your registry and click on "Access Keys"
- set Admin user to "enable"
- Copy the password

Then, let's add the variable in our build:
- Go in your "Builds" on the left menu and click on "edit" and select your build pipeline
- Click on "Edit"
- Go to the "variable" tab and click on "+ add"
- Enter "dockerPassword" in the name field and paste your docker password in the value (also click on the lock next to the value field to make it a password field)

You can now trigger a build and it should work.