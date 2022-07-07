/* eslint-disable no-undef */
import request from 'supertest'
import app from './server'
import mysql from '../helpers/database'

let token = ''
let userId = ''

afterAll((done) => {
  done()
})

describe('Auth Service', () => {
  test('Register', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test',
      email: 'test@example.com',
      password: 'password'
    })
    expect(res.status).toBe(201)
    expect(res.body.data.affectedRows).toBe(1)
    userId = res.body.data.insertId
  })

  test('Login', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password'
    })
    expect(res.status).toBe(200)
    token = res.body.data.token
  })

  test('List User', async () => {
    const res = await request(app).get('/api/auth/users').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  test('Delete User', async () => {
    const del = await mysql.query('DELETE FROM auth_user WHERE id = ?', [userId])

    expect(del.affectedRows).toBe(1)
  })
})
