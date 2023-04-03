const { spawn } = require("child_process");

function test() {
    const child = spawn(process.platform == 'win32' ? 'npm.cmd' : 'npm', ['test'])

    child.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`error: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = test;