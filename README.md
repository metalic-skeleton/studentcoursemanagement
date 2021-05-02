## How to Deploy a Student Course Management App on Amazon EC2

The purpose of this repository is to demonstrate how to deploy studentcoursemanagement application 
built by Express - Node.js web application framework on Amazon EC2  

###  Launch an Instance

- For the Instance Type, t2.micro will be sufficient for
this demonstration.

- Update Security Group Settings to allow SSH for login, HTTP for web access
as well as Custom TCP for 10010 port which will be listening port of the
application. 

### Install Node on your Amazon EC2 Instance by running below commands :

- SSH into your instance and follow below commands

    ```bash
    $ sudo yum update -y
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
    $ . ~/.nvm/nvm.sh
    $ nvm install node     
    # to check whether the installation was successful   
    $ node -e "console.log('Running Node.js ' + process.version)"
    ```
### install express Fast, unopinionated, minimalist web framework for Node.js
	$ npm install express --save

## There are two different ways to build, deploy the application.

### Process 1: Set up a Continuous Deployment Pipeline using AWS CodePipeline and deploy project

#### Step 1: Create a deployment environment
Continuous deployment pipeline will need a target environment containing virtual servers, or Amazon EC2 instances, 
where it will deploy project code. We will prepare this environment before creating the pipeline.

#### Step 2: Create the pipeline
In this step, We will create and configure a simple pipeline with two actions: source and deploy. 
You will provide CodePipeline with the locations of the source repository and deployment environment.

For this case, Source Provider: GitHub

In the Connect to GitHub section, click Connect to GitHub.
A new browser window will open to connect you to GitHub. If prompted to sign in, provide the GitHub credentials. 

Deployment provider: AWS Elastic Beanstalk. 
Application name:  Student course management. 
Environment name:  Default-Environment.

Please select the role in the Service Role page create Role which is created earlier.

#### Step 3: Activate the pipeline to deploy source code
In this step, let's lunch the pipe line Once the pipeline has been created, it will start to run automatically. 
First, it detects the project source code in the source location, bundles up the files, 
and then move them to the second stage. 
During this stage, it passes the code to Elastic Beanstalk, which contains the EC2 instance that will host the source code. 
Elastic Beanstalk handles deploying the code to the EC2 instance.

### Process 2: Deploy the code manually.

### Install Git on your Amazon EC2 Instance by running below commands :

- SSH into the instance and follow below commands

    ```bash
    $ sudo yum install git -y
    $ git --version
    $ git clone https://github.com/metalic-skeleton/studentcoursemanagement.git
    $ cd studentcoursemanagement/
    # to deploy packages and install dependencies  
    $ npm install
	$ npm start
  
