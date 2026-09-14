# Backend info

## Stack
* Python
* PostgreSQL
* Alembic
* Pydantic
* Pytest
* SQLAlchemy
* Uvicorn

## Запуск проекта

1. Создать и инициализовать venv:

```bash
python3 -m venv .venv
source .venv/bin/activate # Windows: .venv/Scripts/activate
```

2. Установить зависимости из requirements.txt:

```bash
make install
```

3. Сконфигурируйте окружение:
```bash
cp .env.example .env
```

4. Создате локальную БД:
   * Linux:
     ```bash
     sudo -u postgres createdb fleunique_db
     ```
   * Windows:
     ```bash
     createdb -U postgres fleunique_db
     ```
   
     *(Либо, откройте pgAdmin 4, нажмите на Databases -> Create -> Database, и назовите `fleunique_db`)*

5. Примените миграции:
```bash
make migrate
```

6. Запустить сервер uvicorn:

```bash
make run
```

* API Base URL: http://locahost:8000/api/v1
* Swagger docs: http://locahost:8000/docs

## Архитектура проекта:

* app/api/ - тут находятся http хендлеры и роутинг
* app/core/ - конфигурация
* app/crud/ - только sqlalchemy запросы
* app/models/ - модели для сущностей БД которые используют sqlalchemmy как способ декларации
* app/schemas/ - валидация данных, структуры для реквестов и респонсов используя pydantic
* app/services/ - сервисный слой, тут бизнес логика, валидация 
* alembic/ - скрипты для миграций
* tests/ - юнит и интеграционные тесты

## Пример как выполнить задачу

1. **Настройка github**: переходите в main -> делайте git pull -> создайте ветку для вашей задачи (feature/228-products-crud) -> работаете в этой ветке
2. **Описание схемы**: создаете файл app/schemas/product.py -> описываете там базовую схему pydantic (например, ProductCreate и ProductUpdate наследуя от базовой)
3. **Работа с базой данных**: создаете файл app/crud/product.py -> пишите функцию для нужной операции (SELECT, INSERT, UPDATE, DELETE) используя sqlalchemy
4. **Бизнес логика**: создаете файл app/services/product.pu -> пишете функции которые вызывают методы из crud слоя -> добавляете проверки если они требуются
5. **Эндпоинты**: создаете файл app/api/products.py -> создаете инстанс APIRouter -> пишете сами обработчики и вызываете соотвeтствующую функцию из слоя сервиса.
6. **Подключение роутера**: открываете файл app/api/router.py -> импортируете туда свой роутер.
7. **Проверка и PR**: запускаете сервер -> проверяете работу через swagger -> если все работает, то делаете commit -> открываете pull request и ждете апрува от другого члена команды.
