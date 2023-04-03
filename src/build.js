const { spawn } = require("child_process");

function build() {
    const child = spawn(process.platform == 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'])

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

module.exports = build;