
import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

app.get('/*', (req, res, next) => {
    
    getResourceFilename(req.path).then(filename => {
        res.sendFile(filename, {}, (err) => {
            if (err) {
                next(err);
            }
            else {
                console.log('GET', req.path, 'OK');
            }
        });    
    }, () => {
        // resource not found
        console.log('GET', req.path, 'not found');
        res.sendStatus(404);
    });

});

function getResourceFilename(resource: string): Promise<string> {

    const promise = new Promise<string>((resolve, reject) => {
        let resourceFilename = path.join(__dirname, '/data/', resource + '.json');
        console.log('check',resourceFilename);
        fs.exists(resourceFilename, exists => {
            if (exists) {
                resolve(resourceFilename);
            }
            else {
                reject();
            }
        });
    });

    return promise;
}

console.log('starting server');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('listening on', port);
})