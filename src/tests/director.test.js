const request = require('supertest');
const app = require('../app.js');

let directorId

test("POST /directors should return 201", async() => {
    const newDirector = {
        firstName: "Alfred",
        lastName: "Hitchcock",
        nationality: "United Kingdom",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/94/Hitchcock%2C_Alfred_02.jpg",
        birthday: 1899-8-13
    }
    const res = await request(app)
        .post('/directors')
        .send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName)
})

test("GET /directors should return 200 code", async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /directors/:id should update a director", async() => {
    const body = {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Alfred_Hitchcock_as_a_baby_in_1899.jpg/640px-Alfred_Hitchcock_as_a_baby_in_1899.jpg"
    }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.image).toBe(body.image)
})

test("DELETE /directors/:id should delete one director", async() => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
})