![CSS](https://img.shields.io/badge/CSS-red) ![JavaScript](https://img.shields.io/badge/JavaScript-orange) ![Node.js](https://img.shields.io/badge/Node.js-blue) ![Bcrypt@5.1.1](https://img.shields.io/badge/Bcrypt@5.1.1-gold) ![CORS@2.8.5](https://img.shields.io/badge/CORS@2.8.5-firebrick) ![Day.js@1.11.10](https://img.shields.io/badge/Day.js@1.11.10-deepskyblue) ![Express.js@4.18.2](https://img.shields.io/badge/Express.js@4.18.2-purple) ![Express-Handlebars@7.1.2](https://img.shields.io/badge/Express_Handlebars@7.1.2-hotpink) ![Express-Session@1.18.0](https://img.shields.io/badge/Express_Session@1.18.0-sandybrown) ![Multer@1.4.5](https://img.shields.io/badge/Multer@1.4.5-lightcoral) ![MySQL2@3.9.1](https://img.shields.io/badge/MySQL2@3.9.1-lightgreen) ![Sequelize@6.37.1](https://img.shields.io/badge/Sequelize@6.37.1-lightblue) ![Connect-Session-Sequelize@7.1.7](https://img.shields.io/badge/Connect_Session_Sequelize@7.1.7-lavender) ![Dotenv@16.4.5](https://img.shields.io/badge/Dotenv@16.4.5-grey) 

<h1 align ="center">Let's Brag!</h1>

Tired of keeping your achievements under wraps and feeling like your victories go unnoticed? Let's Brag is here to change that! It's the social media platform designed specifically for celebrating your wins, big and small. Whether you aced that presentation at work, finally mastered that yoga pose, or embarked on the dream vacation you've been saving for, Let's Brag is your space to share it all with a supportive community that thrives on positive vibes and self-expression.

But Let's Brag isn't just about sharing your accomplishments – it's about celebrating them! Get ready to earn "brag points" for every post you create, comment you receive, and like you give. The top 3 users with the most brag points will be catapulted to the front page, inspiring others and basking in some well-deserved recognition. So, ditch the FOMO and join the Let's Brag movement! It's where your achievements shine bright and your self-confidence soars.


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
- Day.js (version 1.11.10)
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

## Usage

| Steps            | Details                                                        |
| ---------------- | -------------------------------------------------------------- |
| Live application | [Let's Brag!](https://yukitoshi12345.github.io/lets-brag/) |
| Clone this repo  | ` git clone git@github.com:Yukitoshi12345/lets-brag.git` |
| run on vs        | `cd ..`                                                        |
## Installation Instruction

- [Install nodejs and npm](https://nodejs.org/en/download)
- [Install MySQL](https://dev.mysql.com/downloads/mysql/)

## Test Instruction

To use this project:

- Get a copy of this repo to your local machine.
- Install the `Node Module`
```
npm install
```
- Install `MySQL2`
- Change the .env copy file to .env and insert your database password
- And, start the `Express Server` by typing in the following:
```
npm run start
```
- Go to this link: http://localhost:3001

## Screenshots

![]()

## Overview

#### Features:

- 
- 

#### Motivation For Development:

Our motivation to develop this project is to create a safe space for high achievers. On traditional social media platforms such as Facebook and Instagram, celebrating your wins can sometimes feel like bragging, leading to negativity or awkwardness. We wanted to change that. Let's Brag is a haven for those who crave a platform to freely share their accomplishments, without fear of judgment. It's a community built on encouragement and positive vibes, where high achievers can celebrate their victories and inspire others on their journeys.

#### Challenges:

- Merge Conflict
- Time Limit
- Multer Issue
- Availabilities Issues

#### Successes:

- Learnt multer
- Got a full grasp understanding of MVC
- Overcoming slow start
- We were able to satisfy the acceptance criteria we set out to satisfy
- Gaining confidence from working as a group

## Contribution/Roles

| Contributors                                                 | Roles | Task                           |
| ------------------------------------------------------------ | ----- | ------------------------------ |
| [Yukitoshi Imaizumi-Zhou](https://github.com/yukitoshi12345) | Project Manager & Full-Stack Developer  | - Assigned Tasks and Managed Progress <br> - Created and Maintained Github Repository <br> - Created and Completed README <br> - Contributed Models and Controllers<br> - Login, Post-Detail, and Post-Detail Comment Card Handlebars <br> - Completed server.js |
| [Andrii Medvediev](https://github.com/AndriiMedvediev987)                              | Full-Stack Developer  | - Contributed Models and Controllers <br> - Seeds Completed <br> - Configuration Completed                        |
| [Jonathan Santoso](https://github.com/Johnnnnnnnnnnnnnnnnnnnnnn)                              | Full-Stack Developer  | - Contributed Models and Controllers <br> - Usage of New Package: Multer <br> - Assisted with Scripts <br> - Prepared Presentation Slideshow                 |
| [Suyash Maharjan](https://github.com/simplesuyash)                              | UI Designer & Full-Stack Developer  | - Lead Coding Team <br> - Developed User Interface (Tailwind and DaisyUI) <br> - Contributed Models and Controllers <br> - Views Completed and Functioning <br> - Scripts Completed <br> - Resolving Errors and Issues     |


_The roles mentioned above are rough representation of individual member's tasks. Throughout the project, we all collaborated and contributed to each other's coding._


## License

This project is licensed under the [MIT License](https://github.com/Yukitoshi12345/lets-brag/blob/main/LICENSE).
