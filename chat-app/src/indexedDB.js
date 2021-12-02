

const indexedDb = window.indexedDB;

let db

const conexion = indexedDb.open("onlineChat");

conexion.onsuccess = () => {
  db = conexion.result
  console.log('Base de datos abierta', db);
  
}

conexion.onupgradeneeded = (e) => {
  db = e.target.result
  console.log('Base de datos creada', db)
  var objectStore = db.createObjectStore("users", { keyPath: "Id", autoIncrement: true });
}

conexion.onerror = (error) => {
  console.log('Error ', error)
}

export const agregar = (data) => {
  const trasaccion = db.transaction(["users"], "readwrite");
  const coleccionObjetos = trasaccion.objectStore('users');
  var request = coleccionObjetos.add(data);
  
  request.onsuccess = (e) => {
    const id = request.result;
    console.log(id);
    localStorage.setItem("idLogged", id);
    consultar();
  }
}

export const obtener = (clave) => {
  const trasaccion = db.transaction(['users'], 'readonly')
  const coleccionObjetos = trasaccion.objectStore('users')
  const conexion = coleccionObjetos.get(clave)

  conexion.onsuccess = (e) => {
    console.log(parseInt(localStorage.getItem("idLogged")));
  }
}

export const actualizar = (clave, info) => {
  const trasaccion = db.transaction(['users'], 'readwrite')
  const coleccionObjetos = trasaccion.objectStore('users')
  const conexion = coleccionObjetos.get(clave)

  conexion.onsuccess = (e) => {
    console.log(conexion.result);
    const data = conexion.result;
    data.name = info;
    const requestUpdate = coleccionObjetos.put(data);

    requestUpdate.onsuccess = function (event) {
      console.log(requestUpdate.result);
      consultar()
    };
  }

}

export const eliminar = (clave) => {
  const trasaccion = db.transaction(['users'], 'readwrite')
  const coleccionObjetos = trasaccion.objectStore('users')
  const conexion = coleccionObjetos.delete(clave)

  conexion.onsuccess = () => {
    consultar()
  }
}

export const consultar = () => {
  const trasaccion = db.transaction(['users'], 'readonly')
  const coleccionObjetos = trasaccion.objectStore('users')
  const conexion = coleccionObjetos.openCursor()
  console.log('Lista de usuarios');
  const users = [];
  conexion.onsuccess = (e) => {
    const cursor = e.target.result
    if (cursor) {
      //console.log(cursor.value);
      users.push(cursor.value);
      cursor.continue();
      
    } else {
      console.log('No hay tareas en la lista')
    }
  }
  return users
  //console.log(users);
}