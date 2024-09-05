package utils

import "golang.org/x/crypto/bcrypt"

func GenerateHash(toHash string) ([]byte, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(toHash), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	return hash, nil
}

func ValidateHash(originalHash, toValidateHash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(originalHash), []byte(toValidateHash))
	return err == nil
}
