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
                res.render("products/productDetail");
        },

        cart: (req, res) => {
                res.render("products/productCart");
        },
        
        catalogue: (req, res) => {
                res.render("products/productCatalogue");
        }
    }


module.exports = mainControllers;