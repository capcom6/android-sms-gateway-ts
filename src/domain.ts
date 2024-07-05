

export enum ProcessState {
    Pending = "Pending",
    Processed = "Processed",
    Sent = "Sent",
    Delivered = "Delivered",
    Failed = "Failed",
}

/**
 * Represents the state of a recipient of an SMS message.
 */
export interface RecipientState {
    /**
     * The phone number of the recipient.
     */
    phoneNumber: string;

    /**
     * The state of the recipient.
     */
    state: ProcessState;

    /**
     * An optional error message, if the recipient failed to receive the message.
     */
    error?: string | null;
}

/**
 * Represents the state of an SMS message.
 */
export interface MessageState {
    /**
     * The ID of the message.
     */
    id: string;

    /**
     * The state of the message.
     */
    state: ProcessState;

    /**
     * The list of recipients' states for the message.
     */
    recipients: RecipientState[];
}

/**
 * Represents an SMS message.
 */
export interface Message {
    /**
     * The ID of the message, will be generated if not provided.
     * @default null
     */
    id?: string | null;

    /**
     * The message content.
     */
    message: string;

    /**
     * The time-to-live (TTL) of the message in seconds.
     * If set to null, the message will not expire.
     * @default null
     */
    ttl?: number | null;

    /**
     * The phone numbers to send the message to.
     */
    phoneNumbers: string[];

    /**
     * The SIM number to send the message from.
     * If not specified, the message will be sent from the default SIM.
     * @default null
     */
    simNumber?: number | null;

    /**
     * Whether to include a delivery report for the message.
     * @default true
     */
    withDeliveryReport?: boolean | null;
}

/**
 * Represents the type of events that can trigger a webhook.
 */
export enum WebHookEventType {
    /**
     * Indicates that a new SMS message has been received.
     */
    SmsReceived = 'sms:received',

    /**
     * Indicates that a ping request has been sent.
     */
    SystemPing = 'system:ping',
}

/**
 * Represents a request to create or update a webhook.
 */
export interface RegisterWebHookRequest {
    /**
     * The ID of the webhook.
     * If not specified, a new ID will be generated.
     * @default null
     */
    id?: string | null;

    /**
     * The event type that triggers the webhook.
     */
    event: WebHookEventType;

    /**
     * The URL to send the webhook request to.
     */
    url: string;
}

/**
 * Represents a webhook configuration.
 * @see RegisterWebHookRequest
 */
export type WebHook = Required<RegisterWebHookRequest>;

export type WebHookEvent = {
    id: string;
    webhookId: string;
    deviceId: string;
} & WebHookPayload

/**
 * Represents the payload of a webhook event.
 */
export type WebHookPayload =
    /**
     * Represents the payload of a webhook event of type `SmsReceived`.
     */
    {
        /**
         * The event type.
         */
        event: WebHookEventType.SmsReceived;

        /**
         * The payload of the event.
         */
        payload: {
            /**
             * The received message.
             */
            message: string;

            /**
             * The phone number of the sender.
             */
            phoneNumber: string;

            /**
             * The date and time of when the message was received.
             */
            receivedAt: string;
        };
    } |
    /**
     * Represents the payload of a webhook event of type `SystemPing`.
     */
    {
        /**
         * The event type.
         */
        event: WebHookEventType.SystemPing;

        /**
         * The payload of the event.
         * This is an empty object.
         */
        payload: EmptyObject;
    };

type EmptyObject = {
    [K in any]: never
}
