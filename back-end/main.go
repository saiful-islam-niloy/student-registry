package main

import (
	"fmt"
	"main/config"
	"main/controllers"
	"net/http"
	"os"
)

func main() {
	config.LoadEnvironments()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to Student Registration System :)")
	})

	http.HandleFunc("/add-student", controllers.AddStudent)
	http.HandleFunc("/get-student", controllers.GetStudent)
	http.HandleFunc("/update-student", controllers.UpdateStudent)
	http.HandleFunc("/delete-student", controllers.DeleteStudent)
	http.HandleFunc("/delete-all-student", controllers.DeleteAllStudent)

	fmt.Println("APP RUNNING AT-  localhost" + os.Getenv("PORT"))
	http.ListenAndServe(os.Getenv("PORT"), nil)
}
