# Cocktail App

This app will display a list of cocktails and allows the user to search for cocktails and view details for each one.

## Installation

```
bundle install
yarn
rake db:migrate
rake db:seed
rspec
yarn jest
rails s
```

## Design decisions

* Using SQL LIKE for searching instead of ElasticSearch to reduce complexity. It's also a small set (or not? ...who knows? New cocktails come out every day :shrug:)
* Using react-rails to embed React components in a single Rails application to reduce complexity. A standalone React application would work better and allow us to utilize the React architecture better, such as using the React Router and component stylesheets. For example, right now pagination happens locally. If the user refreshes the page, the pagination will be gone. I would prefer to have React push a new page into its history with the page in the URL.
* Used a simple UI without CSS to reduce complexity. I also left out certain checks such as empty ingredients and such.
* The pagination is not the best (a "next page" is present even if there is no next page). Using a different API response from the one defined in the requirements, such as returning metadata, would allow us to control when to display a "next page" link and gives us other metadata, such as number of pages and total count.
* Limit is not used in the Front-End. It's hard-coded to 10.
* Jest tests can be improved