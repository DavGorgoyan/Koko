import { format } from "mysql2";
import db from "./index.js";

export async function exec(query, params) {
    try {
        const sql = format(query, params);
        console.log(sql);
        const sqlData = await db.query(sql);
        return sqlData[0];
    } catch (err) {
        console.log("sqlErr", err);
        throw { status: 400, message: "Execution error" }
    }
}

export async function select(tableName, column, condition) {
    let sql = `SELECT * FROM ??`;
    let params = [tableName];
    if (column != "*") {
        params.unshift(column);
        sql = sql.replace("*", "??")
    }

    if (condition) {
        let conditionQuery = format(` WHERE ?;`, condition);
        conditionQuery = conditionQuery.replaceAll(`,`, ` AND`);
        sql += conditionQuery;
    }

    const data = await exec(sql, params);
    return data;
}

export async function insert(tableName, data) {
    let sql = `INSERT INTO ?? ( ?? ) VALUES ( ? )`;
    const sqlData = await exec(sql, [tableName, Object.keys(data), Object.values(data)]);
    return { insertId: sqlData.insertId };
}

export async function update(tableName, data, condition) {
    let sql = `UPDATE ?? SET ?`;
    if (condition) {
        let conditionQuery = format(` WHERE ?;`, condition);
        conditionQuery = conditionQuery.replaceAll(`,`, ` AND`);
        sql += conditionQuery;
    }
    const sqldata = await exec(sql, [tableName, data])
    return sqldata;
}

export async function remove(tableName, condition) {
    let sql = `DELETE FROM ?? `;
    if (condition) {
        let conditionQuery = format(` WHERE ?;`, condition);
        conditionQuery = conditionQuery.replaceAll(`,`, ` AND`);
        sql += conditionQuery;
    }
    const sqldata = await exec(sql, [tableName])
    return sqldata;
}