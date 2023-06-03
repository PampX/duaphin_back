# Set the base image for this Docker image
FROM nginx:1.21-alpine

# Copy all files from the current local directory to the root directory of the Docker image
COPY . .

# Expose port 80 to be able to access the application via web browser
EXPOSE 80

# Set the default command to run when the container is started
CMD ["nginx", "-g", "daemon off;"]