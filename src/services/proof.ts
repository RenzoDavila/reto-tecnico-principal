class DataConttroller {

  async getData(){
    const response = await fetch('http://localhost:4000/proofs/100/1/date');
    const json = await response.json();
    return json;
  }

  async getLast(){
    const response = await fetch('http://localhost:4000/proofs/1/1/date');
    const json = await response.json();
    return json;
  }

  async getItem(id){
    const response = await fetch('http://localhost:4000/proofs/'+id);
    const json = await response.json();
    console.log("json", json)
    return json;
  }

  async deleteData(id){
    const response = await fetch('http://localhost:4000/proofs/'+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(await response.json());
  }

  async createData(data){
    const response = await fetch('http://localhost:4000/proofs/', {
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
    const response = await fetch('http://localhost:4000/proofs/'+id, {
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

export const ProofServices = new DataConttroller();
