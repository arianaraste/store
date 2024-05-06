const Controller = require("../../controllers");

class prismaBlog extends Controller {
    createBlog(){};
    blogList(){};
    getBlogById(){};
    updateBlog(){};
    deleteBlog(){};
};

module.exports = {
    prismaBlog : new prismaBlog()
}