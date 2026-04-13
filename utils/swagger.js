import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "An E-Commerce API built with Node.js and Express",
    },
    tags: [
      { name: "Products", description: "Product operations" },
      { name: "Orders", description: "Order operations" },
      { name: "Cart", description: "Cart operations" },
      { name: "Users", description: "User authentication and management" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // ← fixed path
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
