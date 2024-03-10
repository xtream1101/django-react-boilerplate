# Django

This is a boilerplae for create a django project using rest framework.
Currently uses local user login, but is setup to support 3rd party sso.


## Quick Links

- Django Admin: <http://127.0.0.1:8000/admin/>
- Django Rest Framework docs: <http://127.0.0.1:8000/docs/>


## Technologies used

- [Django](https://docs.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [Loguru](https://github.com/Delgan/loguru) (better logging)
- [Unfold](https://github.com/unfoldadmin/django-unfold) (fancy admin)
- [Spectacular](https://github.com/tfranzel/drf-spectacular) (fancy api docs)
- [Elements](https://github.com/stoplightio/elements) (interactive api docs)
- [Poetry](https://python-poetry.org/docs/) (dependency management)
- [Pre-commit](https://pre-commit.com/)
    - [Ruff](https://github.com/astral-sh/ruff) (code quality)


## Setup

1. Create a `.env` in the root backend folder with the following content:

    ```bash
    DJANGO_SECRET_KEY="super-secret-value-here"
    DATABASE_URL="postgresql://USER:PASS@HOST:5432/DB_NAME"
    ```

2. Setup the virtual environment

    Poetry docs: <https://python-poetry.org/docs/>

    ```bash
    # Install packages and enter venv
    poetry shell
    poetry install
    ```

3. Prepare the server

    ```bash
    # Run migrations
    python manage.py migrate

    # Create a superuser
    python manage.py createsuperuser

    # Run the server
    python manage.py runserver
    ```

4. Access the admin at <http://127.0.0.1:8000/admin/>

    1. On the main "**Dashboard**", under "**Django OAuth Toolkit**", click "**Applications**"
    2. Create a new application by clicking the plus in the top right
    3. Copy the client id & secret, they will get used when setting up the frontend app
    4. Fill in the form with the following values:
        - Client type: `Confidential`
        - Authorization grant type: `Resource owner password-based`
        - Name: anything you want
    5. Save the application
5. Setup the frontend at [frontend/README.md](../frontend/README.md)
