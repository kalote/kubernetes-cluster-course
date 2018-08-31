## Spring boot API - Company-api

This spring boot app is a basic REST API connected to a mongoDB database. In order to run this app you need jdk1.8, mongodb, docker.

### Endpoints

- /swagger-ui.html: Swagger docummentation
- (GET) /company/: list all companies
- (GET) /company/{id}: Returns a specific company
- (POST) /company/: Create a company
- (PUT) /company/{id}: Update a company
- (GET) /company/increaseEmployeeCount/{id}: Increase the specified company count of employee
- (GET) /company/decreaseEmployeeCount/{id}: Decrease the specified company count of employee

### Running the app

#### Local:

First terminal:

```bash
mongod
```

Second terminal:

```bash
mvn clean install
java -jar target/companyapi-1.0.0.jar
```

#### Docker local:

First terminal:

```bash
docker run -p 27017:27017 --name=mongo mongo:3.6
```

Second terminal:

```bash
mvn clean package # (this will also build the docker image)
docker run -e "SPRING_PROFILES_ACTIVE=docker" -p 8080:8080 --link=mongo -t company-api:1.0.0
```

### Testing the app

```bash
curl -XPOST http://localhost:8080/company/ -H 'Content-type: Application/json' --data '{"name":"Microsoft", "type":"LTD", "sector":"IT"}'
curl -XGET http://localhost:8080/company/{id}
curl -XGET http://localhost:8080/company/
curl -XPUT http://localhost:8080/company/{id} -H 'Content-type: Application/json' --data '{"name":"Microsoft", "type":"Multinational", "sector":"IT"}'
curl -XGET http://localhost:8080/api/v1/increaseEmployeeCount/{id}
curl -XGET http://localhost:8080/api/v1/decreaseEmployeeCount/{id}
```