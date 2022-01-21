package handlers

import (
	"fmt"
	"main/controllers"
	"net/http"
)

func AddStudent(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		controllers.AddStudent(w, r)
	default:
		ReturnError(w, r)
	}
}

func GetStudent(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		controllers.GetStudent(w, r)
	default:
		ReturnError(w, r)
	}
}

func ReturnError(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Wrong Verb!")
}
