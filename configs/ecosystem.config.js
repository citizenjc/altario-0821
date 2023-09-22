module.exports = {
  apps: [
    {
      name: "backend-dev",
      interpreter: "bash",
      script: "yarn",
      args: "start",
      watch: true,
      ignore_watch: ["node_modules", "public", "storage"],
    },
    {
      name: "backend-prod",
      script: "./src/index.js",
      watch: false,
    },
    {
      name: "frontend-dev",
      interpreter: "bash",
      script: "yarn",
      args: "start",
      watch: true,
      ignore_watch: ["node_modules", "vite.config.ts.timestamp*"],
    },
  ],
};
