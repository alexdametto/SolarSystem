FROM nginx:alpine AS base

WORKDIR /usr/share/nginx/html/

# Remove the existing web files
RUN rm -rf /usr/share/nginx/html/*

# Copy The app inside nginx folder folder
COPY . .