//Write some JavaScript to create a new product by sending a request to the JSON API on our web store. To create a product, make a POST request to https://ls-230-web-store-demo.herokuapp.com/v1/products. To make the post request, you'll need the following:

//json object with the following properties: 1) name 2) sku (must have 3 or more characters) 3) price (must be an integer greater than 0)

//Content-Type header set to application/json; charset=utf-8
//Authorization header set to token AUTH_TOKEN

function createProduct(productData) {
  let json = JSON.stringify(productData);
  let request = new XMLHttpRequest();

  request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

  request.addEventListener('load', () => {
    console.log(`This product was added: ${request.responseText}`);
  });

  request.send(json);
}

createProduct({
  name: 'HB pencil',
  sku: 'hbp100',
  price: 50,
});
