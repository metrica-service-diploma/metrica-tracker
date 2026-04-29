import { EventType } from "../types/enums";
import { CreateTrackingEventRequestDto } from "../types/models";
import { IStorageWorker, IMetricaSender } from "../types/services";
import { getTrackingEventData } from "../utils/utils";
import { StorageWorker } from "./storage-worker";

export class MetricaSender implements IMetricaSender {
  /** Эндпоинт для отправки событий */
  private endpoint: string;

  /** Идентификатор отслеживаемого вебсайта, выдаваемый в сервисе метрики */
  private trackingCode: string;

  /** Хранилище идентификаторов клиента */
  private storageWorker: IStorageWorker;

  constructor(endpoint: string, trackingCode: string) {
    this.endpoint = endpoint;
    this.trackingCode = trackingCode;
    this.storageWorker = new StorageWorker();
  }

  // TODO: Добавить отправку поля EventType
  async sendTrackingEvent(eventType: EventType) {
    const trackingEventData = getTrackingEventData();

    // Актуализация и получение идентификаторов из куки
    this.storageWorker.updateStorageIds();
    const { clientId, sessionId } = this.storageWorker.getStorageIds();

    if (!clientId || !sessionId) {
      console.log(
        "Метрика не отправлена: отсутствуют идентификаторы clientId или sessionId в куки",
      );
      return;
    }

    const createTrackingEventRequestDto: CreateTrackingEventRequestDto = {
      clientId,
      sessionId,
      trackingCode: this.trackingCode,
      createdAt: new Date().toISOString(),
      ...trackingEventData,
    };

    if (
      !navigator.sendBeacon(
        this.endpoint,
        new Blob([JSON.stringify(createTrackingEventRequestDto)], {
          type: "application/json",
        }),
      )
    ) {
      console.warn("Метрика не была отправлена!");
    }
  }
}
