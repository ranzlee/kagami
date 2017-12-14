# Set nginx base image
FROM nginx:latest

# File Author / Maintainer
MAINTAINER Jeremy Conger

# Delete the default configuration
RUN rm -v /etc/nginx/nginx.conf

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80