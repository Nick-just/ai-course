# Playwright CI: Проверка GitHub Actions

Этот проект содержит workflow для запуска Playwright тестов на Pull Request в ветку `master`.

## Что уже настроено

- Workflow: `.github/workflows/playwright-tests.yml`
- Триггер: `pull_request` в `master`
- Среда: `ubuntu-latest`, Node LTS, кэш Yarn
- Запуск тестов: `yarn playwright test`
- Артефакты (всегда):
  - `playwright-html-report`
  - `playwright-traces`
- Уведомление Teams: `mock`-шаг (без реальной отправки)

## Как проверить, что Actions работает

1. Создайте новую ветку и внесите любое изменение (например, в `README.md`).
2. Запушьте ветку в GitHub.
3. Откройте Pull Request в ветку `master`.
4. Перейдите во вкладку `Actions` и откройте workflow **Playwright Tests**.
5. Дождитесь завершения job `playwright-tests`.

## Что проверить в run

- Шаги выполняются в порядке:
  - Checkout
  - Setup Node
  - Install dependencies
  - Install Playwright
  - Run tests
  - Upload artifacts
- Внизу run доступны артефакты:
  - `playwright-html-report`
  - `playwright-traces`

## Как проверить mock Teams уведомление

Шаг `Notify Teams on failure` запускается только при падении workflow (`if: failure()`).

Чтобы увидеть его в действии:

1. Временно добавьте падающий тест в `tests/`.
2. Запушьте изменения в PR.
3. После падения откройте лог шага `Notify Teams on failure`.
4. Убедитесь, что в логе есть:
   - PR title
   - PR author
   - branch
   - ссылка на workflow run

## Нужны ли GitHub Secrets

Для текущего mock-сценария секреты не нужны.

`TEAMS_WEBHOOK_URL` понадобится только если заменить mock-шаг на реальный `curl` запрос в Teams webhook.
