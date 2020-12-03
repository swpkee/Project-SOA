var express = require('express');
var router = express.Router();
const db = require('../database/database')

/* GET home page. */
router.get('/table', async function (req, res, next) {
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

  res.render('table', { Countrys: objectCountry });
});

router.get('/country/:state/:country', async function (req, res, next) {
  const State = req.params.state;
  const Country = req.params.country;
  if (State != "null") {
    var statusCountry = await db.getStatusByState(State);
    var lastWeekConfirmed = await db.getLastWeekConfirmedByState(State);
    var lastWeekRecovered = await db.getLastWeekRecoveredByState(State);
    var lastWeekDeaths = await db.getLastWeekDeathsByState(State);
    var Date = await db.getDate();
  } else {
    var statusCountry = await db.getStatusByCountry(Country);
    var lastWeekConfirmed = await db.getLastWeekConfirmedByCountry(Country);
    var lastWeekRecovered = await db.getLastWeekRecoveredByCountry(Country);
    var lastWeekDeaths = await db.getLastWeekDeathsByCountry(Country);
    var Date = await db.getDate();
  }

  const objectLastWeek = {
    country: statusCountry.rows[0].country,
    lat: statusCountry.rows[0].lat,
    long: statusCountry.rows[0].long,
    weekConfirmed: lastWeekConfirmed.rows[0],
    weekRecovered: lastWeekRecovered.rows[0],
    weekDeaths: lastWeekDeaths.rows[0],
    date: Object.keys(Date.rows[0])
  }


  res.render('country', { Status: statusCountry.rows[0], dataChart: objectLastWeek });
});

router.get('/map', async function (req, res, next) {

  const totalConfirmed = await db.getTotalConfirmed();
  const totalRecovered = await db.getTotalRecovered();
  const totlaDeaths = await db.getTotalDeaths();

  const getLatLong = await db.getLatLong();
  const getConfirmed = await db.getAllConfirmed();
  const getRecovered = await db.getAllRecovered();
  const getDeaths = await db.getAllDeaths();

  const objectTotal = {
    totalConfirmed: totalConfirmed.rows[0].confirmed,
    totalRecovered: totalRecovered.rows[0].recovered,
    totalDeaths: totlaDeaths.rows[0].deaths,
  }

  for (const key in getLatLong.rows) {
    if (getConfirmed.rows[key].confirmed != 0 || getRecovered.rows[key].recovered != 0 || getDeaths.rows[key].deaths != 0) {
      getLatLong.rows.splice(key, 1)
    }
  }
  res.render('map', { Totals: objectTotal, Maps: getLatLong.rows, });
});

module.exports = router;  
