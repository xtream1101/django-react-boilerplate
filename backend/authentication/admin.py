from django.contrib import admin
from django.contrib.auth.admin import (
    UserAdmin as BaseUserAdmin,
    GroupAdmin as BaseGroupAdmin,
)
from django.contrib.auth.models import Group
from oauth2_provider.admin import (
    ApplicationAdmin as BaseApplicationAdmin,
    AccessTokenAdmin as BaseAccessTokenAdmin,
    GrantAdmin as BaseGrantAdmin,
    IDTokenAdmin as BaseIDTokenAdmin,
    RefreshTokenAdmin as BaseRefreshTokenAdmin,
)
from oauth2_provider.models import (
    get_access_token_model,
    get_application_model,
    get_grant_model,
    get_id_token_model,
    get_refresh_token_model,
)
from social_django.admin import AssociationOption, NonceOption, UserSocialAuthOption
from social_django.models import Association, Nonce, UserSocialAuth
from unfold.admin import ModelAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm

from authentication.models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm


admin.site.unregister(Group)


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass


admin.site.unregister(Association)


@admin.register(Association)
class AssociationAdmin(AssociationOption, ModelAdmin):
    pass


admin.site.unregister(Nonce)


@admin.register(Nonce)
class NonceAdmin(NonceOption, ModelAdmin):
    pass


admin.site.unregister(UserSocialAuth)


@admin.register(UserSocialAuth)
class UserSocialAuthAdmin(UserSocialAuthOption, ModelAdmin):
    pass


admin.site.unregister(get_access_token_model())


@admin.register(get_access_token_model())
class AccessTokenAdmin(BaseAccessTokenAdmin, ModelAdmin):
    pass


admin.site.unregister(get_application_model())


@admin.register(get_application_model())
class ApplicationAdmin(BaseApplicationAdmin, ModelAdmin):
    pass


admin.site.unregister(get_grant_model())


@admin.register(get_grant_model())
class GrantAdmin(BaseGrantAdmin, ModelAdmin):
    pass


admin.site.unregister(get_refresh_token_model())


@admin.register(get_refresh_token_model())
class RefreshTokenAdmin(BaseRefreshTokenAdmin, ModelAdmin):
    pass


admin.site.unregister(get_id_token_model())


@admin.register(get_id_token_model())
class IDTokenAdmin(BaseIDTokenAdmin, ModelAdmin):
    pass
