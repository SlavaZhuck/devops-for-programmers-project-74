setup:
	docker-compose run --rm app make setup
test:
	docker-compose run --rm app make test
up: 
	docker-compose up --abort-on-container-exit
run_with_tests:
	docker-compose -f docker-compose.yml up --abort-on-container-exit --exit-code-from app
