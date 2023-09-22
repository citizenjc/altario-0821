#!/bin/bash

echo "STARTING CONTAINER"

cd /app

yarn install
pm2-runtime start /configs/ecosystem.config.js --only backend-dev 
