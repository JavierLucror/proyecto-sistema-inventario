import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { PanelControlComponent } from './componentes/panel-control/panel-control.component';
import { VenderComponent } from './componentes/vender-container/vender/vender.component';
import { VentasComponent } from './componentes/ventas-container/ventas/ventas.component';
import { ProductosComponent } from './componentes/productos-container/productos/productos.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { MovimientosComponent } from './componentes/inventario/movimientos/movimientos.component';
import { NotificacionesComponent } from './componentes/notificaciones/notificaciones.component';
import { ComprarComponent } from './componentes/comprar-container/comprar/comprar.component';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { CategoriasComponent } from './componentes/categorias-container/categorias/categorias.component';
import { PedidosComponent } from './componentes/pedidos-container/pedidos/pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: PanelControlComponent
  },
  {
    path: 'dashboard',
    component: PanelControlComponent
  },
  {
    path: 'vender',
    component: VenderComponent
  },
  {
    path: 'comprar',
    component: ComprarComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'inventario',
    component: InventarioComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'movimientos',
    component: MovimientosComponent
  },
  {
    path: 'notificaciones',
    component: NotificacionesComponent
  },
  {
    path: 'login-usuario',
    component: LoginUsuarioComponent
  },
  {
    path: 'registrar-usuario',
    component: RegistrarUsuarioComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
