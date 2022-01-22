package main

import (
	"fmt"
	"github.com/rs/cors"
	"main/config"
	"main/controllers"
	"net/http"
	"os"
)

func main() {
	config.LoadEnvironments()

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to Student Registration System :)")
	})

	mux.HandleFunc("/add-student", controllers.AddStudent)
	mux.HandleFunc("/get-student", controllers.GetStudent)
	mux.HandleFunc("/get-all-student", controllers.GetAllStudent)
	mux.HandleFunc("/update-student", controllers.UpdateStudent)
	mux.HandleFunc("/delete-student", controllers.DeleteStudent)
	mux.HandleFunc("/delete-all-student", controllers.DeleteAllStudent)

	fmt.Println("APP RUNNING AT-  localhost" + os.Getenv("PORT"))
	handler := cors.AllowAll().Handler(mux)
	http.ListenAndServe(os.Getenv("PORT"), handler)
}
