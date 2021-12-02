
const indexedDb = window.indexedDB;

let db

const conexion = indexedDb.open("onlineChat");

conexion.onsuccess = () => {
  db = conexion.result
  console.log('Base de datos abierta', db);

}

conexion.onupgradeneeded = (e) => {
  db = e.target.result
  console.log('Base de datos creada', db);
  const groups = db.createObjectStore("groups", { keyPath: "Id", autoIncrement: true });
  const users = db.createObjectStore("users", { keyPath: "Id", autoIncrement: true });
}


conexion.onerror = (error) => {
  console.log('Error ', error)
}

export const agregarUser = (table, data) => {
  const trasaccion = db.transaction([table], "readwrite");
  const coleccionObjetos = trasaccion.objectStore(table);
  const request = coleccionObjetos.add(data);

  request.onsuccess = (e) => {
    const id = request.result;
    console.log(id);
    localStorage.setItem("idLogged", id);
    consultar(table);
  }
}

export const agregarGroup = (table, data) => {
  const trasaccion = db.transaction([table], "readwrite");
  const coleccionObjetos = trasaccion.objectStore(table);
  const request = coleccionObjetos.add(data);

  request.onsuccess = (e) => {
    const id = request.result;
    console.log(id);
    //localStorage.setItem("idLogged", id);
    consultar(table);
  }
}

export const addGroupChat= (table, clave, info) => {
  const trasaccion = db.transaction([table], 'readwrite')
  const coleccionObjetos = trasaccion.objectStore(table)
  const conexion = coleccionObjetos.get(clave)

  conexion.onsuccess = (e) => {
    console.log(conexion.result);
    const data = conexion.result;
    data.content = info;
    const requestUpdate = coleccionObjetos.put(data);

    requestUpdate.onsuccess = function (event) {
      console.log(requestUpdate.result);
      consultar(table)
    };
  };
}

export const obtener = (table, clave) => {
  const trasaccion = db.transaction([table], 'readonly')
  const coleccionObjetos = trasaccion.objectStore(table)
  const conexion = coleccionObjetos.get(clave)

  conexion.onsuccess = (e) => {
    return conexion.result;
  }
}

export const actualizar = (table, clave, info) => {
  const trasaccion = db.transaction([table], 'readwrite')
  const coleccionObjetos = trasaccion.objectStore(table)
  const conexion = coleccionObjetos.get(clave)

  conexion.onsuccess = (e) => {
    console.log(conexion.result);
    const data = conexion.result;
    data.Id = info;
    const requestUpdate = coleccionObjetos.put(data);

    requestUpdate.onsuccess = function (event) {
      console.log(requestUpdate.result);
      consultar(table)
    };
  }

}

export const eliminar = (table, clave) => {
  const trasaccion = db.transaction([table], 'readwrite')
  const coleccionObjetos = trasaccion.objectStore(table)
  const conexion = coleccionObjetos.delete(clave)

  conexion.onsuccess = () => {
    consultar(table)
  }
}

export const consultar = (table) => {
  const trasaccion = db.transaction([table], 'readonly')
  const coleccionObjetos = trasaccion.objectStore(table)
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