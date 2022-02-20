# AirQi
![GitHub](https://img.shields.io/github/license/Firstbober/rasagi)

Simple web app to look up air quality for your city.

![Screenshot](https://cdn.discordapp.com/attachments/700816039004340284/945052565048000543/unknown.png)

## Hosting

Completing these steps will bring you a working instance of AirQi on most devices,
hosting it on Windows is technically possible but not tested.
I recommend getting a Raspberry Pi or some old computer to use it as a server.

```sh
git clone https://github.com/Firstbober/airqi
cd airqi
npm run build
npm run start
```

Changing server port is as easy as adding `PORT=<number>` variable into `.env` or before `npm run start` command.

## Feature requests
These should be placed in [issues tab](https://github.com/Firstbober/airqi/issues).

## Contribute
- Issue Tracker: https://github.com/Firstbober/airqi/issues
- Source Code: https://github.com/Firstbober/airqi

## License
The project is licensed under the GNU AGPL-3.0 license.