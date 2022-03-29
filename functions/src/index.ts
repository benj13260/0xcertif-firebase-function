import * as functions from "firebase-functions";
import * as express from "express";
import axios from "axios";

const cors = require('cors')({origin: true});
const app = express();

const uploadUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';


app.use(cors);
//app.use(validateFirebaseIdToken);
app.get('/hello', (req : any, res : any) => {

  res.send(`Hello `);
});

const upload = async (req:any, res:any, next:any) => {
    
    axios({
        method: "post",
        url: uploadUrl,
        data: req.body,
        headers: { 
            'content-type': `${req.headers["content-type"]}`,
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_API_KEY_SECRET },
      })
        .then(function (response) {
          //handle success
          res.send(response.data);
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
}


app.use('/upload', upload )

app.get('*', (req : any, res : any) => {
    // @ts-ignore
    res.send(null);
  });

exports.app = functions.https.onRequest(app);