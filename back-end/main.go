package main

import "main/config"

func main() {
	config.LoadEnvironments()
	config.InitDB()
}
