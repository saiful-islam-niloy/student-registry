package controllers

import (
	"context"
	"encoding/json"
	"fmt"
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
	result, err2 := collection.InsertOne(context.TODO(), student)

	fmt.Println(result)
	fmt.Println(err2)

	fmt.Println(student.Name + " " + student.University)

	if err != nil {
		log.Fatal(err)
		fmt.Fprintf(w, "Error")
	}
}
