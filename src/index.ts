import { MetricaSender } from "./services/metrica-sender";
import { EventType } from "./types/enums";
import { IMetricaSender } from "./types/services";

type IMetricaTracker = {
  sendPageViewEvent: () => void;
  sendClickEvent: () => void;
};

export default class MetricaTracker implements IMetricaTracker {
  private metricaSender: IMetricaSender;

  constructor(endpoint: string, trackingCode: string) {
    this.metricaSender = new MetricaSender(endpoint, trackingCode);
  }

  sendPageViewEvent() {
    this.metricaSender.sendTrackingEvent(EventType.PAGEVIEW);
  }

  sendClickEvent() {
    this.metricaSender.sendTrackingEvent(EventType.CLICK);
  }
}
