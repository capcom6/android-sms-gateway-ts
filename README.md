# Android SMS Gateway JS/TS API Client

This is a JavaScript/TypeScript client library for interfacing with the [Android SMS Gateway API](https://sms.capcom.me).

## Features

- Send SMS messages with a simple method call.
- Check the state of sent messages.
- Customizable base URL for use with local or cloud servers.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a basic understanding of JavaScript and Node.js.
- You have Node.js and npm installed on your local machine.

## Installation

To install the SMS Gateway API Client, run this command in your terminal:

```bash
npm install android-sms-gateway
```

## Usage

Here's how to get started with the SMS Gateway API Client:

1. Import the `Client` class from the library.
2. Create an instance of `Client` with your login credentials.
3. Use the `send` method to send an SMS message.
4. Use the `getState` method to check the status of a sent message.

```javascript
import Client from "android-sms-gateway";

// Example of an HTTP client based on fetch
const httpFetchClient = {
    get: async (url, headers) => {
        const response = await fetch(url, {
            method: "GET",
            headers
        });

        return response.json();
    },
    post: async (url, body, headers) => {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });

        return response.json();
    }
};

// Initialize the client with your API credentials
const apiClient = new Client('your_login', 'your_password', httpFetchClient);

// Example: Send an SMS message
const message = {
    phoneNumbers: ['+1234567890', '+9876543210'],
    message: 'Your SMS message text here'
};

apiClient.send(message)
    .then(messageState => console.log(messageState))
    .catch(error => console.error(error));

// Example: Get the state of an SMS message
const messageId = 'your_message_id';

apiClient.getState(messageId)
    .then(messageState => console.log(messageState))
    .catch(error => console.error(error));
```

## API Reference

For more information on the API endpoints and data structures, please consult the [Android SMS Gateway API documentation](https://sms.capcom.me/api/).

# Contributing

Contributions are welcome! Please submit a pull request or create an issue for anything you'd like to add or change.

# License

This library is open-sourced software licensed under the [Apache-2.0 license](LICENSE).