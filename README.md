# EPICONNECT4

Epiconnect4 is a small application to play connect4.

I did this small project on my free time without any knowledge of React Native.

The project is composed of 2 containers:
- A container with expo where the mobile application is developped.
- A container with express and socket.io which serve as a backend.

For now, the player can only play against an AI (which is made by [Wowol](https://github.com/Wowol/Connect4-AI))

Each time the player will launch a game, an AI will be launched as a child process and the player will play against it.

Each player have their own AI process to play with, hosted on the 'backend' container.

In the future, I plan to add more feature such as:
- User management (sign in, sign up)
- PvP in addition to PvE

## Installation

You will have to set your local IP adresse in the docker-compose.yml file:

```yaml
environment:
  - EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
  - REACT_NATIVE_PACKAGER_HOSTNAME={YOUR LOCAL IP ADDRESS}
```
Then, simply use docker-compose to start the project
```bash
docker-compose up
```

## Usage

When the containers are up and running, you will be shown a QR code that you will be able to scan on your phone.

It will open the application on your phone (Android or iOS) and you will be able to play.

Note that you need Expo Go installed on your phone, and to be on the same network as the PC hosting the containers.

## Contributing
Pull requests are welcome. I will be 

## License
[MIT](https://choosealicense.com/licenses/mit/)