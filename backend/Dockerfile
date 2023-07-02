FROM openjdk:17-alpine
VOLUME /tmp
ARG JAR_FILE=/target/fgc-combo-companion-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} fgc-combo-companion.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/fgc-combo-companion.jar"]