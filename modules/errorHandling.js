process.on('uncaughtException', (err) => {
    console.error('Uncaught error', err);
});