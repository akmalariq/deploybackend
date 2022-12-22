const express = require("express");
// const swaggerOptions = require('../../binar-deployment-be/utils/swaggerOptions')
// const bodyParser = require('body-parser')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");
// const path = require('path')
// const upload = require('./utils/fileUpload')

// const port = 2000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// SWAGGER
const swaggerOptions = require("./utils/swaggerOptions");
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Import Controllers
const carsController = require("./controllers/carsController");
const authController = require("./controllers/authController");

// Import Middleware
const middleware = require("./middlewares/auth");

// Define Routes

// Testing CI/CD Route
// app.get('/testing-ci-cd/:id', userController.getPostsByID)

// Auth
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.put(
  "/auth/superadmin",
  middleware.authenticate,
  middleware.isSuperAdmin,
  authController.registerAsAdmin
);
app.post("/auth/me", middleware.authenticate, authController.currentUser);

// Cars

// Admin
app.post(
  "/api/v1/car/create",
  middleware.authenticate,
  middleware.isAdmin,
  carsController.create
);
app.put(
  "/api/v1/car/update/:id",
  middleware.authenticate,
  middleware.isAdmin,
  carsController.updateCar
);
app.delete(
  "/api/v1/car/delete/:id",
  middleware.authenticate,
  middleware.isAdmin,
  carsController.deleteCar
);

// Member
app.get("/api/v1/car/getall", carsController.getAll);
app.get("/api/v1/car/getby/:id", carsController.getByID);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://127.0.0.1:${process.env.PORT}`);
});
