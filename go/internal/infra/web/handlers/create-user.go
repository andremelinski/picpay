package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"github.com/andremelinski/desafio-picpay/go/internal/usecases"
	"github.com/andremelinski/desafio-picpay/go/pkg/web"
)

type CreateUserHandler struct {
	usecase      *usecases.CreateUserUseCase
	HttpResponse web.IWebResponseHandler
}

func NewCreateUserHandler(usecase *usecases.CreateUserUseCase, httpResponse web.IWebResponseHandler) *CreateUserHandler {
	return &CreateUserHandler{
		usecase,
		httpResponse,
	}
}

func (h *CreateUserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	newUser := &usecases.CreateUserInput{}

	body := r.Body
	res, err := io.ReadAll(body)

	if err != nil {
		h.HttpResponse.RespondWithError(w, http.StatusUnprocessableEntity, err)
		return
	}

	err = json.Unmarshal(res, newUser)

	if err != nil {
		h.HttpResponse.RespondWithError(w, http.StatusUnprocessableEntity, err)
		return
	}

	userInfo, err := h.usecase.CreateNewUser(context.Background(), newUser)
	if err != nil {
		h.HttpResponse.RespondWithError(w, http.StatusUnprocessableEntity, err)
		return
	}

	if userInfo == nil {
		h.HttpResponse.RespondWithError(w, http.StatusNotAcceptable, errors.New("user registered"))
		return
	}

	h.HttpResponse.Respond(w, http.StatusOK, userInfo)

}
