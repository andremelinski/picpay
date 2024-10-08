// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db

import (
	"database/sql"
	"database/sql/driver"
	"fmt"
)

type UserTypeEnum string

const (
	UserTypeEnumContractor UserTypeEnum = "contractor"
	UserTypeEnumUser       UserTypeEnum = "user"
)

func (e *UserTypeEnum) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = UserTypeEnum(s)
	case string:
		*e = UserTypeEnum(s)
	default:
		return fmt.Errorf("unsupported scan type for UserTypeEnum: %T", src)
	}
	return nil
}

type NullUserTypeEnum struct {
	UserTypeEnum UserTypeEnum
	Valid        bool // Valid is true if UserTypeEnum is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullUserTypeEnum) Scan(value interface{}) error {
	if value == nil {
		ns.UserTypeEnum, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.UserTypeEnum.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullUserTypeEnum) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.UserTypeEnum), nil
}

type Transaction struct {
	TransactionID int32
	Value         sql.NullString
	FromWalletID  sql.NullInt64
	ToWalletID    sql.NullInt64
	CreatedAt     sql.NullTime
	UpdatedAt     sql.NullTime
}

type User struct {
	UserID    int64
	FirstName string
	LastName  string
	Document  string
	Email     string
	Password  string
	UserType  UserTypeEnum
	CreatedAt sql.NullTime
	UpdatedAt sql.NullTime
}

type Wallet struct {
	WalletID  int64
	UserID    int64
	Balance   string
	CreatedAt sql.NullTime
	UpdatedAt sql.NullTime
}
