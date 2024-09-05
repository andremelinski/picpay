package domain

import "database/sql"

type TransactionDomain struct {
	dbConn *sql.DB
}

func NewTransactionDomain() {

}
