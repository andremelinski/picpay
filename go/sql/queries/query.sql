-- name: CreateUser :exec
INSERT INTO users (first_name, last_name, document, email, password, user_type) 
VALUES ($1,$2,$3,$4,$5,$6);

-- name: GetUser :one
SELECT * FROM users 
WHERE user_id = $1;

-- name: GetUserByMailOrDocument :one
SELECT * FROM users 
WHERE email = $1 OR document = $2;

-- ####### WALLETS

-- name: CreateWallet :exec
INSERT INTO wallets (user_id, balance) 
VALUES ($1,$2);

-- Update the balance of a wallet based on wallet_id
-- name: UpdateBalance :exec
UPDATE wallets 
SET balance = $1 
WHERE wallet_id = $2;

-- Retrieve a wallet by wallet_id
-- name: GetWallet :one
SELECT * 
FROM wallets 
WHERE wallet_id = $1;

-- Retrieve wallet and user details by user_id
-- name: GetWalletandUserByUserId :one
SELECT w.balance as balance, w.wallet_id as wallet_id, u.user_id as user_id, u.user_type as user_type 
FROM wallets w
LEFT JOIN users u ON u.user_id = w.user_id
WHERE w.user_id = $1;

-- Create a transaction record
-- name: CreateTransaction :exec
INSERT INTO transactions (from_wallet_id, to_wallet_id, value)
VALUES ($1, $2, $3);
