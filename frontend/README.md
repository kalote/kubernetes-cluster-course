## ReactJS Frontend

This frontend use ReactJS to interact with our APIs. It was created using create-react-app, and there's no specificities.

### Running the app

#### Local:

Development:

```bash
npm i
npm start
```

Production:

```bash
npm i
npm run build
npm start-prod
```

#### Docker local:

```bash
# Run your API & MongoDB first then
docker build --build-arg EMPLOYEE_API="http://localhost:8000" --build-arg COMPANY_API="http://localhost:8080" -t frontend:1.0.0 .
docker run -e PORT=3000 -p 3000:3000 -t frontend:1.0.0
```