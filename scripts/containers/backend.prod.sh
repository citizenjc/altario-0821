#!/bin/bash

echo "STARTING CONTAINER"

cd /app 

pm2-runtime start ecosystem.config.js --only backend-prod