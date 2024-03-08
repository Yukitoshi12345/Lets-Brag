![CSS](https://img.shields.io/badge/CSS-red) ![JavaScript](https://img.shields.io/badge/JavaScript-orange) ![Node.js](https://img.shields.io/badge/Node.js-blue) ![Bcrypt@5.1.1](https://img.shields.io/badge/Bcrypt@5.1.1-gold) ![Express.js@4.18.2](https://img.shields.io/badge/Express.js@4.18.2-purple) ![Express-Handlebars@7.1.2](https://img.shields.io/badge/Express_Handlebars@7.1.2-hotpink) ![Express-Session@1.18.0](https://img.shields.io/badge/Express_Session@1.18.0-sandybrown) ![MySQL2@3.9.1](https://img.shields.io/badge/MySQL2@3.9.1-lightgreen) ![Sequelize@6.37.1](https://img.shields.io/badge/Sequelize@6.37.1-lightblue) ![Connect-Session-Sequelize@7.1.7](https://img.shields.io/badge/Connect_Session_Sequelize@7.1.7-lavender) ![Dotenv@16.4.5](https://img.shields.io/badge/Dotenv@16.4.5-grey) 

<h1 align ="center">Let's Brag!</h1>

Tired of keeping your achievements under wraps? Introducing Let’s Brag, the social media platform dedicated to celebrating your wins, big and small. Share your accomplishments, travel adventures, and anything else you are proud of with a community that encourages self-expression and positive vibes. Earn “brag points” for your posts, with the top 3 users taking centre stage on the front page to inspire others and soak up some well-deserved recognition. Let’s Brag: where your achievements shine bright.


## Table of Contents
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Test Instruction](#test-instruction)
- [Screenshots](#screenshots)
- [Overview](#overview)
- [Contribution/Roles](#contributionroles)
- [Installation Instruction](#installation-instruction)
- [License](#license)

## User Story

```md
As a driven individual who thrives on recognition
I want a user-friendly social media platform dedicated to celebrating achievements, where I can share my successes and experiences with a supportive community.
So that I can receive positive feedback, inspire others, and feel a sense of belonging.
```

## Acceptance Criteria

```md
**Initial Visit**
GIVEN I visit the Let's Brag website for the first time,
WHEN I land on the homepage,
THEN I am greeted by the main page showcasing other users' achievements and travels, with a picture prominently displayed on the top right.

**Login and Sign up**
WHEN I click the login option,
THEN it will show two options: one for dashboard and one for sign up.
WHEN I click the option of login,
THEN I am taken to the login page where I can create an account using my email.
WHEN I finish signing up,
THEN I am brought to the dashboard page.

**Creating Brags**
When I click the create post button on the dashboard,
THEN the Let's Brag website opens my photo gallery, allowing me to choose an image to share alongside my achievements.
THEN I can type my achievements as a title and post description with the provided text boxes on the page.
WHEN I try to put a post title and description on my post,
THEN the title and/or the description text box expands and becomes fully editable, depending on which one I hover over or click, allowing me to type my post title and/or description.

**Dashboard and Post Management**
WHEN I click the dashboard option from the main page after logging in,
THEN I am brought to the dashboard page.
WHEN I am in the dashboard page after posting something,
THEN I can view my own post, and also update and delete the post of my choosing.

**Viewing and Interacting with Posts**
When I click one of the posts presented in the main page,
Then I can see more details regarding the post itself, such as the poster's name, post description, post ratings represented by stars, and a comments box.
When I click the heart icon for the ratings within a post,
Then I can give a rating for the post itself, ranging from 1 heart to 5 hearts.
When I try to comment on the post,
Then the comment text box expands and becomes fully editable, allowing me to type my comment.

**Bonus Feature: The Brag Spotlight**
Keep an eye out for a dedicated section on the homepage.
Here, Let's Brag recognises the top 3 users with the most "brag points" earned through post ratings and interactions.
```

## Technologies Used 
- CSS
- JavaScript
- Node.js
- Bcrypt (version 5.1.1)
- CORS (version 2.8.5)
- Dayjs (version 1.11.10)
- Express.js (version 4.18.2)
- Express-Handlebars (version 7.1.2)
- Express-Session (version 1.18.0)
- Multer (version 1.4.5-lts.1)
- MySQL2 (version 3.9.1)
- Sequelize (version 6.37.1)
- Connect Session Sequelize (version 7.1.7)
- Dotenv (version 16.4.5)

## Development Dependencies Used
- Tailwindcss (version 3.4.1)
- @Tailwindcss/typography (version 0.5.19)
- Daisyui (version 4.7.2)
- Eslint (version 8.57.0)
- Eslint Config Prettier (version 9.1.0)
- Prettier (version 3.2.5)
- Nodemon (version 3.1.0)

## Installation Instruction

- [Install nodejs and npm](https://nodejs.org/en/download)
- [Install Insomnia](https://insomnia.rest/download)
- [Install MySQL](https://dev.mysql.com/downloads/mysql/)

## Usage

| Steps            | Details                                                        |
| ---------------- | -------------------------------------------------------------- |
| Live application | [Let's Brag!](https://yukitoshi12345.github.io/lets-brag/) |
| Clone this repo  | ` git clone git@github.com:Yukitoshi12345/lets-brag.git` |
| run on vs        | `cd ..`                                                        |

## Test Instruction

To use this project,

- Get a copy of this repo to your local machine.
- Install the Node Module
```
npm install
```
- Change the .env copy file to .env and insert your database password
- And, start the `Express Server` by typing in the following:
```
npm run start
```
- Go to this link: http://localhost:3001

## Screenshots

![]()

## Overview

## Contribution/Roles

| Contributors                                                 | Roles | Task                           |
| ------------------------------------------------------------ | ----- | ------------------------------ |
| [Yukitoshi Imaizumi-Zhou](https://github.com/yukitoshi12345) | Project Manager & Full-Stack Developer  | - Assigned Tasks and Managed Progress <br> - Created and Maintained Github Repository <br> - Created and Completed README <br> - Models and Controllers<br> - Login, Post-Detail, and Post-Detail Comment Card Handlebars <br> - Prepared Presentation Slideshow  |
| [Andrii Medvediev](https://github.com/AndriiMedvediev987)                              | Full-Stack Developer  | - Models and Controllers <br> - Seeds Completed <br> - Configuration Completed                        |
| [Jonathan Santoso](https://github.com/Johnnnnnnnnnnnnnnnnnnnnnn)                              | Full-Stack Developer  | - Models and Controllers <br> - Usage of New Package: Multer <br> - Completed server.js <br> - Prepared Presentation Slideshow                 |
| [Suyash Maharjan](https://github.com/simplesuyash)                              | UI Designer & Full-Stack Developer  | - Lead Coding Team <br> - Developed User Interface (Tailwind and DaisyUI) <br> - Models and Controllers <br> - Views Completed and Functioning <br> - Scripts Completed <br> - Resolving Errors and Issues     |

_The roles mentioned above are rough representation of individual member's tasks. Throughout the project, we all collaborated and contributed to each other's coding._


## License

This project is licensed under the [MIT License](https://github.com/Yukitoshi12345/lets-brag/blob/main/LICENSE).
