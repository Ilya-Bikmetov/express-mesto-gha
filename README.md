[![Tests](https://github.com/Ilya-Bikmetov/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/Ilya-Bikmetov/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/Ilya-Bikmetov/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/Ilya-Bikmetov/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

**_Подготовлен backend для проекта место. В дальнейшем планируется объединить с frontend_**

## Обновлено:
Добавлены роуты для регистрации и авторизации пользователя.
При авторизации пользователь получает токен, который хранится в httpOnly cookies в течение 7 дней. Пароли хранятся в шифрованном виде. Для шифрования используется модуль `bcrypt`


### В проекте используется:

:white_check_mark: Framework `Express.js` для реализации сервера.  
:white_check_mark: `MongoDB` для хранения данных.  
:white_check_mark: `mongoose` для подключения к серверу mongo  
:white_check_mark: методы `CRUD`  
:white_check_mark: тип `ObjectId` и метод `populate` для настройки связей между схемами  
:white_check_mark: реализована обработка ошибок запросов  
:white_check_mark: добавлена предварительная валидация с использованием middleware `Celebrate`  
:white_check_mark: реализована централизованная обработка ошибок  


### Реализованы запросы по следующим роутам:

* `GET` /users — возвращает всех пользователей из базы.  
* `GET` /users/:userId — возвращает пользователя по _id.  
* `POST` /users — создаёт пользователя с переданными в теле запроса name , about и avatar.  
* `PATCH` /users/me — обновляет профиль пользователя.  
* `PATCH` /users/me/avatar — обновляет аватар пользователя.  
* `GET` /cards — возвращает все карточки из базы.  
* `POST` /cards — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для карточки.  
* `DELETE` /cards/:cardId — удаляет карточку по _id  
* `PUT` /cards/:cardId/likes — ставит лайк карточке.  
* `DELETE` /cards/:cardId/likes — убирает лайк с карточки.  
* `POST` /signup — регистрация пользователя.  
* `POST` /signin — вход пользователя.  

## Директории:

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
## Запуск проекта:

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
