# Menteemeet
<p align="center">
  <img height="300px" src="client/public/images/global/menteemeet (1).png" />
</p>
Project Website: https://menteemeet.com/

Project Documentation: 

## Project Introduction

**Project Goal:** To combat the many factors to consider while matching mentees and mentors, such as their strengths, experience, interests and individual schedules,
 we plan to simplify the issue by automating this process, taking into account all the above factors via a technological tool.

 ## How to Run this Code

 ### Backend Server ###

Go to `client` folder via the following command:

```
cd backend
```
For first time users, create a dotenv file with the following details:
(You must have a working MYSQL Workbench, WAMP/MAMP Server installed)
```
PORT=5001
API_VER=/api/v1

MYSQL_HOST=
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
```

Following this, install necessary node packages:

```
npm install
```

Start the application:

```
npm start
```

### Python Microservice ###

Go to `python-micro` folder via the following command:

```
cd python-micro
```

Following this, install necessary node packages:

```
pip install -r requirements.txt
```

For first time users, create a dotenv file with the following details:
```
DB_USERNAME=
DB_PASSWORD= 
DB_HOSTNAME=
DB_SCHEMA=
```
Start the application:

```
python app.py
```

### Frontend Server ###

Go to `client` folder via the following command:

```
cd client
```

Following this, install necessary node packages:

```
npm i
```

Start the application:

```
npm start
```


## Codebase Structure

### Client Folder

**public directory**

`images`: image repository


**src directory**

`animations`: Transition animations abstracted out

`components`: Folder containing smaller components of each page

`global`: Containing components that are used on every page of the app

`hooks`: Contain all custom hooks, especially for query calls to the backend using tanstack query

`scenes`: Contains each frontend endpoint of the app

`services`: Contains all the API calls to the backend

`state`: Contains the code required for the redux store

`utils`: Contains the axios instances to all the servers

`theme`: Theme settings for colours and typography

`ProtectedRoute`: Contains code to limit access to pages based on user role and redirect to relevant pages


### Backend Folder

`config`: Contains files to connect the backend to the DB

`controllers`: Contains controller files managing interactions between routes and data operations within the web application

`middlewares`: Contains middleware files implementing JWT authentication

`models`: Contains model files defining the structure and behaviour of data entities

`routes`: Contains route files defining and mapping URL endpoints to controller functions

`utils`: Contains configuration files

### Python-micro Folder

Our microservice programme to assist with the algorithm of sorting groups

`controller`: Contains files managing the logic for sorting operations within the service

`entity`: Contains files storing data structures and classes representing objects or data entities

`models`: Contains files connecting to DB

`util`: Contains files for scoring in the algorithm








