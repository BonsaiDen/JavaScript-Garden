// This server implements a post-receive hook handler for github that will build the site
var build = require('./build').build,
    qs = require('querystring'),
    port = 9900,
    repoURL = "https://github.com/cramerdev/JavaScript-Garden";

require('http').createServer(function (request, response) {
    var payload = '';
    try {
        if (request.method === 'POST') {
            request.setEncoding('utf8');
            request.on('data', function (data) {
                payload += data;
            });
            request.on('end', function () {
                console.log(payload);
                payload = JSON.parse(qs.parse(payload).payload);
                if (payload.repository.url === repoURL) {
                    build();
                } else {
                    response.writeHead(400); // Bad Request
                }
            });
            response.writeHead(200); // OK
        } else {
            response.writeHead(405); // Method Not Allowed
        }
    } catch (e) {
        console.error("Error: " + e);
        response.writeHead(500); // Internal Server Error
    }
    response.end();
}).listen(port);
