#!/bin/bash
cd /var/www/tridentcloud
export NITRO_PORT=3097
export NITRO_HOST=127.0.0.1
exec node --env-file=.env .output/server/index.mjs
