module.exports = {
    apps: [
        {
            name: 'backend-dev',
            script: './app.js',
            watch: true,
            ignore_watch: ['node_modules', 'public', 'storage'],
            node_args: '--trace-warnings',
        },
        {
            name: 'backend-prod',
            script: './app.js',
            watch: false,
        },
    ],
}
