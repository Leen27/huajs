import { useRepo, type Model, Repository } from 'pinia-orm'
import * as EntityRepo from './entity'
import * as EditorRepo from './graphic'

export * from './entity'

const repos: Record<string, () => Repository<Model>> = {}

const register = (model: Repository<Model>) => {
  console.log(model.entity, 'm')
  if (!model.entity) return
  repos[model.entity] = () => useRepo(model)
}

for(const repo of [EntityRepo, EditorRepo]) {
  for(const key in repo) {
    register((repo as any)[key])
  }
}

export default repos