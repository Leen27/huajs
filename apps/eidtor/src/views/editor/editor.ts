import { rejectMessages } from "@/const/rejectMessages";
import type { ICommand } from "huajs-core";

class Invoker { 
  private _isLocked: boolean
  private _undoStack: Array<ICommand>
  private _redoStack: Array<ICommand>

  constructor() {
    this._isLocked = false
    this._undoStack = []
    this._redoStack = []
  }
  
  execute(command: ICommand) {
    if (this._isLocked) {
      return Promise.reject(rejectMessages.isLock);
    }

    return this._invokeExecution(command).then((value) => {
      return value;
    });
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
    const res = await command.execute()
    this.pushUndoStack(command)
    return res
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

class Editor {
  invoker: Invoker
  constructor() {
    this.invoker = new Invoker()
  }
}