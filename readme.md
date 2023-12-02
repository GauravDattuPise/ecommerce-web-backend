# Ecommerce API with Node js

### Build an e-commerce platform using Node.js and Express.js where users can register and log in. Users can create and view a list of products. Users can create a cart for themselves, and later, they can add products to the cart. If products are available in the cart, users can place an order for those particular products. Users can also access the history of their product orders.

## User Api's

#### User Registration (POST):  
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/user/register  
Description: Registers a new user.  
{
    "name" : "Test",
    "email" : "test@gmail.com",
    "password" : "Test123@"
}

#### User Login (POST):
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/user/login  
Description: Logs in a user and provides a token for authentication.  
{
    "email" : "test@gmail.com",
    "password" : "Test123@"
}


## Category Api's

#### Category Create (POST)
Endpoint : https://ecommerce-web1-x89l.onrender.com/api/v1/category/create  
Description : Creates new category  

#### Category Listing (GET):
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/category/get-all-categoires  
Description: Retrieves a list of categories.  

## Product Api's

#### Product Create (POST):
Endpoint : https://ecommerce-web1-x89l.onrender.com/api/v1/product/create  
Description: Create product based on specific category.  
{
    "title" : "phone7",
    "description" : "provides best performance",
    "price" : 20000,
    "categoryId" : "6569bbb395fef44baae082e0"
}

#### Product Listing (GET):
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/product/get-products/categoryId  
Description: Retrieves a list of products based on the specified category ID.  

#### Product Details (GET):
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/product/get-single-product/productId  
Description: Fetches detailed information about a specific product by its ID.  


## Cart Api's

#### Cart Create (POST)
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/cart/create  
Description: Create one cart for the one user, user need to provide token in request headers, token key name is "token"  

#### Add Product to Cart (PUT)
Endpoint : https://ecommerce-web1-x89l.onrender.com/api/v1/cart/add-to-cart  
Description : Add product to cart, if product already availalable in cart it will update cart and product   details, need to provide token request headers  

#### View Cart (GET)
Endpoint : https://ecommerce-web1-x89l.onrender.com/api/v1/cart/get  
Description: Fetchecs cart details  

#### Remove Item from Cart (DELETE)
Endpoint : https://ecommerce-web1-x89l.onrender.com/api/v1/cart/remove-product  
Description : It will remove product from cart and update the cart details, need to provide token in headers and productId in request body  
{
    "productId" : "6569c6582ad297c427f6488d"
}

## Order api's

#### Order Placement (POST):
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/order/place-order  
Description: Places an order with products from the user's cart and update the cart details, need to provide token in headers, and productId in body  
{
    "productId" : "6569c67d2ad297c427f64896"
}

#### Order History (GET):
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/order/orders-history  
Description: Retrieves the order history for authenticated users, need to provide token in headers  

#### Order Details (GET):
Endpoint: https://ecommerce-web1-x89l.onrender.com/api/v1/order/order-details/orderId  
Description: Retrieves detailed information about a specific order by its ID, need to provide token in headers and orderId in request url.  



