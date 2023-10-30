export type EntityT = {
  id?: string
  position?: {
    x: number,
    y: number
  }
  size?: {
    width: number
    height: number
    radius: number
  }
}

export type ShapeT = EntityT & {
  shapeType: string
}