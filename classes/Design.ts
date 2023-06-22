import { ComponentObjectPropsOptions, SetupContext } from 'vue'

import { AssociativeType } from '../constructors/types'

interface DesignSetup {
  classes: AssociativeType
}

interface DesignPropertiesItem {
  name: string,
  value: (string | boolean)[],
  style?: boolean,
  default?: boolean
}

type DesignProperties = DesignPropertiesItem[]
type DesignSetupValue = AssociativeType | (() => AssociativeType)

export class Design<P = ComponentObjectPropsOptions> {
  protected name ?: string
  protected properties?: DesignProperties

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: { [K in keyof P]: any },
    protected readonly context: SetupContext
  ) {
  }

  setName (name: string): this {
    this.name = name
    return this
  }

  setProperties (properties: DesignProperties): this {
    this.properties = properties
    return this
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
