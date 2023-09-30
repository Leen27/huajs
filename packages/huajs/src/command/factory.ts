import { type ICommandWithConsturctor } from './commands'
import * as commandList from './commands'

console.log(commandList, 'commandList')

const commands: Record<string, ICommandWithConsturctor> = {}

const register = (command: ICommandWithConsturctor) => {
    if (!command.name) return
	commands[command.name] = command
}

const creater = (commandName: string, ...args: any) => {
    const cmd = commands[commandName]

    if (!cmd) return null

    return new cmd(...args)
}

for(const key in commandList) {
    console.log(key, '#1')
    register((commandList as any)[key] as ICommandWithConsturctor)
}

export {
    creater,
    register
}