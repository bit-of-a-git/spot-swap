# SpotSwap - Discover and share hidden gems across Ireland!

### SETU Full Stack Web Development 1: Assignment 1

## Table of Contents
- [About the project](#about-the-project)
- [Features](#features)
- [Future plans](#future-plans)
- [Getting started](#getting-started)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Credits](#credits)

## About the project

SpotSwap is a web application which help users discover and share hidden gems across Ireland. Whether a secluded beach, a hidden piece of history, or a scenic hiking trail, SpotSwap allows users to explore and contribute to a growing database of unique locations. The platform allows users to add their own spots with locations and descriptions, upload images, and filter by both location and category. The tech stack includes Node.js, Hapi, Handlebars, MongoDB, and Joi, with Mocha and Chai for testing. 

## Features

- Users can create collections and then add spots to them. When adding a collection, users specify the county where the spots are found.
- Users can place a location marker and upload an image for spots.
- Users can view and filter spots by location or category.

## Dependencies

Node.js and npm are required. Package dependencies are found in package.json.

## Installing the project locally

To run the project locally, you must first create accounts with Cloudinary and MongoDB Atlas, creating a MongoDB Atlas database. You must also populate a .env file with the required values for Cloudinary and MongoDB. A .env.example file has been provided. Next...

```bash
# Clone the repo
git clone https://github.com/bit-of-a-git/spot-swap.git

# Navigate to the project directory
cd spot-swap

# Install dependencies
npm install

# Start the project
npm start
.
```

## Using the app

Whether running locally or using the deployed links, click "Sign Up" to set up an account and log in. You may now add collections by entering a name and selecting an associated county.

Next, click the blue icon under your collection to go to the collection view. Here you can add associated spots by inputting name, description, category, latitude, and longitude. Alternatively, you can press "Use my current location" to populate the latitude and longitude with your current location, or you can simply click on the map. You can then upload an associated image, and delete it if desired by clicking the red icon in the upper right hand side of the image.

Users can delete spots by clicking the red button to the bottom right of each listed spot. Users may also edit and update their accounts by clicking the icon on the top right of the screen and clicking "Edit Profile".

## Credits

Much of the code here was taken from SETU's Full Stack Web Development 1 course, particularly the Playtime application developed over the course of the first series of labs.

Former SETU students Kieron Garvey and Eoin Fennessy's projects were extremely helpful and referenced frequently when troubleshooting issues or looking for ideas on how to accomplish various functionalities. 

- https://github.com/ki321g/Rugby-Club-POI
- https://github.com/eoinfennessy/shutter-spotter

I also referenced my previous SETU Web Development 2 project:

- https://github.com/bit-of-a-git/weathertop-weather-station-app

Other sources referenced:
- https://stackoverflow.com/questions/5110249/wildcard-in-css-for-classes
- https://stackoverflow.com/questions/46785393/bulma-dropdown-not-working


Images were taken from the following sources:
- https://unsplash.com/photos/low-angle-photo-of-earth-metal-statue-UKjPDfyJI4w
- https://www.discoverireland.ie/sligo/queen-maeve-trail
- https://markrode.ie/thw-quiet-man-statue/
- https://en.wikipedia.org/wiki/Titanic_Belfast
- https://en.wikipedia.org/wiki/Connemara_National_Park
- https://eyresquarecentre.com/esc-stores/pizza-point/
- https://galwaynationalparkcity.com/circle-of-life-quincentennial-park/
- https://venuesearch.ie/listing/coughlans-bar/