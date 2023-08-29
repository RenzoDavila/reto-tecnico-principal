import { Component, h, State } from "@stencil/core";
import { ProofServices } from "../../services/proof";

@Component({
  tag: 'proof-component',
  styleUrl: 'proof.scss',
  shadow: true
})

export class ProofComponent {
  @State() View: boolean = true;
  @State() Data: any = [];

  close(){
    console.log("se oprimio el close")
    this.View = false;
  }

  componentDidLoad(){
    const data:any = ProofServices.getLast();
    data.then(res => {
      this.Data = res.data[0];
      this.Data.day = res.data[0].date.substring(0, 10);
      this.Data.hour = res.data[0].date.substring(11, 19);
      console.log("res.data", this.Data)
      })
  }

  viewAction(action){
    switch (action) {
      case "C":
        return "Creado"
      case "U":
        return "Editado"
      case "D":
        return "Eliminado"
    }
  }

  getDate(date){
    console.log("date", date)
    return date.substring(0, 10);
  }

  downloadimage() {
  }

  render(){
    let none = (<div></div>)
    console.log("this.Data.length", this.Data.length)
    if(this.Data.length > 0){
    console.log("this.Data.length", this.Data.length)
    }
    let mainContent = (
        <div class="principal">
        <script type="text/javascript">
            function
        </script>
          <div class="card">
            <div class="container">
              <i class="gg-close-o" onClick={() => this.close()}></i>
              <div id="htmltoimage">
                <h3><b>Constancia de acción</b></h3>
                <div class="item">
                  <p class="item-title">Acción</p>
                  <p class="item-desc"><b>:</b> {this.viewAction(this.Data.action)}</p>
                </div>
                <div class="item">
                  <p class="item-title">Fecha</p>
                  <p class="item-desc"><b>:</b> {this.Data.day}</p>
                </div>
                <div class="item">
                  <p class="item-title">Hora</p>
                  <p class="item-desc"><b>:</b> {this.Data.hour}</p>
                </div>
                <div class="item">
                  <p class="item-title">Tipo</p>
                  <p class="item-desc"><b>:</b> {this.Data.group}</p>
                </div>
                <div class="item">
                  <p class="item-title">Registro</p>
                  <p class="item-desc"><b>:</b> {this.Data.registerDesc}</p>
                </div>
              </div>
              <button class="btn" onClick={() => this.downloadimage()}><span class="btn-text">Descargar Constancia</span></button>
            </div>
          </div>
        </div>
      );

    if(this.View){
      return mainContent;
    }else{
      return none;
    }
  }
}

