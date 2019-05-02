# 1. Set up
- install docker
- install docker-compose
- up

# 2. Development

## 2.1. Hosts Entry
Add to `C:\Windows\System32\drivers\etc\hosts`:

	127.0.0.1 ff-stats.local
	127.0.0.1 api.ff-stats.local

## 2.2. Up

	docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml up

## 2.3. Down

	docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml down

## 2.4. Dev URLs
Api http://api.ff-stats.local:8080/

## 2.5. Bash
Api

	docker run --volume ./api:/app -it ff-stats_api /bin/bash

UI

	docker run --volume ./ui:/app -it ff-stats_ui /bin/bash
