export enum ProcessState {
    Pending = "Pending",
    Processed = "Processed",
    Sent = "Sent",
    Delivered = "Delivered",
    Failed = "Failed",
}

export interface RecipientState {
    phoneNumber: string;
    state: ProcessState;
    error?: string | null;
}

export interface MessageState {
    id: string;
    state: ProcessState;
    recipients: RecipientState[];
}

export interface Message {
    id?: string | null;
    message: string;
    ttl?: number | null;
    phoneNumbers: string[];
    simNumber?: number | null;
    withDeliveryReport?: boolean | null;
}