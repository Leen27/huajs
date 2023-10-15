export type ShapeT = {
  id?: string
  shapeInfo?: {
    id?: string,
    shapeType: string
  },
  position?: {
    id?: string
    x: number,
    y: number
  }
  size?: {
    id?: string
    width: number
    height: number
    radius: number
  }
}