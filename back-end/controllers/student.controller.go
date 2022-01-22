package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"io/ioutil"
	"log"
	"main/config"
	"main/models"
	"net/http"
	"regexp"
)

func AddStudent(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)

	student := models.Student{}
	json.Unmarshal(reqBody, &student)

	if isEmailValid(student.Email) == false {
		w.WriteHeader(404)
		fmt.Fprintf(w, "Invalid Email Address!")
		return
	}

	if isRegistered(student.Email) == true {
		w.WriteHeader(404)
		fmt.Fprintf(w, "Email already registered!")
		return
	}

	collection := config.GetStudentsCollection()
	collection.InsertOne(context.TODO(), student)

	fmt.Println(student.Name + " " + student.University)

	if err != nil {
		log.Fatal(err)
		fmt.Fprintf(w, "Error")
	}
}

func GetStudent(w http.ResponseWriter, r *http.Request) {
	keys, err := r.URL.Query()["email"]

	if !err || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		return
	}

	key := keys[0]
	log.Println("Url Param 'key' is: " + string(key))

	var Student bson.M

	collection := config.GetStudentsCollection()

	collection.FindOne(
		context.TODO(),
		bson.M{"email": key},
	).Decode(&Student)

	formattedData, err2 := json.MarshalIndent(Student, "", "   ")
	if err2 != nil {
		log.Print(err2)
	}

	fmt.Fprintf(w, string(formattedData))
}

func GetAllStudent(w http.ResponseWriter, r *http.Request) {
	var students []bson.M

	collection := config.GetStudentsCollection()
	cursor, err := collection.Find(context.TODO(), bson.M{})

	if err = cursor.All(context.TODO(), &students); err != nil {
		log.Fatal(err)
	}

	formattedData, err2 := json.MarshalIndent(students, "", "   ")
	if err2 != nil {
		log.Print(err2)
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, string(formattedData))
}

func UpdateStudent(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)

	student := models.Student{}
	json.Unmarshal(reqBody, &student)

	collection := config.GetStudentsCollection()

	collection.UpdateOne(
		context.TODO(),
		bson.M{"email": student.Email},
		bson.D{
			{"$set", bson.D{{"name", student.Name}}},
			{"$set", bson.D{{"university", student.University}}},
			{"$set", bson.D{{"major", student.Major}}},
		},
	)

	if err != nil {
		log.Fatal(err)
		fmt.Fprintf(w, "Error")
	}
}

func DeleteStudent(w http.ResponseWriter, r *http.Request) {
	keys, err := r.URL.Query()["email"]

	if !err || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		return
	}

	key := keys[0]
	log.Println("Url Param 'key' is: " + string(key))

	collection := config.GetStudentsCollection()

	collection.DeleteOne(
		context.TODO(),
		bson.M{"email": key},
	)

	fmt.Fprintf(w, "Error")

}

func DeleteAllStudent(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)

	student := models.Student{}
	json.Unmarshal(reqBody, &student)

	collection := config.GetStudentsCollection()

	collection.DeleteMany(
		context.TODO(),
		bson.M{},
	)

	if err != nil {
		log.Fatal(err)
		fmt.Fprintf(w, "Error")
	}
}

var emailRegex = regexp.MustCompile("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])")

func isEmailValid(e string) bool {
	if len(e) < 3 && len(e) > 254 {
		return false
	}
	return emailRegex.MatchString(e)
}

func isRegistered(e string) bool {
	collection := config.GetStudentsCollection()

	var student bson.M
	err := collection.FindOne(
		context.TODO(),
		bson.M{"email": e},
	).Decode(&student)

	//IF DOCUMENT FOUND, ERROR WILL BE NIL
	if err == nil {
		return true
	} else {
		return false
	}
}
