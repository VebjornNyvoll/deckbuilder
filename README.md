# Deckbuilder

[[_TOC_]]

## Concept

![Alt text](readme/img/image.png)
This project is a deckbuilding application for the digital collectible card game Hearthstone. In the game, users can get different cards and build decks using them. Our application makes designing such decks significantly easier and gives the users access to all cards so they can design their dream decks!

The database has been created by scraping the [Hearthstone API](https://hearthstoneapi.com/) before using a custom Python script to clean the data. The main page loads different cards for the user to look at and add to their decks by hittng the plus button. The users can filter and search for cards to find the card they're looking for. Users may also click on a card to get more info about it.

In the /decks page, users can look at their decks, create new decks and delete decks. They can also see what cards are in a specific deck by clicking on it. To access this page, users must be authenticated. If a user is not authenticated they're redirected to the login page. Here they can either log in or hit the "create account" link to create their own account. Users are then stored in the database with their password hashed and we return a JWT token to the user that is stored in their localstorage and is valid for 2 hours.

The project's styling mostly comes from the component library PrimeReact and we use PrimeFlex as our utility library. PrimeFlex is very similar to Tailwind which is why the syntax will probably be familiar to a lot of people.

## How to run the project

The project assumes the user has Node v.20.6.0 or higher. The project is also reliant on a MongoDB database which the user has to initialize with card data. If you'd like to avoid setting up the database locally, [you may access our VM's database using this url.](http://it2810-66.idi.ntnu.no:4000/Hearthstone) We highly reccommend connecting to the VM database instead of creating one locally as it saves you a lot of time.

The repository is split into two parts: client and server. This is because we want the frontend to be as independent as possible of the backend. After cloning the project you should run the command `npm i` in [our root folder.](/../../)

Subsequently after cloning the project users have to cd into both [the client](/client) and [the server directory](/server), for instance using a split terminal. You then need to run `npm i` in both directories. **Beware: ** The server can be initialized using the command `npm start` and in the client folder the command is `npm run dev`. To run the server you also need a `.env` file in the server folder created by yourself. We do not store this in Gitlab for security reasons as well as to allow users to select their own ports. Your `.env` file should look like this:

```
PORT = 4000
MONGOOSE_URI = mongodb://localhost:27017/Hearthstone
JWT_SECRET = TotallySecretJWT
```

You can replace port with whatever port you want (although we highly recommend using a port above 1024 due to Linux constraints). You also need to update references to port 4000 in the code. `MONGOOSE_URI` will be your MongoDB connect URI. `JWT_SECRET` can be literally anything you want, but we highly recommend choosing something random (and definitely not TotallySecretJWT).

## Folder structure

In [client/src](/client/src) components are naturally placed into the [components](/client/src/components/) folder. Components are reusable pieces and are not used to construct their own page. In our case, [CardView](/client/src/components/CardView.tsx) is an essential component that renders [CardItem](/client/src/components/CardItem.tsx) components.

[App.tsx](/client/src/App.tsx) is used for routing between pages and isn't really a page on its own. That's why it's not within the pages folder. This file is useful to visit if you wonder how routing works in this project and also to see how we wrap different providers. For instance, you will find our authentication provider and our Redux store provider here.

[Services](/client/src/service/) are used to help other components, pages etc. For instance [CardService.tsx](/client/src/service/CardService.tsx) is a service for conducting card queries and [RequireAuth](/client/src/service/RequireAuth.tsx) is a wrapper used in [App.tsx](/client/src/App.tsx) for pages like /decks that require users to be authenticated to access. The RequireAuth wrapper automatically checks whether users are authenticated when they attempt to such pages and redirect them to the login page if they are not.

## Accessibility

In the third underway hand-in we have significantly improved the accessibility of our website. We've added aria-labels all across the website and ensured users can now use tab to navigate instead of using the mouse. In addition, we now have dark mode!
![Screenshot of page in dark mode](readme/img/dark-mode.png)
If that doesn't look great, I don't know what does! Both our light mode theme and our dark mode theme have been personally customized to match contrast ratios [specified by W3C Web Content Accessibility Guidelines 2.0](https://www.oregon.gov/ode/accessibility/checklist/pages/contrast.aspx) whilst looking great, of course.
We've also added a "scroll to top" button that makes it a lot easier for users that have scrolled far down.

We also only show filters, sort and the search bar when the user is on the home page which makes it a lot less confusing!

## How about sustainability?

Of course we've made the project as sustainable as possible! We've cleaned up our queries to ensure we don't make any unneccessary calls. We've even added a sick debounce to the search bar that caches whatever you write to ensure it doesn't make a call every time you hit a key, but it still feels responsive!

In addition we've added a data saver mode! This can be enabled under the profile tab. ![Profile -> Enable Data Saver](/readme/img/profile-data-saver.png)

You may wonder "What does this Data Saver even do?" and that's a wonderful question. The answer is really quite simple, it ensures you don't make any calls to get images. Our card images are accessed from an external database and enabling data saver replaces the images with text data from our local database. This is not only easy to read, but it also helps save the environment! So go ahead and save those turtles!  
![Picture of a regular card](/readme/img/regular-card.png) ![Picture of a card in data saver mode](/readme/img/data-saver-card.png)

## Let's talk testing!

As the well known saying says "No good component goes untested" so of course we've added some tests to our project. We use [Cypress for our End-To-End tests](https://www.cypress.io/) and [Vitest for our component tests.](https://vitest.dev/) Let's talk end-to-end tests first because it looks super sick when it runs so of course you'd want to try that first!

Make sure you've done the neccessary steps from [How to run the project](#how-to-run-the-project). Then all you need to do is have the client and server running and finally in the [client folder](/client/) use the command `npx cypress open`. This will lead you to a crazy-looking interface, but no worries, we'll guide you through it.
