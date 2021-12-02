/* eslint-disable no-unused-vars */

const indexedDb = window.indexedDB;

let db

const conexion = indexedDb.open("onlineChat");

conexion.onsuccess = () => {
  db = conexion.result

}

conexion.onupgradeneeded = (e) => {
  db = e.target.result
  const groups = db.createObjectStore("groups", { keyPath: "Id", autoIncrement: true });
  const users = db.createObjectStore("users", { keyPath: "Id", autoIncrement: true });
  const chat = db.createObjectStore("chat", { keyPath: "Id", autoIncrement: true });
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
    consultar(table);
  }
}

export const addGroupChat= (table, clave, info) => {
  const trasaccion = db.transaction([table], 'readwrite')
  const coleccionObjetos = trasaccion.objectStore(table)
  const conexion = coleccionObjetos.get(clave)

  conexion.onsuccess = (e) => {
    let data = conexion.result;
    data.content.push(info);
    const bucketStore = e.target.source;
    bucketStore.put(data);
  };
}

export const obtener = (table, clave) => {
  const trasaccion = db.transaction([table], 'readonly')
  const coleccionObjetos = trasaccion.objectStore(table)
  const conexion = coleccionObjetos.get(clave)
  let chat = [];
  conexion.onsuccess = (e) => {
    const info = conexion.result && conexion.result.content;
    if (info) {
      for (let i = 0; i < info.length; i++) {
        chat.push(info[i])
      }
    }  
  }
  return chat
}

export const actualizar = (table, clave, info) => {
  const trasaccion = db.transaction([table], 'readwrite')
  const coleccionObjetos = trasaccion.objectStore(table)
  const conexion = coleccionObjetos.get(clave)
  
  conexion.onsuccess = (e) => {
    const data = conexion.result;
    data.name = info;
    const requestUpdate = coleccionObjetos.put(data);

    requestUpdate.onsuccess = function (event) {
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
  const users = [];
  conexion.onsuccess = (e) => {
    const cursor = e.target.result
    if (cursor) {
      users.push(cursor.value);
      cursor.continue();

    } else {
      console.log('No hay tareas en la lista')
    }
  }
  return users
}