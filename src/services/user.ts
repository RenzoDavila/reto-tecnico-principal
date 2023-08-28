class DataConttroller {

  async getData(){
    const response = await fetch('http://localhost:4000/users/100/1/role');
    const json = await response.json();
    return json;
  }

}

export const DataServices = new DataConttroller();
