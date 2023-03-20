# Final proyect - Spagliardi Nicolas BE 51135

## Development server
Run `npm run dev` for a dev server. url `http://localhost:8080/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Then raise the project with `npm run start`

## JSON Postman

{
	"info": {
		"_postman_id": "2022285b-88c0-4608-9d8c-6c3f18cb00a1",
		"name": "Final-challenge",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "14771685"
	},
	"item": [
		{
			"name": "Products",
			"item": [
				{
					"name": "get-products",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:8080/api/products",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"products"
							]
						}
					},
					"response": []
				},
				{
					"name": "get-products by-id",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:8080/api/products/1grtn55oq0d026c30fbe228",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"products",
								"1grtn55oq0d026c30fbe228"
							]
						}
					},
					"response": []
				},
				{
					"name": "create-product",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"Parlante Noblex MNT390 portátil con bluetooth negro 220V\",\n    \"description\": \"Noblex MNT390 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.\",\n    \"price\": 68199,\n    \"thumbnail\": [],\n    \"code\": \"MNT390\",\n    \"status\": true,\n    \"category\": \"Tecno\",\n    \"stock\": 55\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:8080/api/products",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"products"
							]
						}
					},
					"response": []
				},
				{
					"name": "update-product",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"Parlante Noblex MNT390\",\n    \"description\": \"Noblex MNT390 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. portátil con bluetooth negro 220V\",\n    \"category\": \"Tecnologia\",\n    \"stock\": 45\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:8080/api/products/1grtn55oq0d026c30fbe228",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"products",
								"1grtn55oq0d026c30fbe228"
							]
						}
					},
					"response": []
				},
				{
					"name": "delete-product",
					"request": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:8080/api/products/1grtn55oq0d026c30fbe228",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"products",
								"1grtn55oq0d026c30fbe228"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Carts",
			"item": [
				{
					"name": "create-cart",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"products\": [\n        { \"product\":  \"1grtn4rap0e80f54522e3f1\" }\n    ]\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:8080/api/carts",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"carts"
							]
						}
					},
					"response": []
				},
				{
					"name": "get-cart-by-id",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:8080/api/carts/1grtp0kap004caaf11e92c5",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"carts",
								"1grtp0kap004caaf11e92c5"
							]
						}
					},
					"response": []
				},
				{
					"name": "add-product-to-cart",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "localhost:8080/api/carts/1gru4ajlf024bca50a9854d/product/1grtn4rap0e80f54522e3f1",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"carts",
								"1gru4ajlf024bca50a9854d",
								"product",
								"1grtn4rap0e80f54522e3f1"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}

## test

- Create products
- Get products
- Get products by id 
- Update product
- Delete product

- Create carts
- Get cart by id
- Add products to cart

## Products test

[
  {
    "title": "Mesa Notebook Gadnic Soporte Plegable Regulable Con Cooler",
    "description": "Mesa Notebook Gadnic regulable Laptop Con cooler Desk711",
    "price": 15349,
    "thumbnail": [],
    "code": "MESA0001",
    "status": true,
    "category": "Tecno",
    "stock": 25
  },
  {
    "title": "Tobogan Elefantito 4 Niveles 3 Escalones Rodacross Srj",
    "description": "Tobogan Elefantito Rodacross",
    "price": 19139,
    "thumbnail": [],
    "code": "ABC123",
    "status": true,
    "category": "juguetes",
    "stock": 31
  },
  {
    "title": "Bicicleta Mountain Mtb Firebird Rodado 29 21v Modelo 2023",
    "description": "Cuadro: FireBird Turbo Acero NUEVO MODELO",
    "price": 69499,
    "thumbnail": [],
    "code": "ABC554",
    "status": true,
    "category": "Deporte",
    "stock": 10
  },
  {
    "title": "Parlante Noblex MNT390 portátil con bluetooth negro 220V",
    "description": "Noblex MNT390 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.",
    "price": 68199,
    "thumbnail": [],
    "code": "MNT390",
    "status": true,
    "category": "Tecno",
    "stock": 55
  }
]


