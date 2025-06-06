# Generated by Django 5.2 on 2025-05-05 11:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiApp', '0004_alter_productimage_products'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='products',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='apiApp.products'),
        ),
    ]
