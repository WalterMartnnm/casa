FROM openjdk:17-oracle
LABEL maintainer="ltgabriel@mapua.edu.ph"
WORKDIR /opt/app
EXPOSE 8080
COPY target/ecommerce-1.0-SNAPSHOT.jar /opt/app/ecommerce.jar
ENTRYPOINT ["java", "-jar", "ecommerce.jar"]
