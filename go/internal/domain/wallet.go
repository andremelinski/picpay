package domain

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/andremelinski/desafio-picpay/go/internal/infra/db"
)

type WalletDomain struct {
	dbConn *sql.DB

	queries *db.Queries
}

func NewWalletDomain(dbConn *sql.DB) *WalletDomain {
	return &WalletDomain{
		dbConn:  dbConn,
		queries: db.New(dbConn),
	}
}

type DomainNewWalletParams struct {
	UserID  int64
	Balance float64
}

func (ur *WalletDomain) CreateWallet(ctx context.Context, wallet *DomainNewWalletParams) error {

	if wallet.Balance == 0 {
		wallet.Balance = 100
	}
	fmt.Println(wallet)
	fmt.Println(wallet)
	err := ur.queries.CreateWallet(ctx, db.CreateWalletParams{
		Balance: wallet.Balance,
		UserID:  wallet.UserID,
	})

	return err
}

func (ur *WalletDomain) GetWallet(ctx context.Context, walletID int64) (*db.Wallet, error) {

	wallet, err := ur.queries.GetWallet(ctx, walletID)

	if err != nil {
		return nil, err
	}

	return &wallet, nil
}
