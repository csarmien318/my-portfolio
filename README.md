# Full-Stack Web Application

- Deployed via Heroku [here](https://csarmiento-fullstack-portfolio.herokuapp.com/login)
- Profound challenge | Immersive learning | Curious design
- Continuous integration | software development lifecycle
- Comprehensive portfolio with multiple features/projects
- MERN Stack, Node Package Manager (npm), nodemon, custom "scripts", modern frameworks/libraries

*Access is granted to recruiters and employer hiring teams only - requesting access may be done by contacting owner via [LinkedIn](http://www.linkedin.com/in/christopher-sarmiento-0819b7210).*

___

## Backend

#### Node / Express / MongoDB / Mongoose

#### ```server.js```
- web server implementation
- Express & Mongoose initialization
- MongoDB connection
- Cross-Origin Resource Sharing (CORS)

#### ```/models```
- Object Data Modeling (ODM) with Mongoose
- Defining Mongoose schemas

#### ```/routes/api.js```
- RESTful APIs
- CRUD operations
- Authentication middleware - JSON tokens
- httpOnly cookies

___

## Frontend

#### React / Axios / Bootstrap / React-Router-DOM / Hooks / Cookies

All frontend implementation and functionality is contained within the ```/client``` folder in the root directory of this app. The summary below will address folders and their respective files within ```/client/src```.

#### ```/components```
- Header NavBar
- Page wrapper
- Scroll functionality
- Songs table implementation
- Pagination and sorting algorithms for songs table

#### ```/css```
Responsive design across multiple viewports and general component/page styling

#### ```/hooks```
- ```useAuth.js``` handles user authorization/authentication
- ```useContact.js``` validates form fields and submits contact input
- ```useLogin.js``` validates login input fields
- ```useWeather.js``` handles response, errors, and updates state for weather

#### ```/pages```
Parent components of pages rendered (About, Contact, Home, Login, Songs, and Weather)

#### ```/App.js```
Routing and displaying protected routes upon user authorization

___

## Performance Testing

#### Unit & Integration Testing: React Testing Library / Jest / Mock Service Worker (MSW)

```/__tests__``` folders found in ```client/src/components``` and ```client/src/pages```.

#### ```client/src/mocks```
- MSW implementation
- ```browser.js```: setupWorker
- ```handlers.js``` handles mock routes and API calls
- ```server.js```: setupServer

#### ```client/src/index.js```
- Initializes mocks when ```npm test``` is run
- MSW triggered only in development environment

___
