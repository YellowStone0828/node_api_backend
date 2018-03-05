import Koa2 from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import {
  System as SystemConfig
} from './config'
import path from 'path'
import MainRoutes from './routes/main-routes'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoutes from './routes/error-routes'
import jwt from 'koa-jwt'
import fs from 'fs'

const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))

app
  .use((context, next) => {
    if (context.request.header.host.split(':')[0] === 'localhost' || context.request.header.host.split(':')[0] === '127.0.0.1') {
      context.set('Access-Control-Allow-Origin', '*')
    } else {
      context.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
    }
    context.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    context.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    context.set('Access-Control-Allow-Credentials', false) // 此处设置请求是否携带cookie
    return next()
  })
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // 静态资源
  .use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/login|\/assets/] }))//扫描无需token即可访问的api
  .use(KoaBody({
    multipart: true,
    strict: false,
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) 
  .use(MainRoutes.routes())
  .use(MainRoutes.allowedMethods())
  .use(ErrorRoutes())

if (env === 'development') { // logger
  app.use((context, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${context.method} ${context.url} - ${ms}ms`)
    })
  })
}

app.listen(SystemConfig.API_server_port)

console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')

export default app
