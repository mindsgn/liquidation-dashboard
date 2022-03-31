export type HyphenProviderState = {
  connect: (() => Promise<void>) | null
  disconnect: (() => Promise<void>) | null
}

export const HyphenInitialState: HyphenProviderState = {
  connect: null,
  disconnect: null,
}

export type HyphenAction =
  | {
      type: 'SET_HYPHEN_PROVIDER'
    }

export function HyphenReducer(
  state: HyphenProviderState,
  action: HyphenAction
): HyphenProviderState {
  switch (action.type) {
    case 'SET_HYPHEN_PROVIDER':
      return {
        ...state,
      }
    default:
      throw new Error()
  }
}