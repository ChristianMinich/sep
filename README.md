# LingenLiefert Server

LingenLieferts Server is a Node.js web application built with Express that .

## Features

- Creating Stores
- Handling Orders
- Manage Store Settings

## Installation

1. Clone the repository: `git clone https://github.com/ChristianMinich/sep.git`
2. Navigate to the project directory: `cd sep`
3. Install the dependencies: `npm install`

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

```
PORT=8080
host=""
user=""
password=""
database=""
JWT_SECRET=""
server_address=""
image_folder="/Images/"
CLIENT_ID=""
CLIENT_SECRET=""
accessToken=""
templatePath_Seller="...../order_template.ejs"
templatePath_LWT="...../sep/public/order_template_lwt.ejs"
lwtMailAddress=""
```

Note: Adjust the values as per your requirements.

## Database Setup

1. Make sure you have MariaDB installed and running on your local machine or connect to the remote Database.
2. If run locally create a new database called `LINGENLIEFERT` in Mariadb.

## Usage

1. Start the application: `npm run start`
2. Open your web browser and visit `http://localhost:8080` (or the port you specified in `.env`).

## JSDoc

1. Install Dependencies globally:

```
npm install -g jsdoc
```
```
npm install --save-dev jsdoc
```
2. Change Directory 
```
cd webtech_project
```
3. Generate JSDocs with directory path (./directory/)
```
jsdoc -r ./game/ ./services/ ./routes/ ./repositories/
```
## Jest

1. Install Dependencies globally:
```
npm install --save-dev jest
```
2. Run all tests:
```
npm run test
```
3. Get coverage: (Caution: If an error occurres change your ExecutionPolicy to unrestricted)
```
jest --collect-coverage
```
## Folder Structure

```
├── __tests__
│   ├── controllers
|       └── adminController.test.js
│   ├── models
|       └── abstractModel.test.js
|   ├── repositories
|       └── abstractRepository.test.js
|   ├── services
|       └── addressService.test.js
├── public
|   ├── Images
├── src
|   ├── controllers
|       ├── adminController.js
|       ├── apiController.js
|       ├── authController.js
|       ├── index.js
|       └── storeDetailsController.js
|   ├── middlewares
|       └── index.js
|   ├── models
|       ├── abstractModel.js
|       ├── address.js
|       ├── order.js
|       ├── recipient.js
|       ├── settings.js
|       └── store.js
|   ├── repositories
|       ├── abstractRepository.js
|       ├── baseRepository.js
|       ├── database.js
|       ├── index.js
|       ├── orderRepository.js
|       └── userRepository.js
|   ├── routes
|       ├── abstractRouter.js
|       ├── adminRouter.js
|       ├── apiRouter.js
|       ├── authRouter.js
|       └── index.js
|   ├── services
|       ├── addressService.js
|       ├── index.js
|       ├── locatorService.js
|       ├── mailService.js
|       ├── orderService.js
|       ├── storeService.js
|       └── userService.js
|   └── utils
|       ├── allOrdersObject.js
|       ├── emailValidator.js
|       ├── logger.js
|       ├── storeDetailsObject.js
├── public
│   ├── assets
│   ├── css-warmupGame
│   ├── css
│   ├── js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── registered.html
│   ├── test-memes.html
│   └── warmup-game.html
├── .env
├── .prettierrc
├── LICENSE
├── .gitignore
├── apiEndpoints.json
├── package-lock.json
├── package.json
├── server.js
└── README.md
```

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the [Eclipse Public License 2.0]().

## Acknowledgments

- [Express](https://expressjs.com/)
- [MariaDB](https://mariadb.org/)
- [uuid](https://www.npmjs.com/package/uuid)

## Contact

If you have any questions, feel free to reach out to [Chris](mailto:christian.minich@hs-osnabrueck.de).
