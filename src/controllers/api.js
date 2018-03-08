export let Get = (ctx) => {
  ctx.body = {
    result: 'get',
    name: ctx.params.name,
    para: ctx.query
  }
}

export let Post = async (ctx) => {
  ctx.body = {
    result: 'post',
    name: ctx.params.name,
    para: ctx.request.body
  }
}

export let Put = (ctx) => {
  ctx.body = {
    result: 'put',
    name: ctx.params.name,
    para: ctx.request.body
  }
}

export let Delect = (ctx) => {
  ctx.body = {
    result: 'delect',
    name: ctx.params.name,
    para: ctx.request.body
  }
}

export let checkwinners = (ctx) => {
  const play = require('../services/gambling')
  play.checkwinner(ctx)
}

export let  testDB = async (ctx) => {
  const play = require('../services/gambling')
  await play.testDB(ctx)
}