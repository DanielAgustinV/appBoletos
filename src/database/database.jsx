import { enablePromise, openDatabase } from "react-native-sqlite-storage";

// Habilitar la promesa para SQLite
enablePromise(true);

const connectToDatabase = async () => {
  return openDatabase(
    { name: "eventos.db", location: "default" },
    () => {},
    (error) => {
      console.error(error);
      throw Error("No se pudo conectar a la base de datos");
    }
  );
};

// Función para crear la tabla si no existe
const createTableIfNotExists = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS boletos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_asiento INTEGER,
          id_estatus INTEGER
        )`,
        [],
        () => {
          resolve("Tabla creada o ya existe");
          console.log("Tabla creada o ya existe");
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

// Función para insertar un boleto
const insertBoleto = async (idAsiento, idEstatus) => {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO boletos (id_asiento, id_estatus) VALUES (?, ?)',
        [idAsiento, idEstatus],
        (_, results) => {
          resolve(results.insertId);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

// Función para actualizar un boleto
const updateBoleto = async (idAsiento, nuevoEstatus) => {
    console.log(idAsiento);
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        // `UPDATE boletos SET id_estatus = ? WHERE id_asiento = ?`,
        `UPDATE boletos SET id_estatus = ? WHERE id_asiento = ? AND id_estatus <> ?`,
        
        [nuevoEstatus, idAsiento , 4],
        (_, results) => {
          if (results.rowsAffected > 0) {
            resolve("Registro actualizado exitosamente");
          } else {
            reject("Ya se a registrado anteriormente");
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

// Función para obtener todos los boletos
const getBoletos = async () => {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id_asiento FROM boletos WHERE id_estatus = 4`,
        // 'SELECT * FROM boletos',
        [],
        (_, results) => {
          const boletos = [];
          for (let i = 0; i < results.rows.length; i++) {
            boletos.push(results.rows.item(i));
          }
          resolve(boletos);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

// Función para limpiar la tabla
const clearTable = async () => {
    const db = await connectToDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM boletos`,
          [],
          (_, results) => {
            resolve("Tabla boletos limpiada");
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };

export { connectToDatabase, createTableIfNotExists, insertBoleto, updateBoleto, getBoletos,clearTable };
