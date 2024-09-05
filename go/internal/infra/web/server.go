package web_infra

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

type WebServer struct {
	Router        chi.Router
	Handlers      []RouteHandler
	WebServerPort int
}

func NewWebServer(
	serverPort int,
	handlers []RouteHandler,
) *WebServer {
	return &WebServer{
		Router:        chi.NewRouter(),
		Handlers:      handlers,
		WebServerPort: serverPort,
	}
}

func (s *WebServer) Start() {

	s.Router.Use(middleware.RequestID)
	s.Router.Use(middleware.RealIP)
	s.Router.Use(middleware.Recoverer)
	s.Router.Use(middleware.Logger)
	s.Router.Use(middleware.Timeout(60 * time.Second))

	for _, handler := range s.Handlers {
		s.Router.MethodFunc(handler.Method, handler.Path, handler.HandlerFunc)
	}
	log.Println("Starting cep server on port", s.WebServerPort)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", s.WebServerPort), s.Router); err != nil {
		log.Fatal(err)
	}
}
