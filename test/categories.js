const chakram = require('chakram');
expect = chakram.expect; //global object

const helper = require("../helper.js");
let expectedSchemaJSON = "./schemas/categories.json";

describe("Test categories", function () {
    let headers;

    before(async function () {
        headers = await helper.getAuthorizationHeaders();
    });

    it("Get list of main Allegro categories", async function () {
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories`, headers)
        await helper.verifyResponse(response, expectedSchemaJSON);
        response.body.categories.forEach(function (elem) {
            expect(elem.parent, "Root categories should not have parent").to.equal(null);
        });
        return chakram.wait();
    });

    it("Get children of Allegro category by parent ID", async function () {
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/categories?parent.id=12`, headers)
        await helper.verifyResponse(response, expectedSchemaJSON);
        response.body.categories.forEach(function (elem) {
            expect(elem.parent, "This is not child category - parent parameter is null").to.notEqual(null);
        });
        return chakram.wait();
    });

    it("Get categories - invalid root URL", async function () {
        const response = await chakram.get(`${helper.API_ROOT_URL}sale/invalid_URL`, headers);
        await helper.expectNegativeResponse(response)
        return chakram.wait();
    })

})
;