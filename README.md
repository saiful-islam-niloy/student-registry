# Student Registry
A full-stack application. A student can be registered for the system. Student can be added, updated, fetched, deleted from the database. 

### Stack
* Front End: Javascript (React JS)
* Back End:  Golang     (No Framework Used)
* Database:  Mongodb

### Demo
Youtube: [Click here](https://youtu.be/VUOnFuoGRio)

___

### How to Run
Open terminal in the current directory you have cloned from github.
```
cd student-registry
cd back-end
go mod download
go mod tidy
go run main.go
```
Open a new terminal under student-registry folder.
```
cd front-end
npm install
npm start
```
Applicaton frontend runs at `` http://localhost:3000/``
___

### Front End

#### Component Structure
```
Homepage
	Banner
	Features
		GetStudent
		AddStudent
		UpdateStudent
		DeleteStudent
```

Http Client: Axios

___

### Back End

#### Api Endpoints
```
/get-student?email=<student-email>
/get-all-student
/add-student
/update-student
/delete-student?email=<student-email>
/delete-all-student
```

/add-student, /update-student - this endpoints wrap data in body section. 

