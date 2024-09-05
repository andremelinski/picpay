package configs

import "github.com/spf13/viper"

type conf struct {
	HTTP_PORT     int    `mapstructure:"HTTP_PORT"`
	AUTH_MS_URL   string `mapstructure:"AUTH_MS_URL"`
	NOTIFY_MS_URL string `mapstructure:"NOTIFY_MS_URL"`
	DB_HOST       string `mapstructure:"DB_HOST"`
	DB_PORT       int    `mapstructure:"DB_PORT"`
	DB_USER       string `mapstructure:"DB_USER"`
	DB_PASS       string `mapstructure:"DB_PASS"`
	DB_SCHEMA     string `mapstructure:"DB_SCHEMA"`
	DB_NAME       string `mapstructure:"DB_NAME"`
}

func LoadConfig(path string) (*conf, error) {
	var cfg *conf
	viper.SetConfigName("app_config")
	viper.SetConfigType("env")
	viper.AddConfigPath(path)
	viper.SetConfigFile(".env")
	viper.AutomaticEnv()
	err := viper.ReadInConfig()
	if err != nil {
		panic(err)
	}
	err = viper.Unmarshal(&cfg)
	if err != nil {
		panic(err)
	}
	return cfg, err
}
