import { ComponentObjectPropsOptions, SetupContext } from 'vue'

import { AssociativeType } from '../constructors/types'

type DesignSetupValue = AssociativeType | (() => AssociativeType)

interface DesignSetup {
  classes: AssociativeType
}

export class Design<P = ComponentObjectPropsOptions> {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: { [K in keyof P]: any },
    protected readonly context: SetupContext
  ) {
  }

  setup<D = DesignSetupValue> (dataCallback: D): DesignSetup {
    // TODO: Close

    console.log('dataCallback', dataCallback)

    return {
      classes: {
        main: 'is-classes-name'
      }
    }
  }
}
