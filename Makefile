APP=rde-gw-fs
VERSION=$(shell git branch --show-current)

ifeq ($(VERSION),master)
VERSION=latest
endif

run:
	@deno run --allow-net src/main.ts

build:
	@deno compile --output build/$(APP) src/main.ts

build.docker:
	@docker build . -t $(APP):$(VERSION)