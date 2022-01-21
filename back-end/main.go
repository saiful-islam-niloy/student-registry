package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"main/config"
	"net/http"
	"os"
)

type Student struct {
	Id         int    `json:"id" bson:"id"`
	Name       string `json:"name" bson:"name"`
	University string `json:"university" bson:"university"`
	Major      string `json:"major" bson:"major"`
	Email      string `json:"email" bson:"email"`
}

func main() {
	config.LoadEnvironments()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to new server!")
	})

	http.HandleFunc("/add-student", func(w http.ResponseWriter, r *http.Request) {
		reqBody, err := ioutil.ReadAll(r.Body)

		student := Student{}
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
	})

	fmt.Println("APP RUNNING AT-  localhost" + os.Getenv("PORT"))
	http.ListenAndServe(os.Getenv("PORT"), nil)

}
