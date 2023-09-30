export class Component {
  key: string
  data: object
  constructor( configs : { key: string, data?: object} = { key: '' }) {
    this.key = configs.key
    this.data = configs.data || {}
  }
}
