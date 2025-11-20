#!/bin/bash
cd /home/kavia/workspace/code-generation/classic-pac-man-game-279353/pacman_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

