import {Test} from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import {INestApplication, ValidationPipe} from "@nestjs/common"
import * as pactum from "pactum"
import { SigninDto, SignupDto } from "src/auth/dto"
import { UpdateUserDto } from "src/user/dto"
import { CreateBookMarkDto } from "src/bookmark/dto"
import {Bookmark} from "@prisma/client"
describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
     app = moduleRef.createNestApplication();
     app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
     )
     await app.init();
     pactum.request.setBaseUrl('http://localhost:3001/api')
  });

  afterAll(() => {
    app.close();
  });

  describe('Signup', () => {
    const signupBody:SignupDto = {
      email: 'johndoe9@gmail.com',
      firstname: 'andro',
      lastname: 'eugenio',
      password: '123123'
    }
    it('should throw an error', () => {
      return pactum
      .spec()
      .post('/auth/signup')
      .withBody({})
      .expectStatus(400);
    })
    it('should signup', () => {
      return pactum
      .spec()
      .post('/auth/signup')
      .withBody(signupBody)
      .expectStatus(201);
    })
  })

  describe('Signin', () => {
    const signinBody:SigninDto = {
      email: 'johndoe@gmail.com',
      password: '123123'
    }
    it('should throw an error', () => {
      return pactum
      .spec()
      .post('/auth/signin')
      .withBody({})
      .expectStatus(400);
    })
    it('should signin', () => {
      return pactum
      .spec()
      .post('/auth/signin')
      .withBody(signinBody)
      .expectStatus(200)
      .stores('userAt', 'access_token')
    })
  })

  describe('Users', () => {

    describe('Get me', () => {
      it('should return my info', () => {
        return pactum
        .spec() 
        .get('/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200);
      })
    })

    describe('Update user', () => {
      const updateBody: UpdateUserDto = {
        email: "menandroeugenio111@gmail.com",
        firstname: "atong",
      }
      it('should return Update user', () => {
        return pactum
        .spec() 
        .patch('/users')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody({})
        .expectStatus(200);
      })
    })
  })
  
  describe('Bookmarks', () => {
    
    describe('Get Empty Booksmarks', () => {
      it('should get bookmarks', () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .inspect()
      })
    })
    
    describe('Create Bookmarks', () => {
      const createDto: CreateBookMarkDto = {
        title: 'Avatar, the legend of aang',
        link: 'http://localhost:3001.com',
        description: "cartoon about elemental bending"
      }
      it('should create bookmark', () => {
        return pactum
        .spec()
        .post('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(createDto)
        .expectStatus(201)
        .stores('bookmarkId', 'id')
      })
    })

    describe('Get Bookmarks', () => {
      it('should get all the bookmarks with atleast 1', () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
      })
    })

    describe('Get Bookmark by id', () => {
      it('should get a bookmark by id', () => {
        return pactum
        .spec()
        .get('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .inspect()
      })
    })

    describe('Update Bookmark by id', () => {
      it('shoud update bookmark', () => {
        return pactum
        .spec()
        .patch('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .inspect()
      })
    })

    describe('Delete Bookmark by id', () => {
      it('shoud delete bookmark', () => {
        return pactum
        .spec()
        .patch('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .inspect()
      })
    })
  })

})