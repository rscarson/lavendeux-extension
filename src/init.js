const prompt = require("prompt-sync")({ sigint: true });
const { spawn } = require("child_process");
const fs = require('fs-extra');
var path = require('path');

function isEmpty(path) {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(err, files) {
            if (err || files.length>0) reject(err || `${path} was not empty!`);
            resolve(true);
        });
    });
}

function alterFile(dir, filename, parameters) {
    return new Promise(function(resolve, reject) {
        filename = path.join(dir, filename);
        fs.readFile(filename, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            };

            data = data.toString();
            for (let k of Object.keys(parameters)) {
                data = data.replaceAll(k, parameters[k]);
            }
    
            fs.writeFileSync(filename, data);
            resolve();
        });
    });
}

function init(name) {
    const dir = process.cwd();
    isEmpty(dir)
    .then(result => {
        let parameters = {
            '<NAME>': name,
            '<SHORTDESC>': prompt('Enter a short description of your extension: '),
            '<AUTHOR>': prompt('Enter your name (author\'s name): '),
        };

        // Copy template to target directory
        fs.copy('../template', dir)
        .then(async () => {
            await alterFile(dir, 'package.json', parameters);
            await alterFile(dir, 'README.md', parameters);

            console.log("\nRunning npm install...");
            
            const child = spawn(process.platform == 'win32' ? 'npm.cmd' : 'npm', ['install'])

            child.on('error', (err) => {
                console.log(`${err}`);
            });

            child.stdout.on('data', (data) => {
                console.log(`${data}`);
            });

            child.stderr.on('data', (data) => {
                console.error(`error: ${data}`);
            });

            child.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
            
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => console.log(err));
}

module.exports = init;