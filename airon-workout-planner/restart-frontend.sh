#!/bin/bash

# Super Simple Frontend Builder with 4GB Swap
LOG_FILE="/var/log/simple-frontend-build.log"

echo "=== Starting simple frontend build: $(date) ===" > $LOG_FILE

# Step 1: Free space and remove old swap
apt-get clean
apt-get autoremove -y
rm -rf /tmp/*
swapoff -a
rm -f /swapfile*

# Step 2: Create large swap (4GB)
echo "Creating 4GB swap file..." >> $LOG_FILE
dd if=/dev/zero of=/swapfile-large bs=1M count=4096
chmod 600 /swapfile-large
mkswap /swapfile-large
swapon /swapfile-large

# Verify swap
free -h >> $LOG_FILE

# Step 3: Set up build environment
cd /var/www/frontend/airon-workout-planner
export NODE_OPTIONS="--max-old-space-size=4096"
export CI=false
export GENERATE_SOURCEMAP=false

# Step 4: Clean installation
echo "Performing clean installation..." >> $LOG_FILE
rm -rf node_modules
rm -rf build
npm cache clean --force
npm install --no-fund

# Step 5: Build
echo "Building application..." >> $LOG_FILE
npm run build

# Step 6: Check build result
if [ -f "build/index.html" ]; then
  echo "Build successful!" >> $LOG_FILE
  
  # Update permissions
  chown -R www-data:www-data build/
  chmod -R 755 build/
  
  # Update Nginx
  systemctl restart nginx
  
  echo "Frontend rebuild complete: $(date)" >> $LOG_FILE
else
  echo "Build failed - index.html not found" >> $LOG_FILE
fi
