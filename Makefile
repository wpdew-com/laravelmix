# Имя проекта
PROJECT_NAME = my-laravel-mix-project

# Установка зависимостей
install:
	npm install --legacy-peer-deps

# Запуск разработки (автосборка при изменениях)
watch:
	npm run watch

# Обычная сборка (разработка)
build:
	npm run dev

# Production-сборка (минифицированные файлы)
prod:
	npm run prod

# Очистка кеша и node_modules (если нужно обновить зависимости)
clean:
	rm -rf node_modules package-lock.json
	npm cache clean --force

# Запуск всего проекта
start: install build
	@echo "🚀 Проект собран и готов!"

# Вывод доступных команд
help:
	@echo "Доступные команды:"
	@echo "  make install   - Установить зависимости"
	@echo "  make watch     - Запустить автосборку при изменениях"
	@echo "  make build     - Собрать проект (разработка)"
	@echo "  make prod      - Production-сборка"
	@echo "  make clean     - Очистить кеш и зависимости"
	@echo "  make start     - Установить и собрать проект"