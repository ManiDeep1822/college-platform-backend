import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "College Platform API",
      version: "1.0.0",
      description: "Backend API documentation for College Discovery Platform",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["./app/api/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
