import { UserModel } from './../models/User'
import { UserProp } from './../helpers/UserProp'
import { TelegrafContext } from 'telegraf/typings/context'

export async function handleNetwork(ctx: TelegrafContext & UserProp) {
  const password = ctx.message.text.substr('/network '.length)
  if (!password) {
    if (ctx.dbuser.password) {
      const number = await UserModel.countDocuments({
        password: ctx.dbuser.password,
      })
      return ctx.replyWithHTML(
        `Вы подписаны на сообщество с паролем <code>${ctx.dbuser.password}</code>. На данный момент, количество людей в сообществе: ${number}. Каждые 2 дня бот будет присылать вам новый контакт. Спасибо!`
      )
    }
    return ctx.replyWithHTML(
      'Пожалуйста, пришлите сообщение в формате <code>/network пароль_коммьюнити</code>.'
    )
  }
  const number = await UserModel.countDocuments({ password })
  if (ctx.dbuser.password === password) {
    return ctx.replyWithHTML(
      `Вы уже подписаны на сообщество с паролем <code>${password}</code>. На данный момент, количество людей в сообществе: ${number}. Каждые 2 дня бот будет присылать вам новый контакт. Спасибо!`
    )
  }
  ctx.dbuser.password = password
  await ctx.dbuser.save()
  return ctx.replyWithHTML(
    `Успех! Вы успешно подписались на сообщество с паролем <code>${password}</code>. На данный момент, количество людей в сообществе: ${
      number + 1
    }. Каждые 2 дня бот будет присылать вам новый контакт. Спасибо!`
  )
}
