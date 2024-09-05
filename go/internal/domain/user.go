package domain

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/andremelinski/desafio-picpay/go/internal/infra/db"
	"github.com/andremelinski/desafio-picpay/go/pkg/utils"
)

type FindUserBy struct {
	Email    string
	Document string
}

type UserDomain struct {
	dbConn *sql.DB

	queries *db.Queries
}

func NewUserDomain(dbConn *sql.DB) *UserDomain {
	return &UserDomain{
		dbConn:  dbConn,
		queries: db.New(dbConn),
	}
}

func (ur *UserDomain) FindUserByMailorDocument(ctx context.Context, obj *db.GetUserByMailOrDocumentParams) (*db.User, error) {
	user, err := ur.queries.GetUserByMailOrDocument(ctx, *obj)

	if err != nil && err != sql.ErrNoRows {
		return nil, err
	}

	return &user, nil
}

type DomainNewUserParams struct {
	FirstName string
	LastName  string
	Email     string
	Password  string
	Document  string
	UserType  db.UserTypeEnum
}

func (ur *UserDomain) CreateUser(ctx context.Context, user *DomainNewUserParams) error {

	// Apply default if user_type is not set
	if user.UserType == "" {
		user.UserType = "user"
	}

	hash, err := utils.GenerateHash(user.Password)
	if err != nil {
		err := fmt.Sprintf("Error hashing password: %e", err)
		return errors.New(err)
	}

	user.Password = string(hash)
	err = ur.queries.CreateUser(ctx, db.CreateUserParams{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Document:  user.Document,
		Email:     user.Email,
		Password:  user.Password,
		UserType:  user.UserType,
	})
	return err
}

func (ur *UserDomain) GetWalletandUserByUserId(ctx context.Context, userID int64) (*db.GetWalletandUserByUserIdRow, error) {

	wallet, err := ur.queries.GetWalletandUserByUserId(ctx, userID)

	if err != nil {
		return nil, err
	}

	return &wallet, nil
}
