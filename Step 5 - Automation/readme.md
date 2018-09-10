## Step 5 - Automating our docker build and deployment

In this part, we are going to use VSTS to automate our build and deployment process (known as CI/CD). Eventhough we don't have any test for our application, the goal is to use VSTS to automatically build our docker image and trigger the deployment on our AKS cluster on every push to our github repository.

Let's get started!

#### Create an account on Visual Studio Team Services

- Go to the [VSTS website](https://visualstudio.microsoft.com/fr/team-services/) and create an account by clicking on "Get started for free". 
- Create a (private) project, and then head to the "Build & release" tab (left menu).

### Build

- Click "New pipeline" and follow the wizard
- This will create a "build" pipeline that will trigger on each push, and it will also create the associated "vsts-ci.yml" file in your repository. We need to change to match our needs (Check the "vsts-ci.yml" file)

#### push to your private docker registry from VSTS

First thing is to get a password:
- Login in azure portal
- Go to Container registries
- Select your registry and click on "Access Keys"
- Set Admin user to "enable"
- Copy the password

Then, let's add the variable in our build:
- Go in your "Builds" on the left menu and click on "edit" and select your build pipeline
- Click on "Edit"
- Go to the "variable" tab and click on "+ add"
- Enter "dockerPassword" in the name field and paste your docker password in the value (also click on the lock next to the value field to make it a password field)

You can now trigger a build.

#### The vsts-ci.yml file

Here is the description of the tasks that are done in this file:
1. First step is a bash script that executes our docker commands: build / login / push
2. We are copying files. In this case, the "kubernetes/application.yml" that will be use in our deployment
3. We "publish" the result of our build in a "$buildId" folder. In our case, it represents the file that has been copied (kubernetes/application.yml) so that it can be use by the deployment process.

### Deployment

- Click on release and create a new release. 
- Select "Deploy to a kubernetes cluster" in the template list and click apply.
- Give your stage a name (e.g "production") and change the name of the release pipeline (on the top left, next to "All pipelines")

#### Artifacts

- Add an artifact: select source type "Build".
- Select the corresponding source pipeline. 
- Leave everything as is, and click "Add".
- Click on the "thunder" icon in the left corner of the artifact
- Enable "Continuous deployment trigger" to automatically trigger a deployment after a successfull build.

#### Stage setup

- Click on "1 job, 1 task" link
- Click on "Agent Job" on the left and set the Agent pool to "Hosted Linux Preview"
- In additional options, make sure that the "Skip downloads of artifacts" box is unchecked.

#### Replace Tokens

- Click on the "+" sign on the Agent job line and search for the "replace tokens" task. 
- Click "get it for free", and install it on your vsts setup
- Once installed, add it to your release pipeline, and put it on top of the "kubectl apply" task
- Set Root directory to "$(System.DefaultWorkingDirectory)/$(Release.PrimaryArtifactSourceAlias)/$(Build.BuildId)/"
- Set target Files to "*.yml"

#### Kubectl apply

- For the kubernetes service connection, click on "+ New" button
- Give it a name and choose the authentication type (prefer service account). Once added, select it.
- In namespace, set "demo-$(Release.EnvironmentName)"
- The command use is "apply"
- in the arguments textarea, put "-f $(System.DefaultWorkingDirectory)/$(Release.PrimaryArtifactSourceAlias)/$(Build.BuildId)/application.yml"
- Save