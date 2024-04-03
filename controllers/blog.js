const Blog = require('../models/blog')

exports.createBlog = async (req, res) => {
    try {
        const { blogTitle, costumerSegment, category, description, thumbnailUrl, article, isSponsored, author } = req.body;

        await Blog.create({
            blogTitle, 
            costumerSegment,
            category,
            description,
            thumbnailUrl,
            article,
            isSponsored,
            author
        })
        
        res.status(200).json({
            success: true,
            message: `Blog created successfully`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getSponsoredBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isSponsored: true })
        res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getBlog = async (req, res) => {
    try {
        const { blog_id } = req.params
        const blog = await Blog.findOne({ _id: blog_id })

        if(!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        blog.views++;
        await blog.save();

        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.like = async (req, res) => {
    try {
        const { blog_id } = req.params
        const blog = await Blog.findOne({ _id: blog_id })

        if(!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        blog.likes++;
        await blog.save();
        
        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getMostVisited = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ views: -1 });
        res.status(200).json({
            success: true,
            blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getTrendingBlogs = async (req, res) => {
    try {
        const popularBlogs = await Blog.aggregate([
            {
                $addFields: {
                    totalInteractions: { $sum: ["$views", "$likes", { $cond: [{ $eq: ["$isBookmarked", true] }, 1, 0] }] }
                }
            },
            {
                $sort: { totalInteractions: -1 }
            }
        ]);
        
        res.status(200).json({
            success: true,
            popularBlogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};