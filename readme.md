# Trading API Documentation

 This document provides an overview of the Trading API endpoints and their usage.

## Installation

Pull the repository and run the following commands. Make sure npm, docker and docker-compose are installed.

```
npm install
docker-compose up --build
```

## Testing
Use the provided postman collection to test the api. API will be hosted on your localhost:3000.

# Endpoints

## 1. Get All Shares
 - **Method:** GET
 - **URL:** `http://localhost:3000/shares`
 - **Description:** Retrieves a list of all shares.

## 2. Get Share by Symbol
 - **Method:** GET
 - **URL:** `http://localhost:3000/shares/:symbol`
 - **Description:** Retrieves details of a share by its symbol.
 - **URL Parameters:**
   - `symbol` (string): The symbol of the share to retrieve.

## 3. Create Share
 - **Method:** POST
 - **URL:** `http://localhost:3000/shares`
 - **Description:** Creates a new share.
 - **Request Body:**
   ```json
   {
     "name": "AAP",
     "price": 100
   }
   ```

## 4. Delete Share
 - **Method:** DELETE
 - **URL:** `http://localhost:3000/shares/:symbol`
 - **Description:** Deletes a share by its symbol.
 - **URL Parameters:**
   - `symbol` (string): The symbol of the share to delete.

## 5. Update Share
 - **Method:** PUT
 - **URL:** `http://localhost:3000/shares/:symbol`
 - **Description:** Updates the price of a share by its symbol.
 - **URL Parameters:**
   - `symbol` (string): The symbol of the share to update.
 - **Request Body:**
   ```json
   {
     "price": 110
   }
   ```

## 6. Get All Portfolios
 - **Method:** GET
 - **URL:** `http://localhost:3000/portfolios`
 - **Description:** Retrieves a list of all portfolios.

## 7. Get Portfolio by ID
 - **Method:** GET
 - **URL:** `http://localhost:3000/portfolios/:id`
 - **Description:** Retrieves details of a portfolio by its ID.
 - **URL Parameters:**
   - `id` (integer): The ID of the portfolio to retrieve.

## 8. Create Portfolio
 - **Method:** POST
 - **URL:** `http://localhost:3000/portfolios`
 - **Description:** Creates a new portfolio.
 - **Request Body:**
   ```json
   {
     "balance": 1000
   }
   ```

## 9. Get All Trades
 - **Method:** GET
 - **URL:** `http://localhost:3000/trades`
 - **Description:** Retrieves a list of all trades.

## 10. Buy Shares
 - **Method:** POST
 - **URL:** `http://localhost:3000/trades/:portfolioId/buy`
 - **Description:** Buys shares for a specified portfolio.
 - **URL Parameters:**
   - `portfolioId` (integer): The ID of the portfolio buying shares.
 - **Request Body:**
   ```json
   {
     "shareId": "AAP",
     "amount": 10
   }
   ```

## 11. Sell Shares
 - **Method:** POST
 - **URL:** `http://localhost:3000/trades/:portfolioId/sell`
 - **Description:** Sells shares for a specified portfolio.
 - **URL Parameters:**
   - `portfolioId` (integer): The ID of the portfolio selling shares.
 - **Request Body:**
   ```json
   {
     "shareId": "AAP",
     "amount": 5
   }
   ```

## 12. Get Shares of Portfolio
 - **Method:** GET
 - **URL:** `http://localhost:3000/portfolios/:portfolioId/shares`
 - **Description:** Retrieves the shares associated with a specific portfolio.
 - **URL Parameters:**
   - `portfolioId` (integer): The ID of the portfolio to retrieve shares for.

# Usage

 1. Make sure your server is running on `http://localhost:3000`.
 2. Use a tool like Postman to send HTTP requests to the endpoints listed above.
 3. Ensure you set the `Content-Type: application/json` header for endpoints that require a request body.

# Examples

## Example: Create a Share
 ```bash
 curl -X POST http://localhost:3000/shares -H "Content-Type: application/json" -d '{
     "name": "AAP",
     "price": 100
 }'
 ```

## Example: Buy Shares
 ```bash
 curl -X POST http://localhost:3000/trades/1/buy -H "Content-Type: application/json" -d '{
     "shareId": "AAP",
     "amount": 10
 }'
 ```

## Example: Sell Shares
 ```bash
 curl -X POST http://localhost:3000/trades/1/sell -H "Content-Type: application/json" -d '{
     "shareId": "AAP",
     "amount": 5
 }'
 ```

 For more details, use the provided Postman collection to interact with the API endpoints.
