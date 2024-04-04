import express from 'express';
import blogControler from '../controllers/blog.controllers.js';
import isAdmin from '../middlewares/isAdmin.middleware.js'

const router = express.Router();

router.get('/user', blogControler.userBlogs);
// router.delete('/:id', blogControler.deleteBlog);
router.delete('/:id', isAdmin, blogControler.deleteBlog)
router.put('/:id', blogControler.editBlog);
router.post('/', blogControler.createBlog);
router.post('/', (req, res, next) => {
 response.success(res, 200,"welcome to create blog");
});
// router.post('/', blogControler.createBlog);
// router.post('/', verifyUser, blogControler.createBlog);



// router.post('/',verifyUser, blogControler.createBlog); 
// router.post('/', upload.single('image'), blogControler.createBlog);

export default router