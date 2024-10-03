import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLinkActive } from '@angular/router';

//Componentes
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { PanelControlComponent } from './componentes/panel-control/panel-control.component';
import { VenderComponent } from './componentes/vender-container/vender/vender.component';
import { VentasComponent } from './componentes/ventas-container/ventas/ventas.component';
import { ProductosComponent } from './componentes/productos-container/productos/productos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { NotificacionesComponent } from './componentes/notificaciones/notificaciones.component';
import { ComprarComponent } from './componentes/comprar-container/comprar/comprar.component';
import { DetalleVentaComponent } from './componentes/ventas-container/detalle-venta/detalle-venta.component';
import { UsuarioBarraComponent } from './componentes/usuario-barra/usuario-barra.component';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { PedidosComponent } from './componentes/pedidos-container/pedidos/pedidos.component';
import { CategoriasComponent } from './componentes/categorias-container/categorias/categorias.component';
import { EditarCategoriaComponent } from './componentes/categorias-container/editar-categoria/editar-categoria.component';
import { EditarProductoComponent } from './componentes/productos-container/editar-producto/editar-producto.component';
import { DetallePedidoComponent } from './componentes/pedidos-container/detalle-pedido/detalle-pedido.component';

//Material
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PanelControlComponent,
    VenderComponent,
    VentasComponent,
    ProductosComponent,
    CategoriasComponent,
    UsuariosComponent,
    NotificacionesComponent,
    ComprarComponent,
    DetalleVentaComponent,
    UsuarioBarraComponent,
    LoginUsuarioComponent,
    RegistrarUsuarioComponent,
    PedidosComponent,
    EditarCategoriaComponent,
    EditarProductoComponent,
    DetallePedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
