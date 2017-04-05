var express = require('express');
var router = express.Router();
var z=require('./controller/entertainmentController');
router.post('/entertainment',z.add);
router.get('/' ,z.get);
router.post('/remove',z.remove);
router.get('/admin',z.admin);
router.get('/rate',z.rate);
router.post('/editEmail',z.editEmail);
router.post('/editPrice',z.editPrice);
router.post('/editPhone',z.editPhone);
router.post('/editLocation',z.editLocation);
router.post('/editName',z.editName);
router.post('/rateEntertainment',z.rateEntertainment);
router.get('/edit',z.edit);


module.exports = router;

