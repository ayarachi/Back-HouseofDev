# Proyecto integrador HOUSE OF DEV

SCHEMA DESING https://dbdiagram.io/d/6373b8adc9abfc611172db50
Base de datos propiedades

Descripción del proyecto:
Crear una aplicación web, para una inmobiliaria, que tiene como objetivo el de poder agendar
una visita a las viviendas.

Stack de tecnologías involucradas:

Back End: Sequelize, Express, JWT.
Front End: React, Redux, Bootstrap (también podés trabajar con Tailwind, CSS o module

# Migrations

[Documentación principál](https://sequelize.org/docs/v6/other-topics/migrations/)

Crear una tabla:

```
npx sequelize-cli model:generate --name <nombre del modelo> --attributes <atributo1:typo1,atributo2:typo2,...>
```

Crear una migración vacia:

```
npx sequelize-cli migration:create --name <nombre de la migración>
```

Correr las migraciónes:

```
npx sequelize-cli db:migrate
```

Deshacer la ultima migración:

```
npx sequelize-cli db:migrate:undo
```

Deshacer todas las migraciónes:

```
npx sequelize-cli db:migrate:undo:all
```
