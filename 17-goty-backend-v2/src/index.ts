import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://goty-project.firebaseio.com"
});
const db = admin.firestore();







const app = express();
const port = process.env.PORT || 8000;

app.use(
    cors({ origin : true }));

app.set('port', port);

app.get('/', (req, res) => {
    res.json({
        message: 'Root'
    });
})

app.get('/goty', async(req, res) => {
    const gamesRef = db.collection('goty');
    const snapshot = await gamesRef.get();
    const gamesList = snapshot.docs.map( game => game.data());
    
    res.json(gamesList);
});

app.get('/goty/:id', async(req, res) => {
    const gameId = req.params.id;
    const gameRef = db.collection('goty').doc(gameId);
    const snapshot = await gameRef.get();
    
    if(!snapshot.exists) {
        res.status(404).json({
            ok: false,
            message: `Cannot find game with ID (${gameId})`
        });

    } else {
        res.json(snapshot.data());
    }

});

app.post('/goty/:id', async(req, res) => {
    const gameId = req.params.id;
    const gameRef = db.collection('goty').doc(gameId);
    const snapshot = await gameRef.get();
    
    if(!snapshot.exists) {
        res.status(404).json({
            ok: false,
            message: `Cannot find game with ID (${gameId})`
        });

    } else {
        const votosAnteriores = snapshot.data().votos;

        await gameRef.update({
            votos: votosAnteriores + 1
        });

        res.json({
            ok: true,
            message: `Gracias por votar a ${snapshot.data().name}`
        });
    }

});

app.listen(port, () => console.log(`Escuchando en puerto ${port}`));

