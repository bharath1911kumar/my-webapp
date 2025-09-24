# Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html

EXPOSE 80
    - name: Build Docker image
      community.docker.docker_image:
        name: my-webapp:latest
        build:
          path: /home/ubuntu/webapp
        source: build
