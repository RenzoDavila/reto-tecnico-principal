
class DataConttroller {

  async getData(){
    const response = await fetch('http://localhost:4000/users/100/1/name');
    const json = await response.json();
    return json;
  }

  async getItem(id){
    const response = await fetch('http://localhost:4000/users/'+id);
    const json = await response.json();
    console.log("json", json)
    return json;
  }

  async deleteData(id){
    const response = await fetch('http://localhost:4000/users/'+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(await response.json());
    window.location.reload();
  }

  async createData(data){
    const response = await fetch('http://localhost:4000/users/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(await response.json());
    window.location.reload();
  }

  async updateData(id, data){
    const response = await fetch('http://localhost:4000/users/'+id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(await response.json());
    window.location.reload();
  }

}

export const UserServices = new DataConttroller();
