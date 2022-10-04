import {Test} from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import {INestApplication, ValidationPipe} from "@nestjs/common"
import * as pactum from "pactum"
import { SigninDto, SignupDto } from "src/auth/dto"
import { UpdateUserDto } from "src/user/dto"
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
      email: 'johndoe33331@gmail.com',
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

  describe('User', () => {
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
  


})