# Django + React Boiler Plate


## Setup

1. Install pre-commit: <https://pre-commit.com/>
2. Install pre-commit hooks:

    ```bash
    # Run from the repo root
    pre-commit install
    ```

    1. To run the pre-commit hooks manually:

        ```bash
        pre-commit run --all-files
        ```

3. Setup the backend at [backend/README.md](backend/README.md)
4. Setup the frontend at [frontend/README.md](frontend/README.md)
5. Check out the [justfile](https://github.com/casey/just) commands available: `just --list`
6. [Bruno API Client](https://www.usebruno.com/) examples are in the backend folder `bruno-client/`
    - They will work with the defaults created on server start up
