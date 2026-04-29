/** Получение трекинговых данных из браузера */
export const getTrackingEventData = () => ({
  pageUrl: window.location.href,
  pageTitle: document.title,
  referrer: document.referrer,
  userAgent: navigator.userAgent,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  browserLanguage: navigator.language,
});
