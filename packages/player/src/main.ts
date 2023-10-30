import './style.css'
import { createPlayer } from '../lib/main.ts'
import data01 from './json/data01.json'

createPlayer('#app').initEntities(data01.entity as any)
