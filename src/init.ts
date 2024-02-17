import platform from './platform'
import useSystemStore from './store/modules/system'

export async function initSystem() {
  await useSystemStore().init()

  platform.load()

  // #ifdef H5
  if (process.env.NODE_ENV === 'development') {
    import('vconsole').then(vconsole => {
      new vconsole.default()
    })
  }
  // #endif
}
