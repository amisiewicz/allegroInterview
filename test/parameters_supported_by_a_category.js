const chakram = require('chakram');
const helper = require("../helper.js");
expect = chakram.expect;

describe("Test parameters supported by category", function () {
    let headers;

    before(async function () {
        headers = await helper.getAuthorizationHeaders();
    });

    it("Get parameters supported by category", async function () {
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/12/parameters`, headers);
        await helper.expectPositiveResponse(response)
        await helper.verifyResponse(response, "./schemas/parameters_supported_by_a_category.json");
        return chakram.wait();
    });

    it("Get parameters - invalid category", async function () {
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/invalid_category_id/parameters`, headers);
        await helper.expectNegativeResponse(response)
        return chakram.wait();
    })

    it("Get parameters - invalid URL", async function () {
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/12/invalid_url`, headers);
        await helper.expectNegativeResponse(response)
        return chakram.wait();
    })

    it("Get a category by ID - header without Accept", async function () {
        const headerWithoutAccept = {headers: {Authorization: headers.headers.Authorization}}
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/12/parameters`, headerWithoutAccept);
        await helper.expectProperResponse(response, 406, helper.REGULAR_JSON_CONTENT_TYPE);
        return chakram.wait();
    })

    it("Get a category by ID - unauthorized", async function () {
        const unauthorizedHeader = {headers: {Accept: headers.headers.Accept}}
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/12/parameters`, unauthorizedHeader);
        await helper.expectProperResponse(response, 401, helper.REGULAR_JSON_CONTENT_TYPE);
        return chakram.wait();
    })
})
;