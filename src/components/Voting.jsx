import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import forge from "node-forge";
import Candidate from "./Candidate";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const RSAencryption = (rating) => {
  var publicKey = forge.pki.publicKeyFromPem(
    `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAkQrSaiJyy0MsyZlTyWjQ
gbxvdGoCUlWjWJph/B6f91h0q9/CEzSP9c8lTUs5B5inGAGy/7U5N+eRgKXYYi81
UUoQEyzujPwHkltaj4O3vZrx2+H1L8wuHRhlP+kMVUkfOovT/N2ECvp59E44+8u5
/orbJNQUJP9HOHxb4Dl0VeJVSmMUt+I8KvAhJRb7xZuNnZrTOLrw4p75NuERDo+t
QlykPtx0dfBIKTsnNwykd22Q0XnpgfiEVmyC021sCOsIGZlkbFase/PlTHJucVzp
Wy9Fby2WhF2Prtfz4Ybnf7StyJKYdQQokKRUEJcEGj6zB82MNGcgqy4VUgoKGORc
Oen8k1LCQHiZiWmnXOOxn4AUGTbm3ZAPy6GIGaQFOYo58sY0YIsZcSOGTRWIrr9V
/gDABnkzZnzJ/bymlx565QOqXFvYJP773E4aP0GAFk9lNKBzVsIEn4VYxKGxUnQV
8UocChuRRGflBgPkW8CtbMyIwls9A4NlZSquxB+v1r3PCcG+gt/BSi9+vvwFkJRM
84exq/wrqLxR0qLorkVDmBXeVRRAmrEUI+mC+bLJGuiKfXn5/V2tPGuwd7QrBfMr
7bqStCzTAyJRcZxtk4QtEFSLwG0CxDOM3+6Ic0AnZo8zRmN3h8mX3Nd3ymw58Jxp
NraFT9a0hnhwVm9TcviGVXUCAwEAAQ==
-----END PUBLIC KEY-----`
  );

  const encryptedRating = forge.util.encode64(
    publicKey.encrypt(forge.util.encodeUtf8(rating), "RSA-OAEP", {
      md: forge.md.sha256.create(),
    })
  );
  console.log("enc: " + encryptedRating);

  //   var privateKey = forge.pki.privateKeyFromPem(`-----BEGIN RSA PRIVATE KEY-----
  // MIIJKQIBAAKCAgEAkQrSaiJyy0MsyZlTyWjQgbxvdGoCUlWjWJph/B6f91h0q9/C
  // EzSP9c8lTUs5B5inGAGy/7U5N+eRgKXYYi81UUoQEyzujPwHkltaj4O3vZrx2+H1
  // L8wuHRhlP+kMVUkfOovT/N2ECvp59E44+8u5/orbJNQUJP9HOHxb4Dl0VeJVSmMU
  // t+I8KvAhJRb7xZuNnZrTOLrw4p75NuERDo+tQlykPtx0dfBIKTsnNwykd22Q0Xnp
  // gfiEVmyC021sCOsIGZlkbFase/PlTHJucVzpWy9Fby2WhF2Prtfz4Ybnf7StyJKY
  // dQQokKRUEJcEGj6zB82MNGcgqy4VUgoKGORcOen8k1LCQHiZiWmnXOOxn4AUGTbm
  // 3ZAPy6GIGaQFOYo58sY0YIsZcSOGTRWIrr9V/gDABnkzZnzJ/bymlx565QOqXFvY
  // JP773E4aP0GAFk9lNKBzVsIEn4VYxKGxUnQV8UocChuRRGflBgPkW8CtbMyIwls9
  // A4NlZSquxB+v1r3PCcG+gt/BSi9+vvwFkJRM84exq/wrqLxR0qLorkVDmBXeVRRA
  // mrEUI+mC+bLJGuiKfXn5/V2tPGuwd7QrBfMr7bqStCzTAyJRcZxtk4QtEFSLwG0C
  // xDOM3+6Ic0AnZo8zRmN3h8mX3Nd3ymw58JxpNraFT9a0hnhwVm9TcviGVXUCAwEA
  // AQKCAgBqiTJo9wiuuJbLNa5PgIe247xSHBO8el7TFALo9220duqr3F1nUfJ0MUVK
  // 8vfe1ofVoFnkbS6sG5HKlwbLh7V4EhignR5TvEOrgyKPy8ZIpOkGA4DfLPCqOmMU
  // gI+ojV8817xMPkFg9v5hLpu4h7oEd+XjtUteqYuct+ucVVdYRjkzvHdZYfmj6GHQ
  // JoOkcE+i9jgzsUyCiRaw8rxen7Y5ymZyLef1QRsf/e0eCFE9z+LRmuSjrPE3sdie
  // h/8Uxd5bP0p+MWPcYBeLAXqSFhbp/VzY/vlSHI8PdFwUycx9By+m5dbKDNXm+G0v
  // Cl3fETLbhmV3kFB0rBLJAcrM4d/DJlUYf9IEve1EVoRR3j0UhTauB4aC/VpAUExH
  // LRC6MShAOQBvs9u4vM2AT81gUPFLIJTuTx/nhVhfmdu+NCc3suqoDQ4yEirxxiou
  // LtcisQKGJdwlHav9yQ2+M6PB5OZ0AF5q0ZHsFJ7dRfEm5YtB4ygMIpiJkAlhQlYY
  // tSPImGHgYKzQrf1AvSAz1jXWEtjUKMlTXGLNKWdrbC8nAPu9gvLYVNl1w0MYabCS
  // UjRgFI7Dn25aTff2wC7s2+d6c9xDBZXyiujvlMunnzIhmMxWrqn3rRd2ZDM6o2gm
  // PTN6l+MKDb+a2jZfEREpOwBk3FOlyaOJtcuZ0WCLDblezci3eQKCAQEA0OdxOKFY
  // SL2WjacNBFaBb377T/v6pFSxxYFUZbHS4w98u6UbGMCxfINr8AQ+8poZPQYfZDIE
  // BIrXHdLR2RcUc1XwxXl7Ds5Z+eZn8SFLsf3gXpy/X8u5aDEdsDMlYqN12MRVFguw
  // XyNNAcbeGDnfImFmws05opC+sZDmUJv1AntD4ScdEkEcJXwxXuUbrWJBOIcBphco
  // jDZXWEy+d622HRVNzJLVCX6LONJeY31z4Dr3S/OqPhMaSbk2mAWDNIG8nLBEF6yl
  // vIaCwMyQak/Xc9hMfqcDm14PHm0U1FG8xvFanyGsmlqLBsn/Sn79NJR5fk5Qm4SQ
  // CPrapoXE6wfgtwKCAQEAsb2zPLxRiaYjqK24geGFiq2rPnBjSdqITTvbpYSDAmkW
  // 9Wal97R7UshldpOdIQmknnT/Ukdd3kd8CaCvZKcGYbW8PgvgjXV2aR0A6ACBSfUB
  // nNw+mvBKCMzIBlxw2+yvoTEwAbiELv0KbFiff5N5rWB3etfvsnaDlpe6q9vlEhKa
  // AtrCauIc8eSYykSg46WOfSukowgEMPn2gIJ/4Piar2I8BqafEt2zQUWIetCPPAz7
  // 2z6BhC+m0S0Do7vL95XZ2TPAAh0xpGaZwQpAgkSxW6aU1WD6NkIog8R8CRnv9mjR
  // RKwXJCECmb4Fxz2NU8TGFU+PJtKqOP1WA6PYaPz3MwKCAQEAyR65Q1MagtV7955n
  // itCZxrUS0JuAX+tmRwbPMST1KkNDzAgVwUvq1DxWk3oS/E/dkoGtgTIh6hmdJwpL
  // m9x7hNqtdgERt1x1BYGMenqavJ71/0CbgmfJdYUr1vI2wPMsRugmHpZcVAvRXK+Q
  // LPSyXRA29b7NCTSfUqZ1BhBP3va7kC2u8F8c8P3TLlAWyGM69WgM71GGaQ78Ineo
  // O+JS3UcgYp7OWViqQqdN1iz2fV9nrIjHUwHjIi0dYViVS9zHsHaG5+AApDM/+Mw5
  // ERETFWWdp6W1dEQm/Bz6m7qhq0q7+05ZNTWMeZnJnXgK4C89lJtjQYZrgSm5je5l
  // ef1YmwKCAQEApSFAH4I6Iq9G29Sh4ZD7d47H1NendxrfnRmqhAkrihbGbLG0KgD0
  // vkFN+q9DwUjrNwgtmWySagtx0qQFr3Z5uFeWjvKL6gCiRR/cEq89bs+AcxIv29S4
  // g5p1j2tcswYfWZuQJVke/WS7xVNEw8rotco01t09ZUk0EbnfhQFjvbmoelRxYcm2
  // 6Ijf5rOB4l2SlvnwGEM/WZ0xhc04L3Poil6ys98jVOzCODb4iFmxaTIK33Mf8wYu
  // bpHqmrjD077VyTSKA6zJzRpBaJY0vpJBUIvgJKnXbIdkip8GOZJuXTiei7VyPm+o
  // sdtYFPY7kgLzoSLsNT5tRUsgGXukeE3k/wKCAQBQJJLAV46WmElWMcLUdrjG/I3g
  // QE80+Xl5aMojk9t8IXTZFlzQIcv/3AlsSrdaXfp3ChIx1iROZxlruduNmWsbLufh
  // cYtBC5ngWoDXFuao1jnnF6vo10X+hz7eldrMhbM1lI4pn4XSsre22YKy3tJOFIzX
  // SUG79jlGRhBMqseGmbHMRJWU2YGNwf93MCjRQaPsgIdT9bvXfUK1o5biyzwVgNKc
  // Dplh4W/VDBrthvrGknPDoqYv52gcodYQ13bqvicyNRTz1sv1qhTo3coTiGFefSa5
  // /oLt/1nK/8ULTt78TwBORf76U6OYvDRwj0GEHyBPMEFUkbQHIdVyWxPFSgmO
  // -----END RSA PRIVATE KEY-----`);
  // const decryptedRating = forge.util.decodeUtf8(
  //   privateKey.decrypt(forge.util.decode64(encryptedRating), "RSA-OAEP", {
  //     md: forge.md.sha256.create(),
  //   })
  // );
  // console.log("dec: " + decryptedRating);

  return encryptedRating;
};

async function hasVoted(uid) {
  const docRef = doc(db, "Voters", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data().Voted === true) {
    return true;
  }
  return false;
}

function Voting() {
  const [Voted, setVoted] = useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (await hasVoted(user.uid)) {
          setVoted(true);
        } else {
          setVoted(false);
        }
      } else {
      }
    });
  }, []);

  const votes = {
    one: {
      name: "Dr. Manmohan Singh",
      rating: 0,
    },
    two: {
      name: "Mr. Narendra Modi",
      rating: 0,
    },
    three: {
      name: "Mr. Rahul Gandhi",
      rating: 0,
    },
  };

  const [Manmohan, setManmohan] = useState(votes.one);
  const [Modi, setModi] = useState(votes.two);
  const [Gandhi, setGandhi] = useState(votes.three);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let rating = {
      one: { name: Manmohan.name, rating: Manmohan.rating },
      two: { name: Modi.name, rating: Modi.rating },
      three: { name: Gandhi.name, rating: Gandhi.rating },
    };

    console.log("submitted: " + JSON.stringify(rating));

    const encryptedRating = RSAencryption(JSON.stringify(rating));

    await updateDoc(doc(db, "Voters", localStorage.getItem("uid")), {
      Votes: encryptedRating,
      Voted: true,
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {Voted === true ? (
        <div className="my-5">
          <h1>You have Already Voted!</h1>
          <Link to={"/dashboard"}>Go Back to Dashboard!</Link>
        </div>
      ) : (
        <div>
          <h1>Vote Here!</h1>
          <form onSubmit={handleSubmit} className="my-1">
            <Candidate feedback={Manmohan} setFeedback={setManmohan} />
            <Candidate feedback={Modi} setFeedback={setModi} />
            <Candidate feedback={Gandhi} setFeedback={setGandhi} />
            <button className="btn btn-outline-success btn-lg my-5">
              Submit Vote
            </button>
          </form>
          <script src="../static/jsencrypt.min.js"></script>
        </div>
      )}
    </div>
  );
}

export default Voting;
