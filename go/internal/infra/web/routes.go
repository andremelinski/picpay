package web_infra

import (
	"net/http"

	"github.com/andremelinski/desafio-picpay/go/internal/infra/web/handlers"
)

type RouteHandler struct {
	Path        string
	Method      string
	HandlerFunc http.HandlerFunc
}

// struct recebe a interface que possui os endpoints desse usecase + middlewares
type WebRouter struct {
	CreateUserHandler *handlers.CreateUserHandler
}

func NewWebRouter(
	cityHandlers *handlers.CreateUserHandler,
) *WebRouter {
	return &WebRouter{
		cityHandlers,
	}
}

// metodo para cadastrar todas as rotas
func (s *WebRouter) BuildHandlers() []RouteHandler {
	return []RouteHandler{
		{
			Path:        "/",
			Method:      "POST",
			HandlerFunc: s.CreateUserHandler.CreateUser,
		},
	}
}
