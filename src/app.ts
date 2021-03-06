import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import { bot } from './helpers/bot'
import { checkTime } from './middlewares/checkTime'
import { sendHelp } from './commands/help'
import { attachUser } from './middlewares/attachUser'
import { handleNetwork } from './commands/network'
import { handleNonetwork } from './commands/nonetwork'
import { matchmake } from './helpers/matchmaking'
import { checkSuperAdmin } from './middlewares/checkSuperAdmin'

// Check time
bot.use(checkTime)
// Attach user
bot.use(attachUser)
// Setup commands
bot.command('network', handleNetwork)
bot.command('nonetwork', handleNonetwork)
bot.command('matchmake', checkSuperAdmin, matchmake)
bot.use(sendHelp)
// Catch error
bot.catch(console.error)

// Start bot
bot.launch()

// Log
console.info('Bot is up and running')
