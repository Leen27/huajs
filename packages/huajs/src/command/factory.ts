import { type ICommandWithConsturctor } from './commands'
import * as commandList from './commands'

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
    register((commandList as any)[key] as ICommandWithConsturctor)
}

export {
    creater,
    register
}