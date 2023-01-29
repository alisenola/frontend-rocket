export interface IRocket {
  id?: number,
  name: string,
  description: string,
  height: number,
  diameter: number,
  mass: number,
  photo?: string | File
}