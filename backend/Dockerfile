FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar fgc.jar
ENTRYPOINT ["java","-jar","/fgc.jar"]
EXPOSE 8080