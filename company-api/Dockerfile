# Multi-stage build
# First we build our app with a maven image
# Then we copy the result in a smaller image

## BUILD
FROM maven:3.5-jdk-8 AS build
WORKDIR /usr/src/app
ADD src src
ADD pom.xml .
RUN mvn -f pom.xml clean package

## RUN
FROM openjdk:8-jdk-alpine
# Add a volume on /tmp because that is where a Spring Boot application 
# creates working directories for Tomcat by default.
VOLUME /tmp
COPY --from=build /usr/src/app/target/companyapi-1.0.0.jar /usr/app/companyapi-1.0.0.jar  
EXPOSE 8080
# To reduce Tomcat startup time we added a system property pointing 
# to "/dev/urandom" as a source of entropy.  
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/usr/app/companyapi-1.0.0.jar"] 