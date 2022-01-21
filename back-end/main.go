package main

import (
	"fmt"
	"main/config"
	"main/handlers"
	"net/http"
	"os"
)

func main() {
	config.LoadEnvironments()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to Student Registration System :)")
	})

	http.HandleFunc("/add-student", handlers.AddStudent)
	http.HandleFunc("/get-student", handlers.GetStudent)

	fmt.Println("APP RUNNING AT-  localhost" + os.Getenv("PORT"))
	http.ListenAndServe(os.Getenv("PORT"), nil)
}
