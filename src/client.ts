import { Message, MessageState, RegisterWebHookRequest, WebHook } from "./domain";
import { HttpClient } from "./http";

export const BASE_URL = "https://sms.capcom.me/api/3rdparty/v1";

export class Client {
    private baseUrl: string;
    private httpClient: HttpClient;
    private defaultHeaders: Record<string, string>;

    constructor(login: string, password: string, httpClient: HttpClient, baseUrl = BASE_URL) {
        this.baseUrl = baseUrl;
        this.httpClient = httpClient;
        this.defaultHeaders = {
            "User-Agent": "android-sms-gateway/1.0 (client; js)",
            "Authorization": `Basic ${btoa(`${login}:${password}`)}`,
        }
    }

    async send(request: Message): Promise<MessageState> {
        const url = `${this.baseUrl}/message`;
        const headers = {
            "Content-Type": "application/json",
            ...this.defaultHeaders,
        };

        return this.httpClient.post<MessageState>(url, request, headers);
    }

    async getState(messageId: string): Promise<MessageState> {
        const url = `${this.baseUrl}/message/${messageId}`;
        const headers = {
            ...this.defaultHeaders,
        };

        return this.httpClient.get<MessageState>(url, headers);
    }

    async getWebhooks(): Promise<WebHook[]> {
        const url = `${this.baseUrl}/webhooks`;
        const headers = {
            ...this.defaultHeaders,
        };

        return this.httpClient.get<WebHook[]>(url, headers);
    }

    async registerWebhook(request: RegisterWebHookRequest): Promise<WebHook> {
        const url = `${this.baseUrl}/webhooks`;
        const headers = {
            "Content-Type": "application/json",
            ...this.defaultHeaders,
        };

        return this.httpClient.post<WebHook>(url, request, headers);
    }

    async deleteWebhook(webhookId: string): Promise<void> {
        const url = `${this.baseUrl}/webhooks/${webhookId}`;
        const headers = {
            ...this.defaultHeaders,
        };

        return this.httpClient.delete<void>(url, headers);
    }
}