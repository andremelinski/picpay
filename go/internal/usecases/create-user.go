package usecases

import (
	"context"
	"fmt"

	"github.com/andremelinski/desafio-picpay/go/internal/domain"
	"github.com/andremelinski/desafio-picpay/go/internal/infra/db"
)

// UserRole type as an enum
type UserRole string

// Enum values for UserRole
const (
	Common      UserRole = "common"
	Shopkeepers UserRole = "shopkeepers"
)

type CreateUserInput struct {
	FirstName string   `json:"first_name"`
	LastName  string   `json:"last_name"`
	Email     string   `json:"email"`
	Password  string   `json:"password"`
	Document  string   `json:"document"`
	UserType  UserRole `json:"user_type,omitempty"`
}

type CreateUserOutput struct {
	FullName string   `json:"full_name"`
	Email    string   `json:"email"`
	Document string   `json:"document"`
	UserType UserRole `json:"user_type"`
}

type WalletOutput struct {
	FirstName string   `json:"first_name,omitempty"`
	LastName  string   `json:"last_name,omitempty"`
	Email     string   `json:"email,omitempty"`
	Password  string   `json:"password,omitempty"`
	Document  string   `json:"document,omitempty"`
	UserType  UserRole `json:"user_type,omitempty"`
}

type CreateUserUseCase struct {
	userRepo   *domain.UserDomain
	walletRepo *domain.WalletDomain
}

func NewCreateUserUseCase(userRepo *domain.UserDomain, walletRepo *domain.WalletDomain) *CreateUserUseCase {
	return &CreateUserUseCase{
		userRepo,
		walletRepo,
	}
}

func (cu *CreateUserUseCase) CreateNewUser(ctx context.Context, user *CreateUserInput) (*db.GetWalletandUserByUserIdRow, error) {
	// validate if user exists
	// fmt.Println(user)
	userFound, err := cu.userRepo.FindUserByMailorDocument(ctx, &db.GetUserByMailOrDocumentParams{
		Email:    user.Email,
		Document: user.Document,
	})

	if err != nil {
		return nil, err
	}

	if userFound.UserID != 0 {
		return nil, nil
	}

	newUserParams := &domain.DomainNewUserParams{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Password:  user.Password, // You might want to hash the password before saving
		Document:  user.Document,
		UserType:  db.UserTypeEnum(user.UserType),
	}

	// User not found, so create a new user
	err = cu.userRepo.CreateUser(ctx, newUserParams)
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %v", err)
	}

	userFound, err = cu.userRepo.FindUserByMailorDocument(ctx, &db.GetUserByMailOrDocumentParams{
		Email:    newUserParams.Email,
		Document: newUserParams.Document,
	})
	if err != nil {
		return nil, err
	}
	err = cu.walletRepo.CreateWallet(ctx, &domain.DomainNewWalletParams{
		UserID:  userFound.UserID,
		Balance: 0,
	})

	if err != nil {
		return nil, err
	}
	userInfo, err := cu.userRepo.GetWalletandUserByUserId(ctx, userFound.UserID)

	if err != nil {
		return nil, err
	}

	return userInfo, nil

}
