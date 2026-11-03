FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY ServiceB.java .
RUN javac ServiceB.java
ENV PORT=8080
EXPOSE 8080
CMD ["java", "ServiceB"]