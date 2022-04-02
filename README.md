# CoinWrap
A wrapper API for CoinCap's API with the added ability to authenticate users, add/remove assets, and calculate the USD value of various crypto quantities.

## Running CoinWrap
CoinWrap uses express and runs like a standard node app.

1. Install dependencies.
```
npm install
```

2. Initialize the SQLite database.
```
npm run seed
```

3. Start the server.
```
npm run start
```

## Testing
There are two types of tests available:
#### Wallet (add/remove asset functionality) Jest tests
The Jest tests only cover the new functionality for allowing asset addition and removal.
```
npm run test
```
#### Postman integration tests
The Postman tests cover both new and cloned functionality from CoinCap API.
1. Download and install Postman from https://www.postman.com/downloads/.
2. Import `CoinWrap.postman_collection.json` into Postman.
3. Ensure you have a clean instance by following the "Running CoinWrap" steps above.
3. Run the collection. 


## API

### Cloned APIs
To utilize existing CoinCap functionality, add the same API path (part of the URL after '/v2/') to the CoinWrap host. See https://docs.coincap.io/ for details.

For example, to get Bitcoin asset info:
```
// Original CoinCap API
api.coincap.io/v2/assets/bitcoin

// CoinWrap API
localhost:3000/assets/bitcoin
```

### New functionality
#### Auth
Creates new users and authenticates existing users. 

##### **POST** /auth/new
Create a new user

Request
| Key | Value Description |
| ------------- | ------------- |
| user  | username  |
| password | password  |

Response

HTTP 200 if user creation was successful. 


##### **POST** /auth/login
Authenticates existing users and returns a token to access `/wallet/` endpoints.

Request
| Key | Value Description |
| ------------- | ------------- |
| user  | username  |
| password | password  |

Response

Provide the following bearer token in the `Authentication` header for requests to `/wallet/`.

| Key | Value Description |
| ------------- | ------------- |
| token  | Bearer token  |

#### Wallet

**Note: To use wallet endpoints you must first obtain a token from the `/auth/login` and include it in the request `Authentication` header.**
##### **POST** /wallet/deposit
Deposit crypto into the user's wallet.

Request
| Key | Value Description |
| ------------- | ------------- |
| type  | Asset type (bitcoin, litecoin, etc.)  |
| amount | Amount to deposit  |

Response

HTTP 200 if deposit was successful. 

##### **POST** /wallet/withdraw
Withdraw crypto from the user's wallet.

Request
| Key | Value Description |
| ------------- | ------------- |
| type  | Asset type (bitcoin, litecoin, etc.)  |
| amount | Amount to withdraw  |

Response

HTTP 200 if withdraw was successful. 

##### **GET** /wallet/list
List all assets in the user's wallet.

Response
| Key | Value Description |
| ------------- | ------------- |
| assets  | List of assets in the user's wallet  |
| assetType  | Asset type such as bitcoin, litecoin, etc |
| quantity  | Amount of the asset currently held |
| valueUSD | Value of asset in USD |
| totalUSD | Total USD value of all assets in the user's wallet |

#### Calculator
Calculates USD value of an asset.

##### **GET** /calculator

Request
| Key | Value Description |
| ------------- | ------------- |
| type  | Asset type (bitcoin, litecoin, etc.)  |
| amount  | Amount of asset to calculate USD value |

Response
| Key | Value Description |
| ------------- | ------------- |
| valueUSD  | USD value of the given asset |
