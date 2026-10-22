#!/bin/bash
cd /var/www/tridentcloud
export NITRO_PORT=3097
export NITRO_HOST=127.0.0.1
exec node --env-file=.env ./node_modules/vite/bin/vite.js preview --port 3097 --host 127.0.0.1
