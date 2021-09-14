<h1>Blockchain Explorer</h1>

## Overview

This application will retrieve the latest Bitcoin transaction blocks using `blockchain.info` API and it will show them in a paged view.
When a block item is clicked it will show a page with some details of it
It will also update the list in real-time when a new block is added to the blockchain, using GraphQL subscriptions.
Pages take advantage of Next.js server side rendering for their first load

### Stack used

*Frontend:* Next.js, React, Tailwind CSS, Apollo, Jest
*Backend:* NestJS, GraphQL

### Project structure

The repo consists of 2 folders: `frontend` (for FE app) and `backend` (for BE app). 
Every subproject is written in TypeScript and has its own `tsconfig.json` and `package.json`.
The root folder aims to pin everything up together in order to simplify dev and build process.

### Prerequisites

1. Node v16.3.x
2. Yarn v1.22.x
3. Docker (latest version)

### Quick start

1. Clone / download the repo and go to its root folder
2. `yarn`
3. `yarn start:dev` to start development (see below all available commands)
4. `yarn build && yarn start:prod` to build prod version and start it

### Run in a Docker container

1. Clone / download the repo and go to its root folder
2. `docker build -t blockchain-explorer .`
3. `docker run --rm -it -p 3000:3000 blockchain-explorer`

### Commands

| Command           | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `yarn build`      | Builds BE and FE for production deployment                                                         |
| `yarn start:dev`  | Starts concurrently Next dev backend (on port 3000) and runs Nest development mode (on port 9000). |
| `yarn start:prod` | Starts BE and FE in production mode. FE listens on port `3000`, API on `9000`                      |
| `yarn lint`       | Runs eslint across all folders                                                                   |
| `yarn test`       | Runs unit tests

### Considerations for production deployment

- Improve logging, create a common logger service, monitor logs with ELK stack
- Instrument and aggregate metrics visualization using Prometheus/Grafana or NewRelic
- Add more unit tests, integration tests and e2e tests
- Improve Apollo caching using Redis or Memcached
- Use separate Dockerfiles for frontend and backend to deploy them in different hosts
- Deploy to a containerized environment like AWS ECS or EKS (Kubernetes) to implement scaling
- Implement blue/green deployment
- Improve UI by using responsive design with a mobile-first approach
- Add more details to the block list and view, like a transaction list
- Improve UI state management using Redux or Mobx stores
