function filterPlays(insults, play) {
    const result = insults.filter((insult) => {
        const p = insult.play.toLowerCase() // Gör om allt till små bokstäver
        if (p.includes(play.toLowerCase())) {
            return insult;
        }
    });

    return result;
}

function checkBody(request, response, next) {
    const insultObj = request.body;

    if (insultObj.hasOwnProperty('insult') && insultObj.hasOwnProperty('play')) {
        next();
    } else {
        const result = {
            success: false,
            error: 'Wrong data in body'
        }

        response.status(400).json(result);
    }  
}

module.exports = { filterPlays, checkBody }