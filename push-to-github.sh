#!/bin/bash

echo "Adding all changes..."
git add .

echo "Committing changes..."
git commit -m "Fix hero section CSS conflicts - add !important declarations to ensure green gradient background displays properly"

echo "Pushing to GitHub..."
git push origin main

echo "✅ Changes successfully pushed to GitHub!"
