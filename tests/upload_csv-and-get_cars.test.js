const request = require("supertest");
const app = require("../app");
const path = require("path");
const fs = require("mz/fs");
const db = require("../config/db");

beforeAll(async () => db.dbConnect());
afterAll(async () => db.dbDisconnect());

let testFilePath = null;
describe("POST /api/csv/upload - upload a csv file", () => {
  const filePath = `${path.resolve()}/mock/dev-challenge.csv`;

  it("should upload the mock CSV file", () =>
    fs.exists(filePath).then((exists) => {
      // Check if the mock CSV file is exist
      if (!exists)
        throw new Error("mock CSV file does not exist. Check the mock folder");
      return (
        request(app)
          .post("/api/csv/upload")
          // Attach the CSV mock file with key 'file'
          .attach("file", filePath)
          .then((res) => {
            const { successfull, message, filePath } = res.body;
            expect(successfull).toBeTruthy();
            expect(message).toBe("CSV File Uploaded");
            expect(typeof filePath).toBeTruthy();
            // store file data for following tests
            testFilePath = filePath;
          })
          .catch((err) => console.log(err))
      );
    }));
});

describe("GET /api/cars - list the stored cars", () => {
  it("should list the stored cars", (done) => {
    request(app)
        .get("/api/cars")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200,done)
  });
});
