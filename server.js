const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')

const app = new Koa()
const router = new Router()



app.use(serve('.'))

app.listen(3000, () => {
	console.log('App is listening on port 3000')
})