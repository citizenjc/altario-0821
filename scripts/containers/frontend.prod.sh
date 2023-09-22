#!/bin/bash

cd /app

yarn build
pm2 serve dist --name frontend --no-daemon --spa --port 5173
