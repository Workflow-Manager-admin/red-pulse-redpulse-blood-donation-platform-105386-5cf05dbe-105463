#!/bin/bash
cd /home/kavia/workspace/code-generation/redpulse-blood-donation-platform-105386-5cf05dbe/blood_donation_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

