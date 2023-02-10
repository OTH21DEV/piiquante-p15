[![MADE WITH - JAVASCRIPT](https://img.shields.io/badge/MADE_WITH-JAVASCRIPT-1D75C2?style=for-the-badge)](https://) [![DATA - MONGODB ATLAS](https://img.shields.io/badge/DATA-MONGODB_ATLAS-116149?style=for-the-badge)](https://) [![USES - EXPRESS](https://img.shields.io/badge/USES-EXPRESS-ff69b4?style=for-the-badge)](https://)


# PIIQUANTE - back-end web development using Express, Mongo DB Atlas and Node.js

This repo contains all the source code to run the micro API for the gourmet app allowing to post, delete, notate, modify the content by the authentified users.

Front-end is forked from https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git

## 1. General information


### 2.1 Prerequisites

- [NodeJS (**version 12.18**)](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

If you are working with several versions of NodeJS, we recommend you install [nvm](https://github.com/nvm-sh/nvm). This tool will allow you to easily manage your NodeJS versions.

### 2.2 Launching the project

- Fork the repository
- Clone it on your computer.
- The `yarn` command will allow you to install the dependencies.
- The `yarn dev` command will allow you to run the micro API.


## 4. Endpoints

### 4.1 Possible endpoints

This project includes four endpoints that you will be able to use: 

- `http://localhost:3000/user/${userId}` - retrieves information from a user. This first endpoint includes the user id, user information (first name, last name and age), the current day's score (todayScore) and key data (calorie, macronutrient, etc.).
- `http://localhost:3000/user/${userId}/activity` - retrieves a user's activity day by day with kilograms and calories.
- `http://localhost:3000/user/${userId}/average-sessions` - retrieves the average sessions of a user per day. The week starts on Monday.
- `http://localhost:3000/user/${userId}/performance` - retrieves a user's performance (energy, endurance, etc.).


**Warning, currently only two users have been mocked. They have userId 12 and 18 respectively.**

### 4.2 Examples of queries

- `http://localhost:3000/user/12/performance` - Retrieves the performance of the user with id 12
- `http://localhost:3000/user/18` - Retrieves user 18's main information.
