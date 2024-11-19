// No 1
const words = ['cook', 'save', 'taste', 'aves', 'vase', 'state', 'map'];
function anagram    (words) {
    const obj = {};

    for (const word of words) {
        const sortedWord = sort(word);
        if (!obj[sortedWord]) {
            obj[sortedWord] = [];
        }
        obj[sortedWord].push(word);
    }
    return Object.values(obj);
}

console.log(anagram(words));

function sort(str) {
    str = str.split('');
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < str.length; j++) {
            if (str[j] > str[i]) {
                [str[i], str[j]] = [str[j], str[i]];
            }
        }
    }
    return str;
}

console.log('-'.repeat(20));

// No 2
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE m_user (
    id INTEGER PRIMARY KEY,
    name text,
    parent_id INTEGER)`);

    db.run(`INSERT INTO m_user (id, name, parent_id) VALUES (1, 'Zaki', 2)`)
    db.run(`INSERT INTO m_user (id, name, parent_id) VALUES (2, 'Ilham', NULL)`)
    db.run(`INSERT INTO m_user (id, name, parent_id) VALUES (3, 'Irwan', 2)`)
    db.run(`INSERT INTO m_user (id, name, parent_id) VALUES (4, 'Arka', 3)`)

    db.all(`SELECT * FROM m_user`, (err, rows) => {
        if (err) {
            console.error('Error querying data:', err.message);
        } else {
            console.log('Table:', rows);
        }
    });


    db.all(
        `SELECT table1.id, table1.name, table2.name as parent_name 
FROM m_user as table1 
LEFT JOIN m_user as table2 
ON table1.parent_id = table2.id`,
        (err, rows) => {
            if (err) {
                console.log('Error');
            } else {
                console.log('Answer:', rows);
            }
        })

});
