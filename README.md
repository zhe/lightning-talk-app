# Lightning Talk App

> This repo contains two branches: **front-end** and **back-end**.
>
> This is the **back-end** branch.

## Background

Build a [Hacker News](https://news.ycombinator.com/) like app but for a lightning talk polling.

## Use cases

1. User could see a list of lightning talks ordered by rating submitted by other users;
2. If there's no lightning talk, simply put a placeholder text and encourage user to submit their own talks;
3. User could vote for the lightning talk by clicking the voter button or icon;
4. After voting, user will get an updated version of the lightning talk list (ordered by rating);
5. User could always submit a lighting talk with `title`, `description`, and `username`;
6. The user could see his lighting talk on the list after submitting.

## Architecture

This is not a large and real production-ready app, but like any other apps, it's divided into two parts: **front-end** and **back-end**. There are often two separate codebases for these two parts where they are developed, tested and deployed separately in parallel. In this case, I'm going to use two branches in this repo to represent these two parts: branch **front-end** and branch **back-end**.

## Back-end

Based on the use cases, the main object in this app is a record/instance of **Lightning Talk**. It has `title`, `description`, `username` and `rating` properties which represent the title, the description and the votes that the talk received from the users, and a unique `id` property as its identifier.

The list of lightning talks is stored in a **MySQL** database, but it can be done by other database too like MongoDB. And we use **[LoopBack](http://loopback.io/)** - a Node.js API framework – to create RESTful APIs and connect the front-end and the back-end through APIs as the data service provider.

### Setup a database & a LoopBack application

To get started, I created a MySQL database called `lightningTalksDev` on the local machine, and installed StrongLoop tools which are needed for LoopBack CLI.

```
$ npm install -g strongloop
```

Then, I scaffolded an empty LoopBack application `slc loopback` and installed the necessary dependencies `npm install`.

### Define the Talk Model

In LoopBack Application, one of the core concept is *Model* which represents data in the back-end such as databases. LoopBack will automatically create REST API endpoints according to the model, and we can also write our own logic like validation to the models.

Besides some built-in models like User, Role and Application, we'll just define our own model – Talk.

Run the command in the terminal, and follow the steps to define the model and add its properties: `title`, `description`, `username` and `rating`.

```
$ slc loopback:model
```

Create a **Talk** model based on PersistedModel for it's the base object for all models connected to a persistent data source such as a database, and `title`, `description`, `username` string type properties and `rating` number type property with default value 0.

### Add the data source

Next, connect LoopBack to MySQL database created earlier. Run this command:

```
$ slc loopback:datasource
```

Name the data source and choose the MySQL data source generator, configure the data source by inputing the host, port, database, username, and password. The settings are stored in `server/datasources.json` file. It will run the following command to install MySQL connector and dependencies from npm.

```
npm install loopback-connector-mysql --save
```

Note: LoopBack supports many popular databases like MySQL, MongoDB officially by corresponding database connector.

### Link the model to the data source

Edit `/server/model-config.json` file, put the right data source name to the Talk model.

### Auto-migrate

Although the database is created, it is still empty without any table or database schema. Good thing is that LoopBack can create the database schema based on the pre-deifned models connected to the data source, meaning it will create a table for each model, and a colume in the table for each property in the model accordingly. We can use another tool [StrongLoop Arc](https://docs.strongloop.com/display/APIS/Using+Arc) to do that, or manually write our own [auto-migration script](https://docs.strongloop.com/display/public/LB/Creating+a+database+schema+from+models).

Note: StrongLoop Arc is going to be deprecated. Use [API Connect](https://developer.ibm.com/apiconnect/) instead.

### Run and explore

Start the server, and run the application:

```
$ node .
```

Visit web server <http://0.0.0.0:3000> or browse the REST API at <http://0.0.0.0:3000/explorer>

Keep the server running for the front-end data interactions.

For development on a local machine, that's probably it. There is still a lot to improve to reach a real application level. Business logics and models are more complex in real scenario, like form validation, error handling, authentication, etc.


### Dev and staging

The development is always likely done collaboratively by a team, so it's very common to deploy the app to a dev server in the internal network. Other team members, especially front-end developers, can easily access it.

Before any minor or major release, the team may have a staging environment to fully test the app and fix the bugs for that release.

### Go production

When the app will be deployed for production, there will be another set of configurations like production database, urls, etc.

In order to serve different environments, we need to modify several types of configuration files in the server directory, and make

- server/config.{env}.json/js
- server/datasources.{env}.json/js
- server/model-config.{env}.json/js
- server/middleware.{env}.json/js
- server/component-config.{env}.json/js

Where `{env}` is the value of NODE_ENV (typically "development," "staging," or "production").

## Front-end

**Front-end** app uses Facebook's React to render UI components. It fetches and post data that needed for React components. It will also uses React Router the routing.

### Component structure

There are many ways to write React components, among those I found that [Dan Abramov](https://github.com/gaearon)'s approach [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.n64rr25ip) is much clearer. So for this demo app, I will follow this component structure:

```
- TalkContainer
  - TalkList
    - TalkItem
  - TalkForm
```

`TalkContainer` is a *container component*. It only concerns about *how things work*. It has only some wrapping divs, never has any styles, and provide the data and behavior to presentational or other components. In this case, `TalkContainer` is just a wrapping div and is going to talk with back-end for fetching or posting data kind of data services.

`TalkList`, `TalkItem` and `TalkForm` are *presentational components*. They only concern about *how things look*. They have DOM markups and styles, don't care how data is loaded or changed, just receive data and callbacks via props, and can be written as [stateless functional component](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components).

I started this demo app by using used [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit) by [David Zukowski](https://github.com/davezuko) as a starting point. This kit includes React, React Router, Redux, Webpack, Babel, Koa, karma, and eslint out of the box.

> This starter kit is designed to get you up and running with a bunch of awesome new front-end technologies, all on top of a configurable, feature-rich webpack build system that's already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, and a whole lot more.

The application structure follows:

```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Reusable Presentational Components
│   ├── containers           # Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   └── routes               # Main route definitions and async split points
│       ├── index.js         # Bootstrap main application routes with store
│       └── Talk             # Fractal route
│           ├── index.js     # Route definitions and async split points
│           ├── assets       # Assets required to render components
│           ├── components   # Presentational React Components
│           └── container    # Connect components to actions and store
└── tests                    # Unit tests
```

### Development


After `git clone` this repo, and `git checkout` the **front-end** branch. Install the dependencies and run the dev server for developing.

```
$ npm install
$ npm start
```

These are other scripts that are available.

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`dev:no-debug`|Same as `npm run dev` but disables devtool instrumentation.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Docker

During the lifecycle of application, from development, test, deployment to operation, with continuous development iterations, different teams need tremendous efforts to setup different environments and keep them consistent in order to continuously deliver high quality application. For this small demo app, there will not ever be many people involved, but for real applications in production, it's great to consider using one platform to build, ship, run the application anywhere. So here is:

[Docker](https://www.docker.com/) uses container as a standardized unit to wrap the application with everything needed to run. It is similar with Virtual Machine, but uses different approach to be more portable and efficient. In this demo, in the to-do list, I'll try to containerize both the front-end and the back-end applications.

---

Todos:

- User model
- Rating model
- Business logic, like user can only vote once to the same talk
- Test
