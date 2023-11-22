# Deckbuilder

## Introduction

This project is a deckbuilding application for the game Hearthstone. The database has been created by scraping the [Hearthstone API](https://hearthstoneapi.com/) before using a custom Python script to clean the data. The main page loads different cards for the user to look at and add to their decks by hittng the plus button. The users can filter and search for cards to find the card they're looking for. Users may also click on a card or hover over the image to get more info about a card.

In the /decks page, users can look at their decks and see which cards are in each deck. To access this page, users must be authenticated. If a user is not authenticated they're redirected to the login page. Here they can either log in or hit the "create account" link to create their own account. Users are then stored in the database with their password hashed and we return a JWT token to the user that is stored in their localstorage and is valid for 2 hours.

The project's styling mostly comes from the component library PrimeReact and we use PrimeFlex as our utility library. PrimeFlex is very similar to Tailwind which is why the syntax will probably be familiar to a lot of people.

## Supported browsers

The project does not support Mozilla FireFox. It is currently only confirmed working on Google Chrome. We also recommend disabling adblock as it may interfere with certain calls. Some adblocks, for instance, may result in CORS errors.

## How to run the project

The project assumes the user has Node v.20.6.0 or higher. The project is also reliant on a MongoDB database which the user has to initialize with card data. We no longer store the card data in Gitlab as a huge json file is not ideal for storing and merging in Git. Looking at the Hearthstone API documentation can give users a good idea of how cards should be filled into the database, although we highly recommend testing out the project in our VM instead of running it locally.

The repository is split into two parts: client and server. This is because we want the frontend to be as independent as possible of the backend. Subsequently after cloning the project users have to cd into both the client and the server directory, for instance using a split terminal. In the server folder, the server can be initialized using the command "npm start" and in the client folder the command is "npm run dev". To run the server you also need a .env file in the server folder created by yourself. We do not store this in Gitlab for security reasons as well as to allow users to select their own ports. Your .env file should look like this:

```
PORT = 4000
MONGOOSE_URI = mongodb://localhost:27017/Hearthstone
JWT_SECRET = TotallySecretJWT

```

You can replace port with whatever port you want (although we highly recommend using a port above 1024 due to Linux constraints). You also need to update references to port 4000 in the code. MONGOOSE_URI will be your MongoDB connect URI. JWT_SECRET can be literally anything you want, but we highly recommend choosing something random (and definitely not TotallySecretJWT).

## Folder structure

In client/src components are placed into the components folder. Components are reusable pieces and are not used to construct their own page. In our case, CardView is an essential component that renders CardItem components.

App.tsx is used for routing between pages and isn't really a page on its own. That's why it's not within the pages folder. This file is useful to visit if you wonder how routing works in this project.

Services are used to help other components etc. For instance CardService.tsx is a service for conducting card queries and RequireAuth is a wrapper used in App for pages like /decks that require users to be authenticated to access.

## Future plans

### Currently missing functionality

Data Saver & Dark Mode

### Third underway hand in

For the third underway hand-in we will prioritze accessibility and sustainability. We'll be adding aria-labels and change to a theme more suited for people with reduced vision in addition to supporting dark mode. For sustainability we'll be adding a no-image mode that replaces images with text-based versions of their data. In addition we'll be focusing on future-proofing our code, improving the user experience and reducing the amount of API calls. We'll also be working on adding review functionality to cards if time allows.
