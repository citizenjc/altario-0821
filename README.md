# Altar.io Full-Stack Exercise #0821

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Run the project](#run-the-project)
  - [Docker Control Script](#docker-control-script)
  - [Examples](#examples)
    - [Start Docker Containers in the Development Environment](#start-docker-containers-in-the-development-environment)
    - [Stop and Remove Docker Containers in the Production Environment](#stop-and-remove-docker-containers-in-the-production-environment)
    - [Restart Docker Containers in the Development Environment](#restart-docker-containers-in-the-development-environment)
    - [View Logs for All Containers in the Production Environment](#view-logs-for-all-containers-in-the-production-environment)
    - [View Logs for a Specific Container in the Development Environment](#view-logs-for-a-specific-container-in-the-development-environment)
    - [View Logs for a Specific Container in the Development Environment and follow them in real time](#view-logs-for-a-specific-container-in-the-development-environment-and-follow-them-in-real-time)
    - [Open a Bash Shell Inside a Container](#open-a-bash-shell-inside-a-container)
    - [List Running Containers in the Production Environment](#list-running-containers-in-the-production-environment)
  - [About CI/CD](#about-cicd)

## Description

React+Node full-stack exercise for Altar.io

**Challanges**:

- Typescript (don't run it daily, the correct times to use Types, interface/prop types etiquette or not might be hit and miss)
- Algorithms (they're simple enough, but it took a while for me understand what was being asked)
- Time (I wish I had time to make a proper CRUD for payments, but I only had a couple of hours every day to work on this)

**Needs improvements**:

- Error handling, field validation, especially on backend
- More organized Stylings. I used both Tailwind and Styled Components (my preference) to showcase a little bit of both, but in a real world scenario I would use only one of them, or something like twin.macro
- Proper CRUD for payments
- BFF (I know a little bit of GraphQL but didn't want to risk it)
- Tons of other things if it was a real world project (CI/CD, tests, better ui, prettier built in, code splitting, etc)

Overall, it was a lot of fun!

## Tech Stack

- React
- Vite
- TypeScript
- Styled Components (for structure) + Tailwind CSS (for styling)
- Node.js
- Express
- MongoDB
- Docker
- Docker Compose

# Run the project

## Docker Control Script

To use the `docker-control.sh` script, follow these steps:

1. Make the script executable:

   ```bash
   chmod +x docker-control.sh
   ```

2. Run the script with the desired command and environment as arguments:

   ```bash
   ./docker-control.sh ENVIRONMENT COMMAND [CONTAINER_NAME]
   ```

   - `ENVIRONMENT`: Specify the environment (e.g., `dev` or `prod`) in which you want to manage Docker containers.
   - `COMMAND`: Choose one of the available commands:
     - `up`: Start the Docker containers in the specified environment.
     - `down`: Stop and remove the Docker containers in the specified environment.
     - `restart`: Restart the Docker containers in the specified environment.
     - `logs`: View logs for the Docker containers in the specified environment. Optionally, you can specify one or more container names after the `logs` command to view logs for specific containers.
     - `bash`: Open a Bash shell inside a specified container. You need to provide the container name as an additional argument.
     - `ps`: List the running Docker containers and their status in the specified environment.

## Examples

### Start Docker Containers in the Development Environment

```bash
./docker-control.sh dev up
```

### Stop and Remove Docker Containers in the Production Environment

```bash
./docker-control.sh prod down
```

### Restart Docker Containers in the Development Environment

```bash
./docker-control.sh dev restart
```

### View Logs for All Containers in the Production Environment

```bash
./docker-control.sh prod logs
```

### View Logs for a Specific Container in the Development Environment

```bash
./docker-control.sh dev logs container_name
```

### View Logs for a Specific Container in the Development Environment and follow them in real time

```bash
./docker-control.sh dev logs container_name -f
```

### Open a Bash Shell Inside a Container

```bash
./docker-control.sh dev bash container_name
```

### List Running Containers in the Production Environment

```bash
./docker-control.sh prod ps
```

## About CI/CD

I use gitlab-ci a lot, but have no experience with github actions. The above scripts are "ready" for
prod deployment, and with something like traefik it would be easy to deploy to a server.
Here's a basic example of what .gitlab-ci.yml would look like:

```yaml
image: docker:latest

services:
  - docker:dind

stages:
  - build
  - deploy

build:
  stage: build
  script:
    - docker build -t registry.gitlab.com/altar-io/altar-io-fullstack-exercise-0821/frontend:latest ./frontend
    - docker build -t registry.gitlab.com/altar-io/altar-io-fullstack-exercise-0821/backend:latest ./backend
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD registry.gitlab.com
    - docker push registry.gitlab.com/altar-io/altar-io-fullstack-exercise-0821/frontend:latest
    - docker push registry.gitlab.com/altar-io/altar-io-fullstack-exercise-0821/backend:latest

deploy:
  stage: deploy
  script:
    - docker-compose -f docker-compose.prod.yml up -d
```

Deploy stage would depend on a pre-setup traefik container on the server, and docker-compose.prod.yml would use it by leveraging labels, something like this:

```yaml
version: "3.8"

services:
  frontend:
    ...
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`fs-exercise.altar.io`)"
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"
      - "traefik.http.routers.frontend.tls=true"
      - "traefik.http.routers.frontend.tls.domains[0].main=altar.io"
      - "traefik.http.routers.frontend.tls.domains[0].sans=*.altar.io"
    networks:
      - traefik-proxy
    ...
```
