/* eslint-disable no-undef */
const moxios = require("moxios");
const request = require("supertest");
const app = require("../app");

const dummyResponse = { data: { results: [] } };

describe("GET /getJobsByCity", () => {
    beforeEach(() => {
        jest.resetModules(); // this is important - it clears the cache
        const { CLIENT_AUTH_KEY } = process.env;
        expect(CLIENT_AUTH_KEY).toBeTruthy();

        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("It should fetch London jobs from Reed", async () => {
        moxios.stubRequest(/https:\/\/www.reed.co.uk\/api\/1.0\/search/, {
            status: 200,
            response: dummyResponse
        });
        await request(app).get("/getJobsByCity?city=London");
        expect(moxios.requests.mostRecent().url).toBe(
            // eslint-disable-next-line max-len
            "https://www.reed.co.uk/api/1.0/search?locationName=London?distanceFromLocation=0"
        );
    });

    it("There should be authorization key in the header", async () => {
        moxios.stubRequest(/https:\/\/www.reed.co.uk\/api\/1.0\/search/, {
            status: 200,
            response: dummyResponse
        });
        await request(app).get("/getJobsByCity?city=London");
        expect(moxios.requests.mostRecent().config.auth).toStrictEqual({
            username: `${process.env.CLIENT_AUTH_KEY}`
        });
        expect(
            moxios.requests.mostRecent().config.headers["Authorization"]
        ).toBeTruthy();
    });

    it("GET jobs by city parameter from reed", async () => {
        moxios.stubRequest(/https:\/\/www.reed.co.uk\/api\/1.0\/search/, {
            status: 201,
            response: dummyResponse
        });
        const res = await request(app).get("/getJobsByCity?city=London");

        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            data: { results: [] }
        });
    });

    it("GET jobs with no city parameter should 422", async () => {
        const res = await request(app).get("/getJobsByCity");

        expect(res.status).toEqual(422);
        expect(res.body).toEqual("City param missing");
    });

    it("GET jobs with city and no authorisation", async () => {
        let hold_auth_key = process.env.CLIENT_AUTH_KEY;

        delete process.env.CLIENT_AUTH_KEY;

        const res = await request(app).get("/getJobsByCity?city=London");

        expect(res.status).toEqual(401);
        expect(res.body).toEqual("No authorization key set, request will 401");

        // eslint-disable-next-line require-atomic-updates
        process.env.CLIENT_AUTH_KEY = hold_auth_key;
    });
});
