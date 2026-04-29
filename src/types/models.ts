// TODO: Добавить EventType

export type CreateTrackingEventRequestDto = {
  clientId: string;
  sessionId: string;
  trackingCode: string;
  createdAt: string;
  pageUrl: string;
  pageTitle: string;
  referrer: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  browserLanguage: string;
};
