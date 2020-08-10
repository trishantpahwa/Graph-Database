const fs = require('fs');

var dbName = 'my_new_database';
fs.writeFileSync(dbName + '.graphdb', '{\n\n}');
fs.writeFileSync(dbName + '.map', '{\n\n}');