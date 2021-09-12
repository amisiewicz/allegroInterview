const axios = require('axios');
const MAX_RESPONSE_TIME = 1000; //ms

module.exports.API_ROOT_URL = process.env.ALLEGRO_API_ROOT_URL;
module.exports.ALLEGRO_CONTENT_TYPE = "application/vnd.allegro.public.v1+json; charset=utf-8";
module.exports.REGULAR_JSON_CONTENT_TYPE = "application/json; charset=utf-8";

let headers;

module.exports.getAuthorizationHeaders = async function () {
    if (headers !== undefined) {
        return headers;
    }

    let response;
    try {
        response = await axios.post("https://allegro.pl/auth/oauth/token?grant_type=client_credentials", null, {
            auth: {
                username: process.env.ALLEGRO_CLIENT_ID,
                password: process.env.ALLEGRO_SECRET
            },
        })
    } catch (e) {
        console.error("Unable to authorize. " + e);
        process.exit(1);
    }

    headers = {
        headers: {
            Accept: "application/vnd.allegro.public.v1+json",
            Authorization: `Bearer ${response.data.access_token}`
        }
    };
    return headers
}

module.exports.expectProperResponse = async function (response, statusCode, contentType, responseTime) {
    if (responseTime === undefined) {
        responseTime = MAX_RESPONSE_TIME;
    }
    expect(response).to.have.status(statusCode);
    expect(response.response.headers["content-type"].toLowerCase()).to.equal(contentType);
    expect(response).to.have.responsetime(responseTime);
    expect(response).not.to.be.encoded.with.gzip;
}

module.exports.expectPositiveResponse = async function (response) {
    await module.exports.expectProperResponse(response, 200, module.exports.ALLEGRO_CONTENT_TYPE);
}

module.exports.expectNegativeResponse = async function (response) {
    await module.exports.expectProperResponse(response, 404, module.exports.REGULAR_JSON_CONTENT_TYPE);
}

module.exports.verifyResponse = async function (response, expectedSchemaJSON) {
    await module.exports.expectPositiveResponse(response);
    const expectedSchema = require(expectedSchemaJSON);
    expect(response).to.have.schema(expectedSchema);
}

if (!process.env.ALLEGRO_CLIENT_ID || !process.env.ALLEGRO_SECRET || !process.env.ALLEGRO_API_ROOT_URL) {
    console.error("Missing Env Variables, please refer to readme.md");
    process.exit(1);
}
