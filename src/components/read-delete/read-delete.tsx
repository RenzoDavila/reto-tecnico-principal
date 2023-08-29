import { Component, h, State } from "@stencil/core";
import { UserServices } from "../../services/user";

@Component({
  tag: 'read-delete',
  styleUrl: 'read-delete.scss',
  shadow: true
})

export class ReadDeleteComponent {
  @State() Data: any = [];
  @State() CreateUpdate: boolean = false;
  @State() IdUpdate: string = "";

  deleteRegister(id){
    UserServices.deleteData(id);
    const result = this.Data.filter((item) => item._id != id);
    this.Data = result
  }

  editRegister(id){
    this.IdUpdate = id;
    this.CreateUpdate = true
  }

  componentDidLoad(){
    const data:any = UserServices.getData();
    data.then(res => {
      this.Data = res.data;
      })
  }

  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }

  render(){
    let data = []
    let mainContent;
    if(this.Data.length > 0){
      data = this.Data;
      mainContent = (
        <div class="principal">
          <h2 class="title">Mantenimiento de usuarios</h2>
          <button class="btn" onClick={() => this.CreateUpdate = true}><span class="btn-text">Agregar Usuario</span></button>
          <table class="table">
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Rol</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
            {data.map((item) =>
            <tr>
              <td>{item.name}</td>
              <td>{item.lastName}, {item.firstName}</td>
              <td>{this.calcularEdad(item.age)}</td>
              <td>{item.role}</td>
              <td>{item.email}</td>
              <td class="row-actions">
                <i class="gg-eye" data-toggle="tooltip" title="ver ultima constancia"></i>
                <i class="gg-user-list" data-toggle="tooltip" title="editar" onClick={() => this.editRegister(item._id)}></i>
                <i class="gg-trash-empty" data-toggle="tooltip" title="eliminar" onClick={() => this.deleteRegister(item._id)}></i>
                </td>
            </tr>
            )}
        </table>
        </div>
      );
    }else{
      mainContent = (
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
    }

    let createUpdate = (<div><create-update _id={this.IdUpdate}></create-update></div>);

    if(this.CreateUpdate){
      return createUpdate;
    }else{
      return mainContent;
    }

  }
}
