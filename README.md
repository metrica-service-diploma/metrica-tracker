# Metrica Tracker Library

Библиотека, предназначенная для сбора пользовательских веб-метрик и их отправки в сервис аналитики.

## Установка трекера

```bash
npm install @nikitin_rus/metrica-tracker
```

## Подключение трекера к сайту

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Мой сайт</title>
    <!-- Подключаем трекер -->
    <script src="dist/metrica-tracker.min.js"></script>

    <script>
      // Инициализация трекера
      const tracker = new MetricaTracker({
        endpoint: "https://your-domain.com/api/track",
        trackingCode: "123",
      });
    </script>
  </head>
  <body>
    <h1>Мой сайт</h1>
    <button id="myButton">Нажми меня</button>
  </body>
</html>
```
