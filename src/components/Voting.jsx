import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { db } from "../firebase";
import { AES, PBKDF2, enc, lib } from "crypto-js";

// import forge from "node-forge";

// export const generateAesKey = (rating) => {
//   const binary = rating.toString(2);
//   let paddedBinary = binary.padStart(Math.ceil(binary.length / 8) * 8, "0");
//   // const bytes = paddedBinary.match(/.{1,8}/g);
//   // const decimalBytes = bytes.map((byte) => parseInt(byte, 2));
//   // var salt = forge.random.getBytesSync(16);
//   // var key = forge.pkcs5.pbkdf2("password", salt, 5, 16);
//   var key = forge.random.getBytesSync(32);
//   var iv = forge.random.getBytesSync(32);

//   var cipher = forge.cipher.createCipher("AES-CBC", key);
//   cipher.start({ iv: iv });
//   cipher.update(forge.util.createBuffer(paddedBinary));
//   cipher.finish();
//   var encrypted = cipher.output;
//   // outputs encrypted hex
//   console.log(encrypted.toHex());

//   var decipher = forge.cipher.createDecipher("AES-CBC", key);
//   decipher.start({ iv: iv });
//   decipher.update(encrypted);
//   var result = decipher.finish(); // check 'result' for true/false
//   // outputs decrypted hex
//   console.log(decipher.output.toHex() + " " + result);
//   // const aesKey = forge.pkcs5.pbkdf2(
//   //   key,
//   //   salt
//   //   // ENCRYPTION_AES_ENC_KEY_OPTIONS.iterations, // use according to your requirement
//   //   // ENCRYPTION_AES_ENC_KEY_OPTIONS.keySize // use according to your requirement
//   // );
//   return encrypted.toHex();
// };

const generateAesKey = (rating) => {
  var salt = lib.WordArray.random(128 / 8);
  var key256Bits = PBKDF2("Secret Passphrase", salt, {
    keySize: 256 / 32,
  });
  console.log(key256Bits);
  const aes = AES.encrypt(rating.toString(), "secret key 123").toString();
  console.log("encrypted: " + aes);
  const decrypt = AES.decrypt(aes, "secret key 123").toString(enc.Utf8);
  console.log("decrypted: " + decrypt);
  return key256Bits;
};

function Voting() {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
    console.log(rate);

    // other logic
  };

  // Callback functions for reference
  //   const onPointerEnter = () => console.log("Enter");
  //   const onPointerLeave = () => console.log("Leave");
  //   const onPointerMove = (value: number, index: number) =>
  //     console.log(value, index);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Rating: " + rating);

    // const encryptedRating = encryptMessage(
    //   //   new Uint8Array(654321654321),
    //   rating
    // );

    const encryptedRatingKey = generateAesKey(rating);
    console.log(encryptedRatingKey);

    // await updateDoc(doc(db, "Voters", localStorage.getItem("uid")), {
    //   VoteForManmohanSingh: rating,
    // });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Vote Here!</h1>
      <form onSubmit={handleSubmit} className="my-1">
        <div className="input-container">
          <h6 style={{ display: "inline-block" }}>Dr. Manmohan Singh</h6>
          <Rating
            style={{ display: "inline-block" }}
            onClick={handleRating}
            // onPointerEnter={onPointerEnter}
            // onPointerLeave={onPointerLeave}
            // onPointerMove={onPointerMove}
            /* Available Props */
          />
        </div>
        <button className="btn btn-outline-success btn-lg my-5">
          Submit Vote
        </button>
      </form>
    </div>
  );
}

export default Voting;
