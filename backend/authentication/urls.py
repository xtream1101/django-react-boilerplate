from django.urls import include, re_path
from drf_social_oauth2.views import (
    ConvertTokenView,
    InvalidateRefreshTokens,
    InvalidateSessions,
    RevokeTokenView,
    TokenView,
)
from oauth2_provider.views import AuthorizationView
from rest_framework import routers

from authentication.views import UserViewSet

router = routers.SimpleRouter()

router.register(r"users", UserViewSet, basename="users")

urlpatterns = [
    re_path(r"^", include(router.urls)),
]

auth_urlpatterns = (
    [
        re_path(r"^authorize/?$", AuthorizationView.as_view(), name="authorize"),
        re_path(r"^token/?$", TokenView.as_view(), name="token"),
        re_path(r"^convert-token/?$", ConvertTokenView.as_view(), name="convert_token"),
        re_path(r"^revoke-token/?$", RevokeTokenView.as_view(), name="revoke_token"),
        re_path(
            r"^invalidate-sessions/?$",
            InvalidateSessions.as_view(),
            name="invalidate_sessions",
        ),
        re_path(
            r"^invalidate-refresh-tokens/?$",
            InvalidateRefreshTokens.as_view(),
            name="invalidate_refresh_tokens",
        ),
        re_path("", include("social_django.urls", namespace="social")),
    ],
    "drf",
)
