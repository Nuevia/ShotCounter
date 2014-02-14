ShotCounter - CalibrationUnit
===========
This hardware/software configuration is for gathering raw sensor data about different configurations of sensors, weapons, shooters, etc.  It consists of:

- The sensor unit is an MCU, sensors, and XBee transmitter
- A base station is an MCU, XBee receiver, relaying the data via serial port
- A Node.js application to recieve the data, persist to a database, and relay the data to a web browser via WebSockets
- A web application to assist in data entry and display of real-time data


