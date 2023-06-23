const mainControllers = 

    {
    	index: (req, res) => {	
                res.render('index');
        },

        register: (req, res) => {
                res.render('users/register');
        },   

        login: (req, res) => {
                res.render('users/login');
        },

        product: (req, res) => {
                res.render("productDetail");
        },

        cart: (req, res) => {
                res.render("productCart");
        }
    }


module.exports = mainControllers;