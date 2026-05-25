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

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    paths: {
      "/api/auth/register": {
        post: {
          summary: "Register user",
          tags: ["Authentication"],

          requestBody: {
            required: true,

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    name: {
                      type: "string",
                    },

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
            "201": {
              description: "User registered successfully",
            },

            "400": {
              description: "User already exists",
            },
          },
        },
      },

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

      "/api/profile": {
        get: {
          summary: "Get user profile",
          tags: ["Authentication"],

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            "200": {
              description: "Profile fetched successfully",
            },

            "401": {
              description: "Unauthorized",
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

      "/api/colleges/compare": {
        get: {
          summary: "Compare colleges",
          tags: ["Colleges"],

          responses: {
            "200": {
              description: "Colleges compared successfully",
            },
          },
        },
      },

      "/api/saved": {
        get: {
          summary: "Get saved colleges",
          tags: ["Saved Colleges"],

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            "200": {
              description: "Fetched saved colleges",
            },
          },
        },

        post: {
          summary: "Save college",
          tags: ["Saved Colleges"],

          security: [
            {
              bearerAuth: [],
            },
          ],

          requestBody: {
            required: true,

            content: {
              "application/json": {
                schema: {
                  type: "object",

                  properties: {
                    collegeId: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },

          responses: {
            "200": {
              description: "College saved successfully",
            },
          },
        },
      },
    },
  },

  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
