require('dotenv').config()

const express = require('express')

const PORT = process.env.PORT || 8080

const app = express();
const db = require('./db.js');

db.authenticate().catch(err => console.log(err));

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

const Router = require('express');
const errorMiddleware = require('./middlewares/error-middleware.js');
const ArticleMiddleware = require('./middlewares/article-middleware.js');
const ArticleController = require('./controllers/article-controller.js');

const router = new Router();
router.post('/article', ArticleMiddleware, ArticleController.addArticle);
router.get('/article/:id', ArticleController.getArticle);
router.get('/articles', ArticleController.getArticles);

app.use("/", router)
app.use(errorMiddleware);