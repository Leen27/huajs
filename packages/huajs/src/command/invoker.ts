import { rejectMessages } from "./rejectMessages";
import type { ICommand } from "./commands"
import { creater } from './factory'
import { isString } from 'huajs-utils'


export class Invoker { 
  private _isLocked: boolean
  private _undoStack: Array<ICommand>
  private _redoStack: Array<ICommand>

  constructor() {
    this._isLocked = false
    this._undoStack = []
    this._redoStack = []
  }

  register() {
    // ...
  }
  
  execute(command: ICommand | string, ...args: any) {
    if (this._isLocked) {
      return Promise.reject(rejectMessages.isLock);
    }

    if (isString(command)) {
      const _cmd = creater(command, ...args)
      if (!_cmd) return null
      command = _cmd
    }

    return this._invokeExecution(command).then((value) => value)
  }

  undo() {
    let command = this._undoStack.pop();
    let promise
    let message = ''

    if (command && this._isLocked) {
      this.pushUndoStack(command)
      command = undefined
    }
    if (command) {
      promise = this._invokeUndo(command);
    } else {
      message = rejectMessages.undo;
      if (this._isLocked) {
        message = `${message} Because ${rejectMessages.isLock}`;
      }
      promise = Promise.reject(message);
    }

    return promise
  }
  
  async _invokeExecution(command: ICommand) {
    this.lock()
    try {
      const res = await command.execute()
      this.pushUndoStack(command)
      this.unlock()
      return res
    } catch(message) {
      this.unlock()
      return Promise.reject(message);
    }

  }

  async _invokeUndo(command: ICommand) {
    this.lock();

    try {
      const res = await command.undo()
      this.pushRedoStack(command);
      this.unlock();
      return res
    } catch(message) {
      this.unlock();

      return Promise.reject(message);
    }
  }

  pushUndoStack(command: ICommand) {
    this._undoStack.push(command)
  }

  pushRedoStack(command: ICommand) {
    this._redoStack.push(command);
  }

  lock() {
    this._isLocked = true
  }

  unlock() {
    this._isLocked = false
  }

  isEmptyUndoStack() {
    return this._undoStack.length === 0;
  }
}