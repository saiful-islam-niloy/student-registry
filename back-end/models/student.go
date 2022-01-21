package models

type Student struct {
	Name       string `json:"name" bson:"name"`
	University string `json:"university" bson:"university"`
	Major      string `json:"major" bson:"major"`
	Email      string `json:"email" bson:"email"`
}
