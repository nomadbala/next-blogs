postgres:
	docker run --name blog_db -p 5444:5432 -e POSTGRES_USER=blog_user -e POSTGRES_PASSWORD=blog_password -e POSTGRES_DB=blog_db postgres:latest