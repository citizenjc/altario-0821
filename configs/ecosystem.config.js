module.exports = {
  apps: [
    {
      name: "backend-dev",
      interpreter: "bash",
      script: "yarn",
      args: "dev",
      ignore_watch: ["node_modules", "public", "storage"],
    },
    {
      name: "backend-prod",
      script: "dist/index.js",
      watch: false,
    },
    {
      name: "frontend-dev",
      interpreter: "bash",
      script: "yarn",
      args: "dev",
    },
    {
      name: "frontend-prod",
      script: "serve",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 5173,
        PM2_SERVE_SPA: "true",
      },
      watch: false,
    },
  ],
};
