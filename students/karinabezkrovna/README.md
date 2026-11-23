# TaskFlow — DevOps Individual Project

Автор: Безкровна Каріна Євгеніївна

## Призначення

TaskFlow — REST API для керування завданнями.
Застосунок дозволяє створювати, переглядати,
завершувати та видаляти завдання.

## Технології

- Node.js
- Docker
- GitHub Actions
- Terraform
- AWS EC2

## API

GET / — інформація про застосунок
GET /health — перевірка роботи
GET /tasks — список завдань
POST /tasks — створення завдання
PATCH /tasks/:id — завершення завдання
DELETE /tasks/:id — видалення завдання

Дані зберігаються в оперативній пам'яті
та очищуються після перезапуску.

## Локальний запуск

З папки students/karinabezkrovna:

docker build -t karina-taskflow:1.0 .
docker run -d --name taskflow-local -p 3000:3000 karina-taskflow:1.0

Перевірка:
http://localhost:3000/health

## Тестування

npm install
npm test

## Змінні середовища

PORT — порт застосунку, стандартно 3000.
NODE_ENV — режим роботи, production у Docker.

## GitHub Secrets

DOCKER_USERNAME — логін Docker Hub.
DOCKER_TOKEN — токен Docker Hub.
AWS_ACCESS_KEY_ID — AWS IAM Access Key.
AWS_SECRET_ACCESS_KEY — AWS IAM Secret Key.
EC2_SSH_KEY_B64 — SSH-ключ у форматі Base64.
EC2_HOST — публічна IP-адреса сервера.
EC2_USER — ubuntu.

Секрети не зберігаються в репозиторії.

## Автоматичний деплой

1. Terraform створює AWS EC2 і Security Group.
2. GitHub Actions запускає тести.
3. Docker-образ збирається та завантажується у Docker Hub.
4. GitHub Actions підключається до EC2.
5. На сервері запускається Docker-контейнер.
6. Роботу перевіряють через /health.

Після перевірки інфраструктуру видаляють
командою terraform destroy.

## Структура

src/ — код застосунку
test/ — автоматичні тести
infra/ — Terraform
Dockerfile — контейнеризація
README.md — документація
