const fs = require('fs');
const path = require('path');

const onlineUsers = [
    {name: "Nansy", age: 15, city: "Kladovka"},
    {name: "Tamarka", age: 75, city: "Kladovka"},
    {name: "Barsik", age: 10, city: "Kladovka"}
];
const inPersonUsers = [
    {name: "Kino", age: 62, city: "Lviv"},
    {name: "Tino", age: 62, city: "Lviv"},
    {name: "Nino", age: 62, city: "Lviv"}
];

const createDirectory = (folderName) => {
    fs.mkdir(path.join(__dirname, 'main', folderName), {recursive: true}, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
}
createDirectory('online');
createDirectory('inPerson');

const createFiles = (nameDirectory ,arr) => {
    for (const user of arr) {
        fs.writeFile(path.join(__dirname, 'main', nameDirectory, `${user.name}.txt`), `${user.name}\n${user.age}\n${user.city}\n`, (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    }
}

createFiles('online', onlineUsers);
createFiles('inPerson', inPersonUsers);


// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)


const foo = async (from, to) => {
    const dirName = path.join(__dirname, 'main', from);
    const movieFile = await fs.readdir(dirName);

    movieFile.map(filesNew => {
        if (!filesNew.includes('new_')) {
            fs.rename(path.join(dirName, filesNew), path.join(__dirname, 'main', to, `new_${filesNew}`));
        }
    });
}
foo('inPerson', 'online');
foo('online', 'inPerson');

