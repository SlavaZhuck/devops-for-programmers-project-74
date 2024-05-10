### Hexlet tests and linter status:
[![Actions Status](https://github.com/SlavaZhuck/devops-for-programmers-project-74/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SlavaZhuck/devops-for-programmers-project-74/actions)
[![Actions Status](https://github.com/SlavaZhuck/devops-for-programmers-project-74/actions/workflows/push.yml/badge.svg)](https://github.com/SlavaZhuck/devops-for-programmers-project-74/actions)

### Description:
This repository is using docker to pack application JS Fastify Blog,
https://github.com/hexlet-components/js-fastify-blog

With possibility to split development and testing by usage:
1. For development are used 'docker-compose.override.yml' and 'Dockerfile'
2. For development are used 'docker-compose.yml' and 'Dockerfile.production'

Please note, that additional delay was added (10 sec), to wait for database up before tests are started.

### Usage:
By default container launchs tests.

Makefile has next commands, that could be used:

setup:
	docker-compose run --rm app make setup
test:
	docker-compose run --rm app make test
up: 
	docker-compose up --abort-on-container-exit
run_tests:
	docker-compose -f docker-compose.yml up --abort-on-container-exit --exit-code-from app

