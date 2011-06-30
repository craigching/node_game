#!/bin/sh

curl --dump-header headers -v --header "Content-Type:application/json" -d '{"username": "cching", "password": "cching"}' http://localhost:8000/login
