const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const assert = require('assert');

// Section: Key Generation
// --------------------------------------------------------------------------------
// Define a 32-byte hex string representing a private key (without the '0x' prefix).
const ethereumPrivateKeyHex = '..'; // server
//const ethereumPrivateKeyHex = '..'; // client

// Convert the private key hex string to a Buffer for cryptographic operations.
const ethereumPrivateKeyBuffer = Buffer.from(ethereumPrivateKeyHex, 'hex');

// Use the secp256k1 library to derive the public key from the private key.
const ethereumPublicKeyBuffer = secp256k1.publicKeyCreate(ethereumPrivateKeyBuffer);

// Section: Public Key Conversion and Validation
// --------------------------------------------------------------------------------
// Convert the public key Buffer to a hexadecimal string representation.
const ethereumPublicKeyString = ethereumPublicKeyBuffer
  .reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

// Log the type and value of the derived public key to verify the conversion.
console.log(typeof ethereumPublicKeyString); // Should output 'string'
console.log(ethereumPublicKeyString); // Outputs the public key as a hex string

// Reconstruct the public key Buffer from the hexadecimal string to validate the conversion.
const ethereumPublicKeyBufferFromStr = Buffer.from(ethereumPublicKeyString, 'hex');
//const ethereumPublicKeyUncompressed = secp256k1.publicKeyConvert(ethereumPublicKeyBufferFromStr, false);

// Log the hexadecimal string of the original and reconstructed public key Buffers for comparison.
console.log(Array.from(ethereumPublicKeyBuffer).map(byte => byte.toString(16).padStart(2, '0')).join(''));
console.log(ethereumPublicKeyBufferFromStr.toString('hex'));

// Use an assertion to ensure that the original public key Buffer and the reconstructed Buffer are identical.
// This validates that the conversion between Buffer and string is consistent.
assert.strictEqual(
  Array.from(ethereumPublicKeyBuffer).map(byte => byte.toString(16).padStart(2, '0')).join(''),
  ethereumPublicKeyBufferFromStr.toString('hex')
);

console.log('Assertion passed: Public key Buffers are identical.');
