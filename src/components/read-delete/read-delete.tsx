import { Component, h, State } from "@stencil/core";
import { DataServices } from "../../services/user";

@Component({
  tag: 'read-delete',
  styleUrl: 'read-delete.scss',
  shadow: true
})

export class ReadDeleteComponent {
  @State() Data: any = [];

  componentDidLoad(){
    const data:any = DataServices.getData();
    data.then(res => {
      this.Data = res.data;
      })
  }

  render(){
    let data = []
    if(this.Data.length > 0){
      data = this.Data;
      console.log("data", data)
      let mainContent = (
        <div class="principal">
          <h2 class="title">Mantenimiento de usuarios</h2>
          <button class="btn"><span class="btn-text">Agregar Usuario</span></button>
          <table class="table">
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
            {data.map((item) =>
            <tr>
              <td>{item.name}</td>
              <td>{item.lastName}, {item.firstName}</td>
              <td>{item.role}</td>
              <td>{item.email}</td>
              <td class="row-actions">
                <i class="gg-eye" data-toggle="tooltip" title="ver ultima constancia"></i>
                <i class="gg-user-list" data-toggle="tooltip" title="editar"></i>
                <i class="gg-trash-empty" data-toggle="tooltip" title="eliminar"></i>
                </td>
            </tr>
            )}
        </table>
        </div>
      );
      return mainContent;
    }else{

    let mainContent = (
      <div class="principal">
        <h2 class="title">Mantenimiento de usuarios</h2>
        <button class="btn"><span class="btn-text">Agregar Usuario</span></button>
        <table class="table">
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
      </table>
      <h3 class="title">Por el momento no hay datos registrados</h3>
      </div>
    );
    return mainContent;
    }
  }
}
