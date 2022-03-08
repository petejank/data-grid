import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import routes from './routes'

@NgModule({
  // Hash location strategy as my demo server doesn't allow me to provide Nginx config to support non-hash routes
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
