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

This is not a large and real production-ready app, but like any other apps, it's divided into two parts: **front-end** and **back-end**. 

### Front-end

Front-end 

### Back-end

Based on the use cases, the main object in this app is a record/instance of **Lightning Talk**. It has `title`, `description`, `username` and `rating` properties which represent the title, the description and the votes that the talk received from the users, and a unique `id` property as its identifier. 

The list of lightning talks is stored in a **MySQL** database, but it can be done by other database too like MongoDB. And we use **[LoopBack](http://loopback.io/)** - a Node.js API framework – to create RESTful APIs and connect the front-end and the back-end through APIs as the data service provider.

## How

### Setup a database & a LoopBack application

To get started, I created a MySQL database called `lightningTalksDev`, and installed StrongLoop tools which are needed for LoopBack CLI.

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

Next, connect LoopBack to MySQL database created earlier. Run this command and choose the MySQL data source generator:

```
slc loopback:datasource
```

TODO: the remaining stuff

---



Started from **back-end**, 


More to consider:

- User can only vote once to the same talk. 
- User is considered as a single object and would have a profile. (User will be a Model in LoopBack, also meaning a seperate table in the database with a one-to-many relation with the talks.)
- Vote requires real-name policy, meaning we can see who have voted for a given lightning talk.