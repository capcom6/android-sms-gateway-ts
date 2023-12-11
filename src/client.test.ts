import { BASE_URL, Client } from './client';
import { Message, MessageState, ProcessState } from './domain';
import { HttpClient } from './http';

import { beforeEach, describe, expect, it, jest } from "bun:test";

describe('Client', () => {
    let client: Client;
    let mockHttpClient: HttpClient;

    beforeEach(() => {
        mockHttpClient = {
            get: jest.fn(),
            post: jest.fn(),
        };
        client = new Client('login', 'password', mockHttpClient);
    });

    it('sends a message', async () => {
        const message: Message = {
            message: 'Hello',
            phoneNumbers: ['+1234567890'],
        };
        const expectedState: MessageState = {
            id: '123',
            state: ProcessState.Pending,
            recipients: [
                {
                    phoneNumber: '+1234567890',
                    state: ProcessState.Pending,
                }
            ]
        };

        mockHttpClient.post.mockResolvedValue(expectedState);

        const result = await client.send(message);

        expect(mockHttpClient.post).toHaveBeenCalledWith(
            `${BASE_URL}/message`,
            message,
            {
                "Content-Type": "application/json",
                "User-Agent": "android-sms-gateway/1.0 (client; js)",
                Authorization: expect.any(String),
            },
        );
        expect(result).toBe(expectedState);
    });

    it('gets the state of a message', async () => {
        const messageId = '123';
        const expectedState: MessageState = {
            id: '123',
            state: ProcessState.Pending,
            recipients: [
                {
                    phoneNumber: '+1234567890',
                    state: ProcessState.Pending,
                }
            ]
        };

        mockHttpClient.get.mockResolvedValue(expectedState);

        const result = await client.getState(messageId);

        expect(mockHttpClient.get).toHaveBeenCalledWith(
            `${BASE_URL}/message/${messageId}`,
            {
                "User-Agent": "android-sms-gateway/1.0 (client; js)",
                Authorization: expect.any(String),
            },
        );
        expect(result).toBe(expectedState);
    });
});