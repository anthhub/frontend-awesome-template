export default function checkEffects<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class extends WrappedComponent {
    constructor(...args: any[]) {
      super(...args)

      if (this.effects) {
        throw Error('Forbid effects methods!')
      }
    }
  }
}
