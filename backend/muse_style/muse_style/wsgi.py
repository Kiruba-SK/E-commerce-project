"""
WSGI config for muse_style project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# settings_module = 'muse_style.deployment_settings' if 'RENDER_EXTERNAL_HOSTNAME' in os.environ else 'muse_style.settings'

# If Railway sets an environment variable, detect it
if 'RAILWAY_ENVIRONMENT' in os.environ or 'DATABASE_URL' in os.environ:
    settings_module = 'muse_style.deployment_settings'
else:
    settings_module = 'muse_style.settings'
    
os.environ.setdefault('DJANGO_SETTINGS_MODULE',settings_module )

application = get_wsgi_application()
