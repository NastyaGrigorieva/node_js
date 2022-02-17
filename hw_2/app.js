const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

const users = [];
let error = ' ';

app.get('/login', (request, response) => {
    response.render('login');
})

app.post('/login', ({ body }, response) => {
    const userExist = users.some(user => user.email === body.email);
    if (userExist) {
        error = '!!!!!';
        response.redirect('/error');
        return;
    }

    users.push({ ...body, id: users.length});
    response.redirect('/users');
});

app.get('/users', ({ query }, response) => {
    if (Object.keys(query).length) {
        let usersArr = [...users];
        if (query.city) {
            usersArr = usersArr.filter(user => user.city === query.city);
        }
        if (query.age) {
            usersArr = usersArr.filter(user => user.age === query.age);
        }

        response.render('users', { users: usersArr });
        return;
    }

    response.render('users', { users });
});

app.get('/users/:id', ({ params }, response) => {
    const user = users.find(user => user.id === +params.id);
    if (!user) {
        error = `!!!!!!`;
        response.redirect('/error');
        return;
    }

    response.render('userDetails', { user });
});

app.get('/error', (request, response) => {
    response.render('error', { error });
});

app.use((request, response) => {
    response.render('notFound');
});

app.listen(5200, () => {
    console.log('Паэхали!');
});