# Algorand Authentication Service

- [Vision](VISION.md)
- [Architecture Diagram](ARCHITECTURE.md)
- [Sequence Diagram](SEQUENCE.md)
- [Decisions](.decisions/README.md)

# Overview

This project holds the standard FIDO2 api endpoints and the Proof of Knowledge for Algorand specific private keys. 
The api is a stateful session-based architecture with endpoint guards. 
A user must prove ownership of a private key to associate PublicKeyCredentials



## Getting started

### Prerequisites
- Node.js 20
- Docker

#### Clone the project

```bash
git clone git@github.com:algorandfoundation/liquid-auth.git && cd liquid-auth
```

#### Install package dependencies

```bash
npm install
```

#### Build Dependencies

```bash
npm run build
```

WebAuthn requires a secure context (HTTPS) to work and this will not allow you to test the FIDO2 feature in your local machine.

### NGROK

Sign up for a free account at [ngrok](https://ngrok.com/) and install the ngrok package.
Configure a Static Domain for your ngrok account and update the [.env](services/liquid-auth-api-js/README.md) file with the following keys with the values from ngrok:


#### Configure NGROK

```bash
cp ./ngrok.template.yml ngrok.yml
```

Make sure to update the `authtoken` and `domain` in the `ngrok.yml` file with your ngrok details.

```yaml
version: 2
authtoken: <NGROK_AUTH_TOKEN>
tunnels:
  website:
    addr: 5173
    proto: http
    domain: <STATIC_DOMAIN>

```

#### Update the Service's .docker.env file

```bash
HOSTNAME=example-static-domain.ngrok-free.app
ORIGIN=https://example-static-domain.ngrok-free.app
```

#### Start services

Run the following command to start the backend:

```bash
docker-compose up -d
```

Navigate to the ngrok URL in your browser to test the FIDO2 feature.


## Using the app

#### Install the [Android client]() to your device and navigate to https://nest-fido2.onrender.com/.

![Step-1.png](.docs%2FStep-1.png)

#### Open the Connect Modal and scan the QR code using the "Connect" button on the Android device

![Step-1-QRCode.png](.docs%2FStep-1-QRCode.png)

#### Register a credential on the Android device

![Step-2.png](.docs%2FStep-2.png)

#### If registration is successful, you can test the credential in the browser

![Step-3.png](.docs%2FStep-3.png)

# Requirements [WIP]
