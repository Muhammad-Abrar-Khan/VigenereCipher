import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const VigenereCipher = () => {
  const [plainText, setPlainText] = useState('');
  const [key, setKey] = useState('');
  const [cipherText, setCipherText] = useState('');

  const encrypt = () => {
    const keyStream = generateKeyStream(plainText, key);
    const encryptedText = processText(plainText, keyStream, true);
    setCipherText(encryptedText);
  };

  const generateKeyStream = (text, key) => {
    const repeatedKey = key.repeat(Math.ceil(text.length / key.length)).toUpperCase();
    return repeatedKey.slice(0, text.length);
  };

  const processText = (text, keyStream, encrypt) => {
    return text
      .toUpperCase()
      .split('')
      .map((char, index) => {
        if (char.match(/[A-Z]/)) {
          const code = char.charCodeAt(0);
          const shift = keyStream.charCodeAt(index) - 65;
          let shiftedCode = encrypt
            ? ((code - 65 + shift + 26) % 26) + 65
            : ((code - 65 - shift + 26) % 26) + 65;
          return String.fromCharCode(shiftedCode);
        } else {
          return char;
        }
      })
      .join('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Vigenère Cipher</h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Enter Plain Text:</label>
          <input
            type="text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            placeholder="Enter text"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Enter Key:</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter key"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={encrypt}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        >
          Encrypt
        </button>

        <div className="mt-6">
          <p className="text-lg font-semibold">Encrypted Text:</p>
          <p className="text-xl bg-gray-100 p-2 rounded">{cipherText}</p>
        </div>
      </div>
    </div>
  );
};

export default VigenereCipher;
