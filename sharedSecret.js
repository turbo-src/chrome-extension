const crypto = require('crypto');
const secp256k1 = require('secp256k1');

// Your private key (must be 32 bytes hex string without 0x prefix)
const clientEthereumPrivateKeyHex = '...';

// Ensure the private key is a Buffer
const clientEthereumPrivateKeyBuffer = Buffer.from(clientEthereumPrivateKeyHex, 'hex');

// Assume you've received the other party's public key as a hex string
const serverEthereumPublicKeyHex = "..."
const serverEthereumPublicKeyBuffer = Buffer.from(serverEthereumPublicKeyHex, 'hex');

// Generate the shared secret
const sharedSecret = secp256k1.ecdh(serverEthereumPublicKeyBuffer, clientEthereumPrivateKeyBuffer);

// Create a SHA-256 hash of the shared secret to use as the key for AES-256
const key = crypto.createHash('sha256').update(sharedSecret).digest();

// The initialization vector should be random and unique for each encryption
const iv = crypto.randomBytes(16);

// Encrypt a message
const message = 'Hello, World!';
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(message, 'utf8', 'hex');
encrypted += cipher.final('hex');

// Prepend the IV to the encrypted message as a hex string
const payload = iv.toString('hex') + encrypted;

console.log('Payload with IV:', payload);