import { v4 as uuidv4 } from "uuid";

import { IStorageWorker } from "../types/services";
import {
  CLIENT_ID_COOKIE_KEY,
  LAST_ACTIVITY_COOKIE_KEY,
  SESSION_ID_COOKIE_KEY,
  SESSION_TIMEOUT,
} from "../utils/config";

export class StorageWorker implements IStorageWorker {
  /** Идентификатор клиента сайта */
  clientId = localStorage.getItem(CLIENT_ID_COOKIE_KEY);

  /** Идентификатор сессии клиента */
  sessionId = sessionStorage.getItem(SESSION_ID_COOKIE_KEY);

  /** Дата последней активности клиента */
  lastActivityDate = sessionStorage.getItem(LAST_ACTIVITY_COOKIE_KEY);

  /** Получение идентификаторов клиента */
  getStorageIds() {
    return {
      clientId: this.clientId,
      sessionId: this.sessionId,
    };
  }

  /** Обновление идентификаторов клиента */
  updateStorageIds() {
    const lastActivity = sessionStorage.getItem(LAST_ACTIVITY_COOKIE_KEY);

    if (!this.clientId) {
      this.createNewClientId();
    }

    if (this.sessionId && lastActivity) {
      const inactiveTime = Date.now() - parseInt(lastActivity);

      if (inactiveTime < SESSION_TIMEOUT) {
        // Сессия активна
        console.log(`Сессия активна: ${this.sessionId}`);
      } else {
        // Сессия истекла
        this.createNewSession();
        console.log("Сессия истекла, создана новая сессия");
      }
    } else {
      // Нет сессии
      this.createNewSession();
      console.log("Создана новая сессия");
    }
  }

  /** Создание нового clientId */
  private createNewClientId() {
    const newClientId = uuidv4();

    localStorage.setItem(CLIENT_ID_COOKIE_KEY, newClientId);
    this.clientId = newClientId;

    console.log(`Создан новый ClientId: ${newClientId}`);
  }

  /** Создание новой сессии клиента */
  private createNewSession() {
    const newSessionId = uuidv4();
    const lastActivityDate = Date.now().toString();

    sessionStorage.setItem(SESSION_ID_COOKIE_KEY, newSessionId);
    sessionStorage.setItem(LAST_ACTIVITY_COOKIE_KEY, lastActivityDate);

    this.sessionId = newSessionId;
    this.lastActivityDate = lastActivityDate;

    console.log(`Создан новый SessionId: ${newSessionId}`);
    console.log(`Дата последней активности: ${lastActivityDate}`);
  }
}
