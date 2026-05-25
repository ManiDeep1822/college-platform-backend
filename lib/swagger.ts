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
        url: "https://college-platform-backend-three.vercel.app",
      },
    ],

    paths: {
      "/api/auth/login": {
        post: {
          summary: "Login user",
          tags: ["Authentication"],

          requestBody: {
            required: true,

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    email: {
                      type: "string",
                    },

                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },

          responses: {
            "200": {
              description: "Login successful",
            },

            "401": {
              description: "Invalid credentials",
            },
          },
        },
      },

      "/api/colleges": {
        get: {
          summary: "Get all colleges",
          tags: ["Colleges"],

          responses: {
            "200": {
              description: "Successfully fetched colleges",
            },
          },
        },
      },
    },
  },

  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
