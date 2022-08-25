// Create table for user
const createUserTable = dbConnection => {

    // Query
    const sql = 'CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))';

    // Run the query
    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(`Users table has been created`);
    })

}

// Export
module.exports = {
    createUserTable
};
