#!/bin/sh

curl --header "Content-Type:application/json" -d '{"username": "cching", "password": "cching"}' http://localhost:8000/account/login
