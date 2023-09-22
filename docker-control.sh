#!/bin/bash

# Get command from command line argument. If not specified, echo available commands: up, down, restart, logs, bash, ps; and exit. 
# Logs command can be followed by container name to get logs for a specific container (e.g. logs frontend). Accept any number of arguments after logs command.

#get environment from command line argument. If not specified, echo available environments: dev, prod; and exit
ENV=$1
if [ -z "$ENV" ]
then
  echo "Please specify environment: dev, prod"
  exit 1
fi

COMMAND=$2
if [ -z "$COMMAND" ]
then
  echo "Please specify command: up, down, restart, logs, bash, ps"
  exit 1
fi

echo "COMMAND: $COMMAND"
echo "ENV: $ENV"

#get compose executable, either docker compose or docker-compose depending on which is installed
COMPOSE_EXECUTABLE=$(which docker-compose)
if [ -z "$COMPOSE_EXECUTABLE" ]
then
    COMPOSE_EXECUTABLE="$(which docker) compose"
fi

#execute command
if [ "$COMMAND" = "up" ]
then
  $COMPOSE_EXECUTABLE -f docker-compose.$ENV.yml up -d
elif [ "$COMMAND" = "down" ]
then
  $COMPOSE_EXECUTABLE -f docker-compose.$ENV.yml down
elif [ "$COMMAND" = "restart" ]
then
  $COMPOSE_EXECUTABLE -f docker-compose.$ENV.yml restart
elif [ "$COMMAND" = "ps" ]
then
  $COMPOSE_EXECUTABLE -f docker-compose.$ENV.yml ps
elif [ "$COMMAND" = "bash" ]
then
  $COMPOSE_EXECUTABLE -f docker-compose.$ENV.yml exec $3 bash
elif [ "$COMMAND" = "logs" ]
then
  $COMPOSE_EXECUTABLE -f docker-compose.$ENV.yml logs $3 $4 $5 $6 $7 $8 $9
else
  echo "Invalid command: $COMMAND"
  exit 1
fi
