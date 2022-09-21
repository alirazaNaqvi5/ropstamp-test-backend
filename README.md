
# Ropstam test task project, Backend Node.js

All things in this project are upto date and according to the details provided in the HR's mail.


## Run Locally

Clone the project

```bash
  git clone https://github.com/alirazaNaqvi5/ropstamp-test-backend.git
```

Go to the project directory

```bash
  cd ropstamp-test-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```
Above command will start project Locally using nodemon. So, if you make any changes in any file/folder of the project. Server automatically restarted.


## API Reference

#### Static folder serving endpoint

```http
  GET http://localhost:5000/uploads/cars/<image_file_name>
```

#### Signup using user details

```http
  POST http://localhost:5000/api/auth/Signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email address, signup with same email twice is not allowed |
| `name` | `string` | **Required**. name of the user |
| `phone` | `number` | **Required**. phone number must contain only numbers, letters are not allowed |


#### Login using user details receieved on email

```http
  POST http://localhost:5000/api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email address which used for signup |
| `password` | `string` | **Required**. password that you received through email |


#### Get All Cars registered in the database

```http
  GET http://localhost:5000/api/cars
```
Pass the following parameters in header to get cars, because these API's are JWT protected
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |


#### Get Cars by Category Name
Category name must be listed in the database, otherwise data will not be received

```http
  GET http://localhost:5000/api/cars/category
```
Pass the following parameters in header to get cars, because these API's are JWT protected

Pass token in header, using following Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |

Pass following parameter in body x-www-form-urlencoded 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**. Pass category name, to get all cars which are registered against that category  |



#### Register a new Car in database


```http
  POST http://localhost:5000/api/cars
```
Pass the following parameters in header, because this API's is JWT protected

Pass token in header, using following Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |

Pass Car details using these parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image`      | `file` | **Required**. Image of the car  |
| `category`      | `string` | **Required**. Category, which are available  |
| `title`      | `string` | **Required**. Title of the post/car  |
| `color`      | `string` | **Required**. color of the car  |
| `model`      | `string` | **Required**. model number of the car  |
| `make`      | `string` | **Required**. make of the car or comapny name  |
| `registration_no`      | `string` | **Required**. Car registration number, registration of car with same number is not allowed   |


#### Update Car details in case of wrong entry in database


```http
  PUT http://localhost:5000/api/cars/update
```
Pass the following parameters in header, because this API's is JWT protected

Pass token in header, using following Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |

Pass Updated Car details using these parameters except id, because id will not be chaged, it will be used to updated data in database
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` | **Required**. id of the car post  |
| `category`      | `string` | **Required**. Category, which are available  |
| `title`      | `string` | **Required**. title of the post updated  |
| `color`      | `string` | **Required**. updated color name  |
| `model`      | `string` | **Required**. model of the car updated  |
| `make`      | `string` | **Required**. make of the car or comapny name  |
| `registration_no`      | `string` | **Required**. updated registration number in case wrong entry at the time of registration   |



#### Delete a Car


```http
  DELETE http://localhost:5000/api/cars/delete
```
Pass the following parameters in header, because this API's is JWT protected

Pass token in header, using following Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |

Pass Car post id, which you want to delete
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. delete car post by it's post id, wrong id is not allowed  |



#### Add new Category name in database


```http
  POST http://localhost:5000/api/cat/create
```
Pass the following parameters in header, because this API's is JWT protected

Pass token in header, using following Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |

Pass category name
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the category, which you want to register, dublicate name is not allowed  |


#### Get all categories available in database


```http
  GET http://localhost:5000/api/cat
```
Pass the following parameters in header, because this API's is JWT protected

Pass token in header, using following Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |



#### Update category name in database using id


```http
  PUT http://localhost:5000/api/cat/update
```
Pass the following parameters in header, because this API's is JWT protected

Pass token in header, using following Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |


Pass id, new name and previous name  of the category that you want to update
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of the category which you want to update |
| `name`      | `string` | **Required**. updated category name, this will also replace category names of the car registered again this category name |
| `previous_name`      | `string` | **Required**. current name of the category |


#### Delete a Category by id


```http
  DELETE http://localhost:5000/api/cat/delete
```
Pass the following parameters in header, because this API's is JWT protected

Pass token in header, using following Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. Token that receieved when called Login API |

Pass Car post id, which you want to delete
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of the category which you want to delete  |
