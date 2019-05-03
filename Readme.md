# 1. Set up
- install docker
- install docker-compose
- up

# 2. Development

## 2.1. Hosts Entry
Add to `C:\Windows\System32\drivers\etc\hosts`:

	127.0.0.1 ff-tcg-stats.local
	127.0.0.1 api.ff-tcg-stats.local

## 2.2. VS Code TSLint

	{
		"tslint.configFile": "ui/tslint.json"
	}

## 2.3. Up

	docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml up

## 2.4. Down

	docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml down

## 2.5. Dev URLs
Web http://ff-tcg-stats.local:8080
Api http://api.ff-tcg-stats.local:8080

## 2.5. Bash
Api

	docker run --rm --volume ./api:/app -it ff-tcg-stats_api /bin/bash

UI

	docker run --rm --volume ./ui:/app -it ff-tcg-stats_ui /bin/bash
