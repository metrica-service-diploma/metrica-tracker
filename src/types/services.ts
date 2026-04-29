import { EventType } from "./enums";

export interface IMetricaSender {
  sendTrackingEvent: (eventType: EventType) => void;
}

export type StorageIds = {
  clientId: string | null;
  sessionId: string | null;
};

export interface IStorageWorker {
  getStorageIds: () => StorageIds;
  updateStorageIds: () => void;
}
