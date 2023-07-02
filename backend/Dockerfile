FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar fgc-combo-companion.jar
ENTRYPOINT ["java","-jar","/fgc-combo-companion.jar"]
EXPOSE 8080