import {Routes} from '@angular/router'

const HomeModuleLazy = () => import('src/app/modules/home/home.module').then((m) => m.HomeModule)

export default [
  {
    path: 'home',
    loadChildren: HomeModuleLazy,
    data: {
      preload: true
    }
  },
  {
    path: '**',
    redirectTo: '/home'
  }
] as Routes
