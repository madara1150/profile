#!/bin/sh

# Start the Go Backend Server
# It will run in the background (&) listening on Port 8080
echo "Starting Uchiha Backend Server..."
cd /app/backend
./server &

# Start the Next.js Frontend Server
# It runs in the foreground, keeping the container alive listening on Port 3000
echo "Starting Next.js Frontend Server..."
cd /app/frontend
node server.js
