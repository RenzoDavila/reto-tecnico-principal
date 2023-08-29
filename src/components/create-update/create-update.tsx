import { Component, h, State, Prop } from "@stencil/core";
import { UserServices } from "../../services/user";

@Component({
  tag: 'create-update',
  styleUrl: 'create-update.scss',
  shadow: true
})

export class CreateUpdateComponent {
  @Prop() _id: string = "";
  @State() Data: any = [];
  @State() Form: any = {
    name: '',
    firstName: '',
    lastName: '',
    age: '1998-10-21',
    email: '',
    role: '',
    pass: '',
  };

  handleSubmit(e) {
    e.preventDefault()
    UserServices.createData(this.Form);
    // send data to our backend
  }

  handleSubmitEdit(e) {
    e.preventDefault()
    UserServices.updateData(this._id, this.Form);
    // send data to our backend
  }

  handleChange(event, input) {
    switch (input) {
      case "name":
        this.Form.name = event.target.value.toUpperCase();
        break;
      case "firstName":
        this.Form.firstName = event.target.value.toUpperCase();
        break;
      case "lastName":
        this.Form.lastName = event.target.value.toUpperCase();
        break;
      case "age":
        this.Form.age = event.target.value;
        break;
      case "email":
        this.Form.email = event.target.value.toUpperCase();
        break;
      case "role":
        this.Form.role = event.target.value.toUpperCase();
        break;
      case "pass":
        this.Form.pass = event.target.value;
        break;
    }
  }

  getItem(id){
    const data:any = UserServices.getItem(id);
    data.then(res => {
      this.Data = res;
      this.Form = {
        name: this.Data.name,
        firstName: this.Data.firstName,
        lastName: this.Data.lastName,
        age: this.Data.age,
        email: this.Data.email,
        role: this.Data.role,
        pass: this.Data.pass,
      };
      console.log("this.Data", this.Data)
      })
  }

  render(){
    let mainContent;
    if(this._id && this.Data._id != this._id){
      this.getItem(this._id)
      console.log()
    }else{
      if(this.Data.name){
        console.log("ya esta la data", this.Data)
        mainContent = (
          <div class="principal">
            <h2 class="title">Editar Usuario</h2>
            <div>
              <form onSubmit={(e) => this.handleSubmitEdit(e)}>
                <label htmlFor="name">Usuario</label>
                <input type="text" id="name" name="name" value={this.Data.name} placeholder="Nombre de usuario.." onInput={(event) => this.handleChange(event, "name")}></input>

                <label htmlFor="firstName">Nombres</label>
                <input type="text" id="firstName" name="firstName" value={this.Data.firstName} placeholder="Nombres.." onInput={(event) => this.handleChange(event, "firstName")}></input>

                <label htmlFor="lastName">Apellidos</label>
                <input type="text" id="lastName" name="lastName" value={this.Data.lastName} placeholder="Apellidos.." onInput={(event) => this.handleChange(event, "lastName")}></input>

                <label htmlFor="age">Fecha de nacimiento</label>
                <input type="date" id="age" name="age" value={this.Data.age.substring(0, 10)} placeholder="Edad.." onInput={(event) => this.handleChange(event, "age")}></input>

                <label htmlFor="email">Correo</label>
                <input type="email" id="email" name="email" value={this.Data.email} placeholder="Correo.." onInput={(event) => this.handleChange(event, "email")}></input>

                <label htmlFor="role">Rol</label>
                <input type="text" id="role" name="role" value={this.Data.role} placeholder="Rol.." onInput={(event) => this.handleChange(event, "role")}></input>

                <input type="submit" value="Submit"></input>
              </form>
            </div>
          </div>
        );
      }
      else{
        mainContent = (
         <div class="principal">
           <h2 class="title">Crear Usuario</h2>
           <div>
             <form onSubmit={(e) => this.handleSubmit(e)}>
               <label htmlFor="name">Usuario</label>
               <input type="text" id="name" name="name" placeholder="Nombre de usuario.." onInput={(event) => this.handleChange(event, "name")}></input>

               <label htmlFor="firstName">Nombres</label>
               <input type="text" id="firstName" name="firstName" placeholder="Nombres.." onInput={(event) => this.handleChange(event, "firstName")}></input>

               <label htmlFor="lastName">Apellidos</label>
               <input type="text" id="lastName" name="lastName" placeholder="Apellidos.." onInput={(event) => this.handleChange(event, "lastName")}></input>

               <label htmlFor="age">Fecha de nacimiento</label>
               <input type="date" id="age" name="age" placeholder="Edad.." onInput={(event) => this.handleChange(event, "age")}></input>

               <label htmlFor="email">Correo</label>
               <input type="email" id="email" name="email" placeholder="Correo.." onInput={(event) => this.handleChange(event, "email")}></input>

               <label htmlFor="role">Rol</label>
               <input type="text" id="role" name="role" placeholder="Rol.." onInput={(event) => this.handleChange(event, "role")}></input>

               <label htmlFor="pass">Contraseña</label>
               <input type="password" id="pass" name="pass" placeholder="Contraseña.." onInput={(event) => this.handleChange(event, "pass")}></input>

               <input type="submit" value="Submit"></input>
             </form>
           </div>
         </div>
       );
      }
      return mainContent;
    }
  }
}
