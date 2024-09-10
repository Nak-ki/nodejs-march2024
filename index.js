const express = require('express');
const path = require('node:path');
const fs = require('node:fs/promises');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readData = async () =>
{
  const pathToUL = path.join(__dirname, 'usersList.json');
    const data = await fs.readFile(pathToUL, 'utf8');
    return JSON.parse(data);
}

const writeData = async (users) =>
{
  const pathToUL = path.join(__dirname, 'usersList.json');
     await fs.writeFile(pathToUL, JSON.stringify(users));

}



app.get('/users', async (req, res) => {
    try {
        const users = await readData()
        res.send(users)

    } catch (e) {
        res.status(500).send(e.message);
    }
})
app.post('/users', async (req, res) => {
    try {
        const users = await readData()
        const {name, email, password} = req.body;
        if (name.length >= 20 || name.length <= 2) {
            return res.status(404).send('Max name 20 characters min 3');
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(400).send('Invalid email address');
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password) ) {
            return res.status(400).send('Invalid password');
        }
        const id = users[users.length - 1].id + 1;
        const newUser = {id, name, email, password};
        users.push(newUser);
        await writeData(users)
        res.status(201).send(newUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get('/users/:userId', async (req, res) => {
    try {
        const users = await readData()

        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        console.log(user)
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.put('/users/:userId', async (req, res) => {
    try {
        const users = await readData()
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }
        const {name, email, password} = req.body;
            if (name.length <= 20 && name.length >= 2) {
                users[userIndex].name = name;
            }
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                users[userIndex].email = email;
            }

            if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password) ) {
                users[userIndex].password = password;
            }

        await writeData(users)
        res.status(201).send(users[userIndex]);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete('/users/:userId', async (req, res) => {
    try {
        const users = await readData()
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }
        users.splice(userIndex, 1);
        await writeData(users)
        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});