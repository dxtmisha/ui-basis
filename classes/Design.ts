import { ComponentObjectPropsOptions, SetupContext } from 'vue'

export class Design<P = ComponentObjectPropsOptions> {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: { [K in keyof P]: any },
    protected readonly context: SetupContext
  ) {
  }
}
