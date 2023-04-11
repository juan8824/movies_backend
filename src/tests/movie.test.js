const request = require('supertest');
const app = require('../app.js');
const Actor = require('../models/Actor.js');
const Director = require('../models/Director.js');
const Genre = require('../models/Genre.js');

let movieId

test("POST /movies should return 201", async() => {
    const newMovie = {
        name: "Blade Runner",
        image: "https://pics.filmaffinity.com/Blade_Runner-351607743-large.jpg",
        synopsis: "In the early twenty-first century, the Tyrell Corporation, during what was called the Nexus phase, developed robots, called replicants, that were supposed to aid society, the replicants which looked and acted like humans. When the superhuman generation Nexus 6 replicants, used for dangerous off-Earth endeavors, began a mutiny on an off-Earth colony, replicants became illegal on Earth. Police units, called blade runners, have the job of destroying - or in their parlance retiring - any replicant that makes its way back to or created on Earth, with anyone convicted of aiding or assisting a replicant being sentenced to death. It's now November, 2019 in Los Angeles, California. Rick Deckard, a former blade runner, is called out of retirement when four known replicants, most combat models, have made their way back to Earth, with their leader being Roy Batty. One, Leon Kowalski, tried to infiltrate his way into the Tyrell Corporation as an employee, but has since been able to escape. Beyond following Leon's trail in hopes of finding and retiring them all, Deckard believes part of what will help him is figuring out what the replicants wanted with the Tyrell Corporation in trying to infiltrate it. The answer may lie with Tyrell's fail-safe backup mechanism. Beyond tracking the four, Deckard faces a possible dilemma in encountering a fifth replicant: Rachael, who works as Tyrell's assistant. The issue is that Dr. Elden Tyrell is experimenting with her, to provide her with fake memories so as to be able to better control her. With those memories, Rachael has no idea that she is not human. The problem is not only Rachael's assistance to Deckard, but that he is beginning to develop feelings for her.",
        releaseYear: 1982
    }
    const res = await request(app)
        .post('/movies')
        .send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name)
})

test("GET /movies should return 200 code", async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /movies/:id should update a movie", async() => {
    const body = {
        name: "The Truman Show"
    }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name)
})

test("POST /movies/:id/actors should set the movie actors", async() => {
    const actor = await Actor.create({
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "United States",
        image: "https://www.nme.com/wp-content/uploads/2020/08/Leonardo-Di-Caprio.jpg",
        birthday: 1974-11-11
    })
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)
})

test("POST /movies/:id/directors should set the movie directors", async() => {
    const director = await Director.create({
        firstName: "Alfred",
        lastName: "Hitchcock",
        nationality: "United Kingdom",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/94/Hitchcock%2C_Alfred_02.jpg",
        birthday: 1899-8-13
    })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)
})

test("POST /movies/:id/genres should set the movie genres", async() => {
    const genre = await Genre.create({
        name: "Horror"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)
})

test("DELETE /movies/:id should delete one movie", async() => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
})