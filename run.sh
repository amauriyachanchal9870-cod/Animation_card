#!/bin/bash
echo "Starting Valentine's Next.js App..."
# Start the dev server in the background
npm run dev > /dev/null 2>&1 &
SERVER_PID=$!

echo "Waiting for server to start..."
sleep 3

# Open in default browser
open "http://localhost:3000"

echo "Server running on http://localhost:3000"
echo "Press any key to stop..."
read -n 1
kill $SERVER_PID
echo "Server stopped."
