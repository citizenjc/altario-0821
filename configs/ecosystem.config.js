module.exports = {
  apps: [
    {
      name: "backend-dev",
      interpreter: "bash",
      script: "yarn",
      args: "start",
      watch: ["/app/src"],
      instances: 1,
      restart_delay: 2000,
      ignore_watch: ["node_modules", "public", "storage"],
    },
    {
      name: "backend-prod",
      script: "./src/index.js",
    },
    {
      name: "frontend-dev",
      interpreter: "bash",
      script: "yarn",
      args: "start",
    },
  ],
};
