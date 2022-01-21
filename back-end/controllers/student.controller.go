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
)

func AddStudent(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)

	student := models.Student{}
	json.Unmarshal(reqBody, &student)

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
