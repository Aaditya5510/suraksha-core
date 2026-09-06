# Stage 1: Build stage with Maven and Eclipse Temurin 17
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy project descriptor and source tree
COPY pom.xml .
COPY src ./src

# Compile and package executable JAR skipping tests
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime image with Temurin 17 JRE Alpine
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Non-root user setup for container security
RUN addgroup -S suraksha && adduser -S suraksha -G suraksha
USER suraksha:suraksha

# Copy compiled artifact from builder
COPY --from=builder /app/target/suraksha-engine-*.jar app.jar

# Render dynamic port support
EXPOSE 8080
ENV PORT=8080
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Execute Spring Boot with dynamic port binding
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.jar"]
