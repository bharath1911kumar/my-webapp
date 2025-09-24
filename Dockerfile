# Dockerfile
 # Use the official Nginx lightweight image
FROM nginx:alpine

# Copy all files from repo to Nginx default html directory
COPY . /usr/share/nginx/html

# Expose port 80 to access the web server
EXPOSE 80

# Default command is already defined in nginx image, so no CMD needed


