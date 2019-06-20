# 1. Set up
- install docker
- install docker-compose
- up

# 2. Development

## 2.1. VS Code TSLint

	{
		"tslint.configFile": "ui/tslint.json"
	}

## 2.2. Up

	docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml up

## 2.3. Down

	docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml down

## 2.5. Dev URLs
Web http://localhost:8080  
Api http://localhost:8080/api/

## 2.5. Bash
Api

	docker run --rm --volume ./api:/app -it ff-tcg-stats_api /bin/bash

UI

	docker run --rm --volume ./ui:/app -it ff-tcg-stats_ui /bin/bash
