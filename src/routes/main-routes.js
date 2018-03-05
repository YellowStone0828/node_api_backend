import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter()

router
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  })
  
  // .get('/api/:name', controllers.api.Get)
  // .post('/api/:name', controllers.api.Post)
  // .put('/api/:name', controllers.api.Put)
  // .del('/api/:name', controllers.api.Delect)
  // .post('/auth/:action', controllers.auth.Post)

  .post('/login', controllers.auth.Login)
  .post('/play/checkwinner',controllers.api.checkwinners)
  .post('/play/testDB',controllers.api.testDB)

module.exports = router
