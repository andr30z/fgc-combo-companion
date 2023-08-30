#
# Build stage
#
# Use the official maven/Java 8 image to create a build artifact.
# https://hub.docker.com/_/maven
FROM maven:3.8.4-openjdk-17 as build
#
# # Copy local code to the container image.
COPY . .
#
# # Build a release artifact.
RUN mvn compile
RUN mvn clean package


#
# Package stage
#
# It's important to use OpenJDK 8u191 or above that has container support enabled.
# https://hub.docker.com/r/adoptopenjdk/openjdk8
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
FROM openjdk:17-jdk-alpine

# Copy the jar to the production image from the builder stage.
COPY --from=build /target/fgc-1.0.0-SNAPSHOT.jar fgc.jar

# ENV PORT=8080
EXPOSE 8080

# Run the web service on container startup.
ENTRYPOINT ["java","-jar","fgc.jar"]