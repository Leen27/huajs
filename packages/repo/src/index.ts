import { useRepo, type Model, Repository } from 'pinia-orm'
import * as entityRepo from './entity'
import * as EditorRepo from './editor'
export * from './entity'
export * from './editor'

const repos: Record<string, () => Repository<Model>> = {}

const register = (model: Repository<Model>) => {
  if (!model.name) return
  repos[model.name] = () => useRepo(model)
}

for(const repo of [entityRepo, EditorRepo]) {
  for(const key in repo) {
    register((repo as any)[key])
  }
}

export default repos