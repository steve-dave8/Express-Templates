/* The table argument in the functions below is an object that has to be defined in each routes file. Here is an example of what it should look like:
const table = {
    name: "items",
    primaryKey: "itemID",
    columns: ["name", "price", "quantity"]
} 
The array of columns in this table object must be in the same order as the values from the request body, or vice versa. */

export default {
    // create function to add one item to a table. Assumes values are sent in the request for each column of the table (except auto-increment ID).
    create: (req, res, next, database, table) => {
        const placeholders = [];
        table.columns.forEach(x => placeholders.push("?"));
        try {
            database.query(
                `INSERT INTO ${table.name} (${table.columns.join()}) VALUES (${placeholders.join()})`,
                Object.values(req.body),
                function (error, results, fields){
                    if (error) throw error;
                    return res.status(201).json({message: "New item successfully added.", ID: results.insertId});
                }
            );
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }, 
    // getAll function to retrieve all items from a given table.
    getAll: (req, res, next, database, tableName) => {
        try {
            database.query(
                `SELECT * FROM ${tableName}`,
                function (error, results, fields) {
                    if (error) throw error;
                    return res.json(results);
                }
            );
        } catch (err) {
            console.error(err);
            return next(err);
        };
    },
    // getOne function to retrieve one item by its primary key from a given table. 
    getOne: (req, res, next, database, table) => {
        const {id} = req.params;
        try {
            database.query(
                `SELECT * FROM ${table.name} WHERE ${table.primaryKey}=?`,
                [id],
                function (error, results, fields){
                    if (error) throw error;
                    const item = results[0];
                    if (!item) {
                        return res.status(404).json(`Error: item ${id} not found.`);
                    };
                    return res.json(item);
                }
            );       
        } catch (err) {
            console.error(err);
            return next(err);
        };
    },
    // update function to update one item by its primary key from a given table. Assumes values are sent in the request for each column of the table (except auto-increment ID).
    update: (req, res, next, database, table) => {
        const {id} = req.params;
        let updates = [];
        table.columns.forEach(x => updates.push(`${x}=?`));
        updates = updates.join(', ')
        try {
            database.query(
                `UPDATE ${table.name} SET ${updates} WHERE ${table.primaryKey}=?`,
                [...Object.values(req.body), id],
                function (error, results, fields){
                    if (error) throw error;
                    const updated = results.affectedRows;
                    if (!updated){
                        return res.status(400).json(`Error: item ${id} not found.`);
                    };
                    return res.json({updated});
                }
            );
        } catch (err) {
            console.error(err);
            return next(err);
        };
    }, 
    // delete function to remove one item by its primary key from a given table.
    delete: (req, res, next, database, table) => {
        try {
            database.query(
                `DELETE FROM ${table.name} WHERE ${table.primaryKey}=?`,
                [req.params.id],
                function (error, results, fields){
                    if (error) throw error;
                    const removed = results.affectedRows;
                    if (!removed){
                        return res.status(404).json(`Error: item ${req.params.id} not found.`);
                    };
                    return res.status(204).json() // it is an empty response as this resource no longer exists
                }
            );
        } catch (err) {
            console.error(err);
            return next(err);
        };
    } 
}

/* These functions cover the basic CRUD operations. More complex database queries will need to be created manually
as needed but these functions can be used as a starting point for those. */