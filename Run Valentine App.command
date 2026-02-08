#!/bin/bash
# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "Starting Valentine's App..."
echo "Please wait while the server starts..."

# Start Next.js server in background
npm run dev > /dev/null 2>&1 &
SERVER_PID=$!

# Wait a moment for server to initialize
sleep 3

# Open the browser
open "http://localhost:3000"

echo "
===================================================
  ❤️  Valentine's App is running!  ❤️
  Check your browser.
  
  Close this window to stop the app.
===================================================
"

# Wait for user to close window
wait $SERVER_PID
