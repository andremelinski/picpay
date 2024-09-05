package utils_interface

import (
	"context"

	utils_dto "github.com/andremelinski/desafio-picpay/go/pkg/utils/dto"
)

type IHandlerExternalApi interface {
	CallExternalApi(ctx context.Context, timeoutMs int, method string, url string) ([]byte, error)
}

type IAuthAPI interface {
	GetAuth(ctx context.Context) (*utils_dto.AuthApiResponse, error)
}

type INotificationAPI interface {
	GetNotification(ctx context.Context) (*utils_dto.NotificationApiResponse, error)
}
