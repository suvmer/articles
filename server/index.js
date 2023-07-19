require('dotenv').config()

const express = require('express')

const PORT = process.env.PORT || 8080

const app = express();
const db = require('./db.js');

db.authenticate().catch(err => console.log(err));

app.use(express.json())
app.listen(PORT, () => console.log(`server started on port ${PORT}`))

const Router = require('express');
const errorMiddleware = require('./middlewares/error-middleware.js');
const ArticleMiddleware = require('./middlewares/article-middleware.js');
const ArticleController = require('./controllers/article-controller.js');
const CommentsController = require('./controllers/comments-controller.js');
const CommentMiddleware = require('./middlewares/comment-middleware.js');

const router = new Router();
router.post('/article', ArticleMiddleware, ArticleController.addArticle);
router.get('/article/:id', ArticleController.getArticle);
router.get('/articles', ArticleController.getArticles);
router.patch('/article/:id', ArticleMiddleware, ArticleController.editArticle);
router.delete('/article/:id', ArticleController.deleteArticle);

router.post('/article/:id/comment/', CommentMiddleware, CommentsController.addComment);
router.get('/article/:id/comment/:commid', CommentsController.getComment);
router.get('/article/:id/comments', CommentsController.getComments);
router.patch('/article/:id/comment/:commid', CommentMiddleware, CommentsController.editComment);
router.delete('/article/:id/comment/:commid', CommentsController.deleteComment);

app.use("/", router)
app.use(errorMiddleware);