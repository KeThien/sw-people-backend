# 🚀 SW People Hiring Test Project

I made and App based on the StarWars API https://swapi.co/ for a code test

DEMO Heroku Deploy: https://sw-people.herokuapp.com/

## 🧬 Technologies

- [Ruby on Rails](https://rubyonrails.org/)
  - Postgresql
- [React.js](https://reactjs.org/)
  - create-react-app
- [Material-UI](https://material-ui.com)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## 📝 Assigment

```markdown
# Code assignment

Using the last version of React, Ruby On Rails and the StarWars API https://swapi.co/ you are tasked to do a small web application. You are free to use any resource online (documentation, tutorials, etc).

Try to go as far as you can, it is ok if you don't do everything. When ready to share your code, publish your code on a git repository and send us the link.

## Main Task

- Display a list of people (starwars characters)
- On click, display the character with some of their info (year of birth, gender, species, etc).
- When clicking on "Edit" you should be able to edit the character's information.
- Validate the type of the fields and restrict the possible values for the gender and the species.
- The submit button should be disabled if a field does not validate.
- On submit, the info displayed should be updated.
- Persist all the data in a postgresql database with Ruby on Rails.
- Deploy you app to Heroku.

## Optionnal

- Add the ability to add a character to your favorites and store it in localeStorage
- Add the ability to filter the list
- Add errors to the form
```

## ⛩️ Structure

Here we have the **_sw-people-backend_** folder with the api controller.
Inside we have the frontend React folder **_sw-people-frontend_** create with create-react-app

```
sw-people-backend                          # Ruby on Rails Folder
├─ app
│   ├─ ...
│   └─ controllers
│       └─ api
│           └─ v1                          # Use of namespace
│               ├─ people_controller.rb
│               └─ species_controller.rb
├─ sw-people-frontend                      # React folder
└─ ...
```

## 💾 Database

I create two tables with 1:n relation:

- People: belongs to Species
- Species: has many Person

Routes available:

```
Verb   URI Pattern            Controller#Action

GET    /api/v1/people         api/v1/people#index
GET    /api/v1/people/:id     api/v1/people#show
PATCH  /api/v1/people/:id     api/v1/people#update
GET    /api/v1/species        api/v1/species#index
GET    /api/v1/species/:id    api/v1/species#show
```

## 🏁 Getting Started

### Prerequisites

- [Yarn](https://yarnpkg.com/)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Ruby](https://www.ruby-lang.org/) 2.6.3

## 🚀 Install

### Clone the repository

```shell
git clone git@github.com:KeThien/sw-people-backend.git
cd sw-people-backend
```

### Check your ruby version

```shell
ruby -v
```

### Install dependencies

```shell
bundle install
yarn --cwd sw-people-frontend install
```

### Initialize the database

```shell
rails db:create db:migrate db:seed
```

## 💻 Running Locally

```shell
Heroku local -f Procfile.dev
```

## ![favicon-32x32](https://github.com/heroku/favicon/raw/master/favicon.iconset/icon_16x16.png) Deploy in Heroku

Use of Heroku CLI help with the login process.
Then create your app with the name you choose.

```shell
heroku login
heroku create $YOUR_APP_NAME --region eu
```

We need to install buildpacks in order for Heroku to works with backend Ruby on Rails and React in frontend

```shell
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
```

With that sorted, we can deploy and build:

```shell
git add .
git commit -m "Initial commit"
git push heroku master
```

Heroku use the Procfile and package.json to build and create the database.

We now need heroku to fill the database from the seeds.rb file:

```shell
heroku run rake db:seed
```

## Authors

- Ke Thien Nguyen [KeThien](https://github.com/KeThien) - [kethien.be](https://kethien.be)

## 🎯 Challenges

With challenges in mind, few examples:

I wanted to have the pictures of each character and I needed to scrape from somewhere. I used another API from [wookieepedia](https://starwars.fandom.com) to search by name from the main API but they were some difficulties. Some names wasn't written the same and so I rewrote the seeds.rb file and find a solution.

Another nitpick things is when I choose this type of design I wasn't aware that :

- When clicking on 'Edit' button it enter the 'edit' mode.
- And when clicking immediatly on another character in the list, we are still in 'edit' mode instead of 'view'.

The errors form was also a challenge because the when we had an error and then click on 'Cancel' button (or other character) the errors was still showing when swaping in 'edit' mode

Many thanks to the person who gave me this assignment. Thanks to this project I learn a lot more about React, Rails, Heroku and myself.
