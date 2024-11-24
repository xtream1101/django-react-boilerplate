# Vars
db_name := "boiler-plate-db"
python := "poetry run python"
project_dir := justfile_dir()

# Run python poetry command with args
poetry *ARGS:
    @cd "{{ project_dir }}/backend"; poetry {{ ARGS }}

# Start db, api, and run migrate and loaddata
start-api:
    @echo "Starting all servers"
    just --justfile {{ justfile() }} start-db
    just --justfile {{ justfile() }} manage migrate
    just --justfile {{ justfile() }} manage loaddata setup
    just --justfile {{ justfile() }} manage runserver

# Clear db and start up the api again
start-api-fresh:
    @echo "Clearing database and starting all servers"
    just --justfile {{ justfile() }} stop-db
    just --justfile {{ justfile() }} start-api

# Start the postgres db
start-db:
    @echo "Starting database"
    # TODO: Better way to check if the container is already running
    docker run --name {{ db_name }} -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres || true

# Stop the postgres db
stop-db:
    @echo "Stopping database"
    docker stop {{ db_name }} || true
    docker rm {{ db_name }} || true

# Run the Django manage.py with the given arguments
manage *ARGS:
    @cd "{{ project_dir }}/backend"; {{ python }} manage.py {{ ARGS }}

# Run makemigrations and then migrate
migrate:
    just --justfile {{ justfile() }} manage makemigrations
    just --justfile {{ justfile() }} manage migrate


start-react:
    @cd "{{ project_dir }}/frontend"; npm install
    @cd "{{ project_dir }}/frontend"; npm start
