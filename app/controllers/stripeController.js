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
var stripe=require("stripe")('sk_test_gtcTf8YKE9yBoqxAup4XPAfV');
var reservations=require('../models/reservation1.js');
var Entertainments=require('../models/entertainment');
var reservationsTime=require('../models/reservationTime');
module.exports= {
    charge: function (req, res) {
        console.log("i am here IN STRIPE CONTROLLER");
        console.log(req.body.date);
        console.log(req.body.startMinute);
        var token = req.body.stripeToken;
        var chargeAmount = req.body.chargeAmount;
        var id = req.body.id;
        console.log(req.body.id);
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
                console.log("good job")
                var reservation = new reservations({email: req.body.email, id: id, price: chargeAmount});
                reservation.save(function (err, success) {
                    if (err) {
                        res.send("error in saving");
                    }
                    else {
                        Entertainments.findOne({_id: req.body.id}, function (err, entertainments) {
                            console.log(entertainments);
                            var i = 0;
                            console.log(entertainments.reservations.length);
                           var localdate=req.body.date.toLocaleString();

                            for (i = 0; i < entertainments.reservations.length; i++) {
                                x = i;
                                console.log(i);
                                console.log(x);
                                var localdate2=entertainments.reservations[i].date.toLocaleString()

                                console.log(localdate);
                                console.log(localdate2);
                                if(localdate===localdate2){
                                    break;
                                }
                            }
                            console.log(x);
                                    console.log(req.body.date);
                            reservationsTime.findOne({_id: entertainments.reservations[x]}, function(err, success){
                                console.log(success);
                                success.booked = true;

                                entertainments.reservations[x]=success;
                                var newDate=entertainments.reservations[x].date;
                                var newStart=entertainments.reservations[x].startHour;
                                var newMin=entertainments.reservations[x].startMinute;
                                var bool=true;
                                var new1=new reservationsTime({date:newDate,startHour:newStart,startMinute:newMin,booked:bool});
                              entertainments.reservations.splice(x,1);
                              entertainments.reservations.splice(x,0,new1);

                                entertainments.save(function (err) {
                                console.log(entertainments);
                                    console.log("saved");

                                })
                                success.save(function (err, success) {
                                    console.log("booked");
                                    res.redirect('/');
                                })

                            })
                            })


                                }

                            })


                        }
                    })
                }

            }





