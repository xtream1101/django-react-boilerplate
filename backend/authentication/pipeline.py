from datetime import datetime

from django.utils.timezone import make_aware
from social_core.exceptions import AuthForbidden


def update_user(backend, strategy, details, response, user=None, *args, **kwargs):
    user.last_login = make_aware(datetime.now())
    user.save()


def validate_password(strategy, backend, user, is_new=False, *args, **kwargs):
    if backend.name != "email":
        return

    password = strategy.request_data()["password"]
    if is_new:
        user.set_password(password)
        user.save()
    elif not user.check_password(password):
        raise AuthForbidden(backend)
