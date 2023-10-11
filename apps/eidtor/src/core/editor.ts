import { RenderEngine, type EngineOptions } from 'huajs-core'

class Editor {
  declare renderEngine: RenderEngine
  
  constructor(configs: EngineOptions) {
    this.renderEngine = new RenderEngine(configs)
  }
}

export default Editor