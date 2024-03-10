from drf_social_oauth2.serializers import (
    ConvertTokenSerializer,
    InvalidateRefreshTokenSerializer,
    InvalidateSessionsSerializer,
    RevokeTokenSerializer,
)
from drf_spectacular.extensions import (
    OpenApiAuthenticationExtension,
    OpenApiViewExtension,
)
from drf_spectacular.utils import extend_schema, extend_schema_view, inline_serializer
from rest_framework import serializers


class DRFSocialAuthenticationSchema(OpenApiAuthenticationExtension):
    target_class = "drf_social_oauth2.authentication.SocialAuthentication"
    name = "SocialAuthentication"

    def get_security_definition(self, auto_schema):
        return {
            "type": "http",
            "scheme": "bearer",
        }


class InvalidateRefreshTokensSchemaFix(OpenApiViewExtension):
    target_class = "drf_social_oauth2.views.InvalidateRefreshTokens"

    def view_replacement(self):
        @extend_schema_view(
            post=extend_schema(
                summary="Invalidate refresh tokens",
                request=InvalidateRefreshTokenSerializer,
                responses={204: None},
            )
        )
        class InvalidateRefreshTokensSchema(self.target_class):
            serializer_class = InvalidateRefreshTokenSerializer

        return InvalidateRefreshTokensSchema


class InvalidateSessionsSchemaFix(OpenApiViewExtension):
    target_class = "drf_social_oauth2.views.InvalidateSessions"

    def view_replacement(self):
        @extend_schema_view(
            post=extend_schema(
                summary="Invalidate sessions",
                request=InvalidateSessionsSerializer,
                responses={204: None},
            )
        )
        class InvalidateSessionsSchema(self.target_class):
            serializer_class = InvalidateSessionsSerializer

        return InvalidateSessionsSchema


class RevokeTokenViewSchemaFix(OpenApiViewExtension):
    target_class = "drf_social_oauth2.views.RevokeTokenView"

    def view_replacement(self):
        @extend_schema_view(
            post=extend_schema(
                summary="Revoke token",
                request=RevokeTokenSerializer,
                responses={204: None},
            )
        )
        class RevokeTokenViewSchema(self.target_class):
            serializer_class = RevokeTokenSerializer

        return RevokeTokenViewSchema


class TokenViewSchemaFix(OpenApiViewExtension):
    target_class = "drf_social_oauth2.views.TokenView"

    def view_replacement(self):
        @extend_schema_view(
            post=extend_schema(
                summary="Get token",
                request=inline_serializer(
                    name="TokenRequest",
                    fields={
                        "grant_type": serializers.CharField(),
                        "client_id": serializers.CharField(),
                        "client_secret": serializers.CharField(),
                        "refresh_token": serializers.CharField(required=False),
                    },
                ),
                responses=inline_serializer(
                    name="TokenResponse",
                    fields={
                        "access_token": serializers.CharField(),
                        "token_type": serializers.CharField(),
                        "expires_in": serializers.IntegerField(),
                        "refresh_token": serializers.CharField(),
                        "scope": serializers.CharField(),
                    },
                ),
            )
        )
        class TokenViewSchema(self.target_class):
            pass

        return TokenViewSchema


class ConvertTokenViewSchemaFix(OpenApiViewExtension):
    target_class = "drf_social_oauth2.views.ConvertTokenView"

    def view_replacement(self):
        @extend_schema_view(
            post=extend_schema(
                summary="Convert token",
                request=ConvertTokenSerializer,
                responses={204: None},
            )
        )
        class ConvertTokenViewSchema(self.target_class):
            serializer_class = ConvertTokenSerializer

        return ConvertTokenViewSchema
