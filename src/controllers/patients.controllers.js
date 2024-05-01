import pool from '../db/database.js';

export const getSintomasPaciente = async (req, res) => {
  try {
    const response = await pool.query(`
      SELECT Sintomas.nombre, (COUNT(*) / (SELECT COUNT(*) FROM Pacientes)) * 100 AS Porcentaje
      FROM Sintomas 
      INNER JOIN Patient_Symptoms
      ON Patient_Symptoms.sintoma_id = Sintomas.id
      INNER JOIN Pacientes
      ON Pacientes.ID = Patient_Symptoms.paciente_id
      GROUP BY Sintomas.nombre;
    `);

    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFallecidosPorMes = async (req, res) => {
  try {
    const response = await pool.query(`
    SELECT MONTH(fecha_defuncion) as MES, COUNT(*) as Fatalidades
    FROM Pacientes
    WHERE 
    fecha_defuncion IS NOT NULL
    AND 
    YEAR(fecha_defuncion) = 2021
    GROUP BY MES;
    `);

    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSintomaFatalidad = async (req, res) => {
  try {
    const response = await pool.query(`
    SELECT Sintomas.nombre, COUNT(*) as Fatalidades
    FROM Sintomas
    INNER JOIN Patient_Symptoms
    ON Patient_Symptoms.sintoma_id = Sintomas.id
    INNER JOIN Pacientes
    ON Pacientes.ID = Patient_Symptoms.paciente_id
    WHERE 
    fecha_defuncion IS NOT NULL
    GROUP BY Sintomas.nombre
    ORDER BY Fatalidades DESC;
    `);

    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfesionesMasAfectadas = async (req, res) => {
  try {
    const response = await pool.query(`
      SELECT ocupacion, COUNT(*) / (SELECT COUNT(*) FROM Pacientes) * 100 AS Porcentaje
      FROM Pacientes
      GROUP BY ocupacion
      ORDER BY Porcentaje DESC;
    `);

    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
