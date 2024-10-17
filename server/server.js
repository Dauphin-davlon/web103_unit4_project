import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import laptopRoutes from './routes/laptopRoutes.js';
import featureGroupRoutes from './routes/featureGroupRoutes.js';
import featureDataRoutes from './routes/featureDataRoutes.js';
import cors from 'cors';

// import the router from your routes file


dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors());
app.use(express.json());


// if (process.env.NODE_ENV === 'development') {
//     app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
// }
// else if (process.env.NODE_ENV === 'production') {
//     app.use(favicon(path.resolve('public', 'lightning.png')))
//     app.use(express.static('public'))
// }

// // specify the api path for the server to use


// if (process.env.NODE_ENV === 'production') {
//     app.get('/*', (_, res) =>
//         res.sendFile(path.resolve('public', 'index.html'))
//     )
// }

app.use('/api/laptops', laptopRoutes);
app.use('/api/feature-groups', featureGroupRoutes);
app.use('/api/feature-data', featureDataRoutes);

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})