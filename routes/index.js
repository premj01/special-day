var express = require('express');
var router = express.Router();
const record = require("./users")



/* GET home page. */
router.get('/', function (req, res) {
  res.end("Welcome TO INVITE ME ")
});

router.post('/ask-valentine', async function (req, res) {
  req.session.partner = req.body.partner
  req.session.username = req.body.username
  req.session.gender = req.body.gender

  let headerToSend
  if (req.body.partner != '' && req.body.username != '' && req.body.gender != '') {

    let URLCodeBreaker = true;
    let urlEncode = '';
    while (URLCodeBreaker) {

      for (let i = 0; i < 4; i++) {
        urlEncode += String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97)
      }

      // chack url encode presnet or not
      let urlEncodingflag = await record.findOne({
        "urlCode": urlEncode
      })

      if (urlEncodingflag) {
        console.log("repeated urlCode :" + urlEncode)
      }
      else {
        // create data in database
        let userInfo = await record.create({
          name: req.session.partner,
          username: req.session.username,
          gender: req.session.gender,
          urlCode: urlEncode

        })
        // break while loop

        URLCodeBreaker = false;
      }

    }

    headerToSend = JSON.stringify({ url: req.get('host') + "/ask/" + req.session.partner + '-' + urlEncode })
  }
  else {
    headerToSend = JSON.stringify({ url: "plz enter all values" })

  }

  res.json(headerToSend)


  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Session destroyed');
    }
  });

});

router.get('/ask/:urlcode', async (req, res) => {
  let urlEncoding = req.params.urlcode

  //  url processing
  let arr = urlEncoding.split('-')

  //check record exist or not
  let urlVarification = await record.findOne({ urlCode: arr[1], name: arr[0] })
  let headerToSend
  if(urlVarification)
  {
      headerToSend = JSON.stringify({name : urlVarification.name ,gender:urlVarification.gender , user : urlVarification.username  })
    }else{
      headerToSend = JSON.stringify({name : false ,gender:undefined , user : undefined  })
      
  }
  res.json(headerToSend)


})


module.exports = router;
