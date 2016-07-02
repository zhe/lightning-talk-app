# Lightning Talk App

> This repo contains two branches: **front-end** and **back-end**.
> 
> This is the **front-end** branch.

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

Based on the use cases, the main object in this app is the **Lightning Talk**. It has `title`, `description`, `username` and `rating` which represents the votes that the talk received from the users. For this demo, I try to do a 

Started from **back-end**, 


More to consider:

- User can only vote once to the same talk. 
- User is considered as a single object and would have a profile. (User will be a Model in LoopBack, also meaning a seperate table in the database with a one-to-many relation with the talks.)
- Vote requires real-name policy, meaning we can see who have voted for a given lightning talk.