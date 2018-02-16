# Kiwi Flight Search

Simple flight search page in React.

[Try it here](https://kiwi-flight-search.herokuapp.com/) (it might take a while before the free server wakes up)

Backend is provided by [graphql.kiwi](https://graphql.kiwi.com/)

__Uses:__

 * [Formik](https://github.com/jaredpalmer/formik) 0.11.10
 * [Graphql](https://github.com/graphql/graphql-js) 0.13.0
 * [React](https://github.com/facebook/react) 16.2.0
 * [React Apollo](https://github.com/apollographql/react-apollo) 2.0.4
 * [Recompose](https://github.com/acdlite/recompose) 0.26.0
 * [Styled Components](https://github.com/styled-components/styled-components) 2.2.3

#### Installing the project
 
 Run
 ```yarn install``` (I did not generate lock file for `npm`)

 
 #### Development
 
 To start the server simply run: `yarn dev`
 
 #### Production
  
 This application should be production ready. It uses [nextjs](https://github.com/zeit/next.js/) for basic boilerplate code.
 
 I also made the app [heroku](https://heroku.com) ready. All you have to do is make sure that:
 
 ```
 NPM_CONFIG_PRODUCTION = false
 NODE_ENV = 'production'
 ```
