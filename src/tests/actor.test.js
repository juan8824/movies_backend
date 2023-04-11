const request = require('supertest');
const app = require('../app.js');

let actorId

test("POST /actors should return 201", async() => {
    const newActor = {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "United States",
        image: "https://www.nme.com/wp-content/uploads/2020/08/Leonardo-Di-Caprio.jpg",
        birthday: 1974-11-11
    }
    const res = await request(app)
        .post('/actors')
        .send(newActor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName)
})

test("GET /actors should return 200 code", async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /actors/:id should update an actor", async() => {
    const body = {
        image: "https://media1.popsugar-assets.com/files/thumbor/kcRAS4FiqXFqgHqxu7-SmTtcxPc/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/02/05/800/n/1922398/2e52934cd53bdf9c_42-22840538/i/Leonardo-DiCaprio-Baby-Pictures.jpg"
    }
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.image).toBe(body.image)
})

test("DELETE /actors/:id should delete one actor", async() => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
})