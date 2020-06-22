// log a message and stop the server
function terminateServer(action, error = {}) {
    const errorMsg = action + ':\n'
        + (error.code ? `Code: ${error.code}` + '\n' : '')
        + (error.message ? error.message + '\n' : '');
    console.log(errorMsg, '\nThe Server is terminating.\n');
    process.exit(1);
};

//Check if the url of the body is valid
function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

function ngoCheck(req, res) {
    if (!req.body.name) {
        res.status(400).json({ error: 'Name is required' })
    } else if (!isURL(req.body.webpage)) {
        res.status(400).json({ error: 'Wrong URL' })
    } else if (!req.body.description) {
        res.status(400).json({ error: 'Description is required' })
    } else if (req.body.affinities.length === 0 || req.body.affinities.length > 3) {
        res.status(400).json({ error: 'You must pick 1 to 3 affinities' })
    } else if (!req.body.contact.address || !req.body.contact.phone) {
        res.status(400).json({ error: 'Address and phone are required' })
    } else return;
}

module.exports.terminateServer = terminateServer;
module.exports.isURL = isURL;
module.exports.ngoCheck = ngoCheck;