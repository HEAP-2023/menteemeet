# Menteemeet
<p align="center">
  <img height="300px" src="client/public/images/global/menteemeet (1).png" />
</p>
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
(You must have a working MYSQL Workbench)
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
 pip install python-dotenv --user
```
```
 pip install Flask --user
```
```
 pip install Flask-SQLAlchemy --user  
```
```
 pip install mysqlclient --user 
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
