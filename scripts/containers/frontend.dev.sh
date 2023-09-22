#!/bin/bash

echo "STARTING CONTAINER"

cd /app

pm2-runtime start yarn --interpreter bash --name "frontend" --watch -- start