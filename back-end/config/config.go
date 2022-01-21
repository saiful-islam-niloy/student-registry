package config

import (
	"context"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"os"
)

func InitDB() *mongo.Client {
	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("DB_URL")))
	if err != nil {
		panic(err)
	}

	// Ping the primary
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}
	return client
}

func LoadEnvironments() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func GetStudentsCollection() *mongo.Collection {
	client := InitDB()
	// get collection as ref
	collection := client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION"))
	return collection
}
