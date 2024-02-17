// #ifdef APP-PLUS
import service from './app'
// #endif

let app = {}

if (typeof service !== 'undefined') {
  app = service
}

export default app
