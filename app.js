var jsforce = require('jsforce')
var connection = require('./config.js')



connection.connect(function (err) {
    if (err) {
        return console.error('error:' + err.message);
    }
    //console.log('Connected to MySQL');
    var conn = new jsforce.Connection({
    });
    // password + security token
    conn.login('<username for SF>', '<password + security_token>', function (err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        //console.log(conn.accessToken);
        //console.log(conn.instanceUrl);
        // logged in user property
        //console.log("User ID: " + userInfo.id);
        //console.log("Org ID: " + userInfo.organizationId);

        var records = []
        var query = conn.query("Select Id,Name FROM Account")
            .on("record", function (record) {
                records.push(record);
                console.log(record.Id)
                let sql = 'INSERT INTO test_table VALUES (?,?)';
                let data = [record.Id, record.Name]
                connection.query(sql, data, (err, res, fields) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Rows affected:', res.affectedRows);
                })
            })
            .on("end", function () {

                connection.end(function (err) {
                    if (err) {
                        return console.log('error:' + err.message);
                    }
                    console.log('Close the database connection.');
                });
                //console.log(records[0].Id);
                //console.log("total records is :" + query.totalSize);          
                //console.log("total fetched is :" + query.totalFetched); 

            })
            .on("error", function (err) {
                console.log(err);
            })

            .run({ autoFetch: true, maxFetch: 4000 });



    });
})











  //let sql = 'INSERT into test_db VALUES (xxx)  '

