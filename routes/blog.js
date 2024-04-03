const express = require("express")
const { createBlog, getAllBlogs, getSponsoredBlogs, getBlog, like, getMostVisited, getTrendingBlogs } = require("../controllers/blog")

const router = express.Router()

router.route('/createBlog').post(createBlog)
router.route('/getAllBlogs').get(getAllBlogs)
router.route('/getSponsoredBlogs').get(getSponsoredBlogs)
router.route('/getBlog/:blog_id').get(getBlog)
router.route('/like/:blog_id').patch(like)
router.route('/getMostVisited').get(getMostVisited)
router.route('/getTrendingBlogs').get(getTrendingBlogs)

module.exports = router