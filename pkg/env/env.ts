export class Env {
  private name: string
  private value: string | null

  private constructor(name: string) {
    this.name = name
    this.value = null
  }

  get(): string {
    if (this.value !== null) {
      return this.value
    }

    const value = process.env[this.name]
    if (value === undefined) {
      throw Error(`No value for env var ${this.name}`)
    }
    this.value = value
    
    return value
  }

  static of(name: string): Env {
    return new Env(name)
  }
}
