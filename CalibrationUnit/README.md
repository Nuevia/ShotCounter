ShotCounter - CalibrationUnit
===========
This hardware/software configuration is for gathering raw sensor data about different configurations of sensors, weapons, shooters, etc.  It consists of:

- The sensor unit is an MCU, sensors, and bluetooth transmitter
- A base station is a laptop, with bluetooth transceiver
- A Node.js application to recieve the data, persist to a database, and relay the data to a web browser via WebSockets
- A browser application to assist in data entry, sensor settings and display of real-time data


