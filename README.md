# Final proyect - Spagliardi Nicolas BE 51135

## Development server
Run `npm run dev` for a dev server. url `http://localhost:8080/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` and `npm run copy-statics` to build the project. The build artifacts will be stored in the `dist/` directory. Then raise the project with `npm run start`

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
							],
							"query": [
								{
									"key": "limit",
									"value": "5",
									"disabled": true
								},
								{
									"key": "page",
									"value": "2",
									"disabled": true
								},
								{
									"key": "sort",
									"value": "asc",
									"disabled": true
								},
								{
									"key": "query",
									"value": "status:false",
									"disabled": true
								}
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
							"raw": "localhost:8080/api/products/64403902b3e6266a6a4448e7",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"products",
								"64403902b3e6266a6a4448e7"
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
							"raw": "    {\n    \"title\": \"Colchón 1 Plaza (80x190) Inducol Cauri Resorte\",\n    \"description\": \"El colchón Cauri Base esta compuesto por tela de sabana matelaseada de excelente calidad, una mallla de polipropileno que aísla la estructura de resortes de las espumas lo que impide el desgaste y la deformación.\\n\\nSus capas de espuma de poliuretano que aumentan el confort y genera la sensación de firmeza necesaria para un soporte anatómico.\\n\\nPosee un marco de acero perimetral y doble refuerzo de estabilizadores laterales que aportan mayor rigidez a la base de resortes.\",\n    \"price\": 30600,\n    \"thumbnail\": [],\n    \"code\": \"AWW456\",\n    \"status\": true,\n    \"category\": \"Colchones\",\n    \"stock\": 21\n    }",
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
							"raw": "localhost:8080/api/products/64403874b3e6266a6a4448e5",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"products",
								"64403874b3e6266a6a4448e5"
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
							"raw": "localhost:8080/api/products/64406c45a3041a3c5268f45c",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"products",
								"64406c45a3041a3c5268f45c"
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
					"name": "get-carts",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
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
							"raw": "localhost:8080/api/carts/6442a40f7b7deb7e494c7a6a",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"carts",
								"6442a40f7b7deb7e494c7a6a"
							]
						}
					},
					"response": []
				},
				{
					"name": "create-cart",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"products\": []\n}",
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
					"name": "add-product-to-cart",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "localhost:8080/api/carts/6442a40f7b7deb7e494c7a6a/product/64406a0e992c9fd88fff8ee2",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"carts",
								"6442a40f7b7deb7e494c7a6a",
								"product",
								"64406a0e992c9fd88fff8ee2"
							]
						}
					},
					"response": []
				},
				{
					"name": "delete-product-to-cart",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:8080/api/carts/6442672352883cf3a92c923e/product/64403902b3e6266a6a4448e7",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"carts",
								"6442672352883cf3a92c923e",
								"product",
								"64403902b3e6266a6a4448e7"
							]
						}
					},
					"response": []
				},
				{
					"name": "delete-all-cart",
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
							"raw": "localhost:8080/api/carts/6442a40f7b7deb7e494c7a6a",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"carts",
								"6442a40f7b7deb7e494c7a6a"
							]
						}
					},
					"response": []
				},
				{
					"name": "modify-quantity",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"quantity\": 10\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:8080/api/carts/6442a40f7b7deb7e494c7a6a/product/644071b21127976f4fba34b2",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"carts",
								"6442a40f7b7deb7e494c7a6a",
								"product",
								"644071b21127976f4fba34b2"
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
- Delete product to cart
- updated quantity

## Products test

DB with data
