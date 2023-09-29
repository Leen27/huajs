import { ICommand } from './index'

const commands: Record<string, ICommand> = {}

const register = (command: ICommand) => {
	commands[command.name] = command
}

export {
    register
}