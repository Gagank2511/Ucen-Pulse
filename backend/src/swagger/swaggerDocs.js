import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ucen Pulse API",
      version: "1.0.0",
      description: "API documentation for the Ucen Pulse backend",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Development server",
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
      schemas: {
        // ── Auth ────────────────────────────────────────────────
        RegisterRequest: {
          type: "object",
          required: ["userDetails"],
          properties: {
            userDetails: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name:     { type: "string", example: "Jane Doe" },
                email:    { type: "string", format: "email", example: "jane@example.com" },
                password: { type: "string", format: "password", example: "secret123" },
              },
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email:    { type: "string", format: "email", example: "jane@example.com" },
            password: { type: "string", format: "password", example: "secret123" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            user: {
              type: "object",
              properties: {
                name:  { type: "string", example: "Jane Doe" },
                email: { type: "string", example: "jane@example.com" },
              },
            },
          },
        },

        // ── Activity ────────────────────────────────────────────
        ActivityRequest: {
          type: "object",
          required: ["date", "type", "duration"],
          properties: {
            date:     { type: "string", format: "date-time", example: "2024-06-01T08:00:00.000Z" },
            type:     { type: "string", example: "Running" },
            duration: { type: "integer", example: 45, description: "Duration in minutes" },
            notes:    { type: "string", example: "Morning run in the park" },
          },
        },
        Activity: {
          type: "object",
          properties: {
            id:       { type: "integer", example: 1 },
            date:     { type: "string", format: "date-time", example: "2024-06-01T08:00:00.000Z" },
            type:     { type: "string", example: "Running" },
            duration: { type: "integer", example: 45 },
            notes:    { type: "string", example: "Morning run in the park" },
            userId:   { type: "integer", example: 7 },
          },
        },

        // ── Metric ──────────────────────────────────────────────
        MetricRequest: {
          type: "object",
          required: ["date", "metric", "value"],
          properties: {
            date:   { type: "string", format: "date-time", example: "2024-06-01T08:00:00.000Z" },
            metric: { type: "string", example: "weight" },
            value:  { type: "number", format: "float", example: 72.5 },
          },
        },
        Metric: {
          type: "object",
          properties: {
            id:     { type: "integer", example: 1 },
            date:   { type: "string", format: "date-time", example: "2024-06-01T08:00:00.000Z" },
            metric: { type: "string", example: "weight" },
            value:  { type: "number", format: "float", example: 72.5 },
            userId: { type: "integer", example: 7 },
          },
        },

        // ── Shared ──────────────────────────────────────────────
        MessageResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Deleted successfully" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Something went wrong" },
          },
        },
      },
    },

    paths: {
      // ── /api/auth ──────────────────────────────────────────────
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            400: {
              description: "User already exists",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login with existing credentials",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            401: {
              description: "Invalid password",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      // ── /api/activities ────────────────────────────────────────
      "/api/activities": {
        get: {
          tags: ["Activities"],
          summary: "Get all activities for the authenticated user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "List of activities",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Activity" },
                  },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Activities"],
          summary: "Create a new activity",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ActivityRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Activity created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Activity" },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/activities/{id}": {
        delete: {
          tags: ["Activities"],
          summary: "Delete an activity by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "Activity ID",
            },
          ],
          responses: {
            200: {
              description: "Activity deleted",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/MessageResponse" },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      // ── /api/metrics ───────────────────────────────────────────
      "/api/metrics": {
        get: {
          tags: ["Metrics"],
          summary: "Get all metrics for the authenticated user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "List of metrics",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Metric" },
                  },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Metrics"],
          summary: "Create a new metric entry",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MetricRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Metric created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Metric" },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/metrics/{id}": {
        delete: {
          tags: ["Metrics"],
          summary: "Delete a metric by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "Metric ID",
            },
          ],
          responses: {
            200: {
              description: "Metric deleted",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/MessageResponse" },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // paths are defined inline above
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:5000/api-docs");
}