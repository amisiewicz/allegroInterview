const chakram = require('chakram');
expect = chakram.expect;
const helper = require("../helper.js");

describe("Test categories by ID", function () {
    let headers;

    before(async function () {
        headers = await helper.getAuthorizationHeaders();
    });

    it("Get a category by ID", async function () {
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/12`, headers);
        const expectedSchemaJSON = "./schemas/category_by_id.json";
        await helper.verifyResponse(response, expectedSchemaJSON);
        return chakram.wait();
    });

    it("Get a category by invalid ID", async function () {
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/invalid_category_id`, headers);
        await helper.expectNegativeResponse(response)
        return chakram.wait();
    })

    it("Get a category by ID - header without Accept", async function () {
        const headerWithoutAccept = {headers: {Authorization: headers.headers.Authorization}}
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/12`, headerWithoutAccept);
        await helper.expectProperResponse(response, 406, helper.REGULAR_JSON_CONTENT_TYPE);
        return chakram.wait();
    })

    it("Get a category by ID - unauthorized", async function () {
        const unauthorizedHeader = {headers: {Accept: headers.headers.Accept}}
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories/12`, unauthorizedHeader);
        await helper.expectProperResponse(response, 401, helper.REGULAR_JSON_CONTENT_TYPE);
        return chakram.wait();
    })
})