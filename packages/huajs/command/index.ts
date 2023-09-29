import errorMessage from './errorMessage'
const createMessage = errorMessage.create;
const errorTypes = errorMessage.types;

/**
 * The Command interface declares a method for executing a command.
 */
interface ICommand {
    execute(): void
    undo(): void
}

type CommandConfig = {
    name: string
    execute?: () => void
    undo?: () => void
}

export class Command implements ICommand {
    name: string
    args?: Array<any>

    constructor(actions: CommandConfig, args?: Array<any>) {
        this.name = actions.name
        this.args = args
        actions.execute && (this.execute = actions.execute)
        actions.undo && (this.undo = actions.undo)
    }

    /**
     * Execute action
     * @param {Object.<string, Component>} compMap - Components injection
     * @abstract
     */
    execute() {
        throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'execute'));
    }

    /**
     * Undo action
     * @param {Object.<string, Component>} compMap - Components injection
     * @abstract
     */
    undo() {
        throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'undo'));
    }
}

export class AddShape extends Command {
    private payload: string;

    constructor() {
        super({
            name: 'ADD_SHAPE'
        })
    }

    public execute(): void {
        console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
    }

    public undo(): void {
        console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
    }
}