export class Properties {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected designs: string[]
  ) {
    console.log('designs')
  }

  getScss (): string {
    return ''
  }
}
