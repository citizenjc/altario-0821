#!/bin/bash

cd /app

yarn install
yarn build
pm2-runtime start /configs/ecosystem.config.js --only frontend-prod