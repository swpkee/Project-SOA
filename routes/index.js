var express = require('express');
var router = express.Router();
const db = require('../database/database')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const result = await db.getAllCountry();
  const getConfirmed = await db.getAllConfirmed();
  const getRecovered = await db.getAllRecovered();
  const getDeaths = await db.getAllDeaths();

  let objectCountry = [];
  for (const key in result.rows) {
    objectCountry[key] = {
      state: result.rows[key].state,
      country: result.rows[key].country,
      confirmed: getConfirmed.rows[key].confirmed,
      recovered: getRecovered.rows[key].recovered,
      deaths: getDeaths.rows[key].deaths
    }
  }

  res.render('index', { Countrys: objectCountry });
});

router.get('/map', async function (req, res, next) {
  const totalConfirmed = await db.getTotalConfirmed();
  const totalRecovered = await db.getTotalRecovered();
  const totlaDeaths = await db.getTotalDeaths();
  const getLatLong = await db.getLatLong();

  const objectTotal = {
    totalConfirmed: totalConfirmed.rows[0].confirmed,
    totalRecovered: totalRecovered.rows[0].recovered,
    totalDeaths: totlaDeaths.rows[0].deaths,
  }


  res.render('map', { Totals: objectTotal, Maps: getLatLong.rows });
});

module.exports = router;
