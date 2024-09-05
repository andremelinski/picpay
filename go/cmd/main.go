package main

import (
	configs "github.com/andremelinski/desafio-picpay/go/config"
	"github.com/andremelinski/desafio-picpay/go/internal/domain"
	"github.com/andremelinski/desafio-picpay/go/internal/infra/db"
	web_infra "github.com/andremelinski/desafio-picpay/go/internal/infra/web"
	"github.com/andremelinski/desafio-picpay/go/internal/infra/web/handlers"
	"github.com/andremelinski/desafio-picpay/go/internal/usecases"
	"github.com/andremelinski/desafio-picpay/go/pkg/web"
)

func main() {
	config, err := configs.LoadConfig(".")
	if err != nil {
		panic(err)
	}

	dbConn, err := db.NewPostgressDB(&db.DBConfig{
		DB_HOST:   config.DB_HOST,
		DB_PORT:   config.DB_PORT,
		DB_USER:   config.DB_USER,
		DB_PASS:   config.DB_PASS,
		DB_NAME:   config.DB_NAME,
		DB_SCHEMA: config.DB_SCHEMA,
	}).PostgressConnection()

	if err != nil {
		panic(err)
	}

	userRepo := domain.NewUserDomain(dbConn)
	walletRepo := domain.NewWalletDomain(dbConn)

	usecase := usecases.NewCreateUserUseCase(userRepo, walletRepo)
	httpHandler := web.NewWebResponseHandler()

	handler := handlers.NewCreateUserHandler(usecase, httpHandler)

	webRouter := web_infra.NewWebRouter(handler)
	webServer := web_infra.NewWebServer(
		config.HTTP_PORT,
		webRouter.BuildHandlers(),
	)

	webServer.Start()
}
