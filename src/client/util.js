import { Subject } from 'rxjs'

export const createObservableFrom = (fn) => {
  const subject$ = new Subject()
  const observableFunction = (...args) => {
    subject$.next.apply(subject$, args)
    return fn.apply(null, args)
  }
  observableFunction.stream$ = subject$
  return observableFunction
}
