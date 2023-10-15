import { useRepo, type Model, Repository } from 'pinia-orm'
import * as entityRepo from './entity'
export * from './entity'

const repos: Record<string, () => Repository<Model>> = {}

const register = (model: Repository<Model>) => {
  if (!model.name) return
  repos[model.name] = () => useRepo(model)
}

for(const key in entityRepo) {
  register((entityRepo as any)[key])
}

export default repos