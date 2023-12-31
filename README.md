# articles
A simple full-stack application created as a test task. (CRUD posts, comments, analytics)

# Клиент на React + Redux + Router
**Демо версия**:
https://suvmer.github.io/articles/

Исходный код:
https://github.com/suvmer/articles/tree/master/client_react

**Важно:** из-за развёртки демо на GitHub Pages, которые не поддерживают в полной мере SPA, **нельзя перезагружать страницы**, кроме главной(https://suvmer.github.io/articles/)

При запуске проекта в окружении, поддерживающим Single Page Application, роутинг работает корректно.

![Screenshot](articles_react.png)

# Клиент на Vue 3 + vuex + Vuetify
Исходный код:
https://github.com/suvmer/articles/tree/master/client

![Screenshot](articles.png)

# Как подготовить проект перед запуском:
1. Указать данные для подключения к БД в ~/server/config/config.js
2. Выполнить миграции и сиды(находясь в папке server):
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
3. Указать адрес сервера API_URL в client/.env

# Описание задания: Статьи

## Backend приложение

### Этапы выполнения задания:
1. Проинициализировать новое nodejs приложение и установить пакеты express, sequelize, остальное по желанию

    1. Описать с помощью библиотеки sequelize модели, миграции и сиды для 2 сущностей, в качестве бд использовать PostgreSQL:

       Статьи:
       - ID
       - Название
       - Текст статьи
       - Дата создания
       - Дата модификации

       Комментарии:
       - ID
       - Текст комментария
       - ID Статьи
       - Дата создания
       - Дата модификации

    1. Реализовать CRUD для статьи (для body: content-type = application/json)
        - C - POST /article/
        - R - GET /article/#ID#/, GET /articles/
        - U - PATCH /article/#ID#/
        - D - DELETE /article/#ID#/

    1. Реализовать CRUD для комментария (для body: content-type = application/json)
        - C - POST /article/#ID#/comment/
        - R - GET /article/#ID#/comment/#COMMENT_ID#/, GET /article/#ID#/comments/
        - U - PATCH /article/#ID#/comment/#COMMENT_ID#/
        - D - DELETE /article/#ID#/comment/#COMMENT_ID#/

    1. Реализовать метод получения комментариев за период с группировкой по статьям в которых они были оставлены

       GET /analytic/comments/?dateFrom=#timestamp#&dateTo=#timestamp#

## Frontend приложение

### Этапы выполнения задания:

1. Проинциализировать новое vuejs приложение, установить vue-router, vuex, axios остальное по желанию

1. Реализовать компонент формы добавления/редактирования статьи

1. Реализовать компонент списка комментариев к статье(с кнопками удаления/редактирования комментария)

1. Реализовать компонент добавления комментария

1. Реализовать компонент просмотра статьи с комментариями(пункты 2 и 3 + кнопки удаления/редактирования статьи добавить)

1. Реализовать компонент списка статей(обычная таблица)

1. Реализовать компонент для вывода комментариев за определенный период(2 поля фильтрации по дате + список комментариев сгруппированных по статьям)

1. Настроить интеграцию frontend приложения с backend приложением(для запросов использовать axios, данные хранить в state vuex(ну и соответственно использовать actions, mutations))