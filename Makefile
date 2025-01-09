include .env

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  serve              Run server"
	@echo "  build_assets_dev   Build asset dev"
	@echo "  build_assets_prod  Build asset prod"

serve: build_assets_dev
	hugo serve
build_assets_dev:
	cd ./assets/themes/2022 && npm i && npm run build:dev
build_assets_prod:
	cd ./assets/themes/2022 && npm i && npm run build