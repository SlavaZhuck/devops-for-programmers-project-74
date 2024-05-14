compose-setup:
	docker-compose run --rm app make setup
compose-test:
	docker-compose run --rm app make test
compose-up: 
	docker-compose up --abort-on-container-exit
compose-run-tests:
	docker-compose -f docker-compose.yml up --abort-on-container-exit --exit-code-from app
