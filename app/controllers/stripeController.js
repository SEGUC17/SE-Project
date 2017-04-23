/**
 * Created by karim on 4/21/17.
 */
var x;
var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0],d[1],d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year,d.month,d.date) :
                                NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
                (a>b)-(a<b) :
                NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
        );
    }
}
var Clients=require("../models/client.js");
var stripe=require("stripe")('sk_test_gtcTf8YKE9yBoqxAup4XPAfV');
var reservations=require('../models/reservation1.js');
var Entertainments=require('../models/entertainment');
var reservationsTime=require('../models/reservationTime');
module.exports= {
    charge: function (req, res) {
        console.log("i am here IN STRIPE CONTROLLER");

        var token = req.body.stripeToken;
        var chargeAmount = req.body.chargeAmount;


        // console.log(req);
        console.log(chargeAmount);
        var charge = stripe.charges.create({
            amount: chargeAmount,
            currency: "egp",
            source: token
        }, function (err, charge) {
            if (err && err.type === "StripeCardError") {
                console.log("your card was declined");

            }
            else {
              console.log('herherhehrea');
              console.log(req.user.email);
              Clients.findOne({email:req.user.email},function(err,Client){

                console.log(Client);
                var x=parseFloat(Client.balance);
                x=parseFloat(x)+parseFloat(chargeAmount);
                Client.balance=parseFloat(x);
                console.log(Client.balance)
                Client.save(function(err,success){
                  if(err){
                    console.log("error in saving");
                  }
                  else{
                    res.redirect('/profile_client')
                  }
                });
                console.log("saved");
                }   )
              }
            })
          }
        }
