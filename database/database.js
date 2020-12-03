const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'abc123**',
    port: 5432,
})

const getAllCountry = async () => {
    const sql = `SELECT "Province/State" as State, "Country/Region" as Country from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllConfirmed = async () => {
    const sql = `select "3/23/20" as Confirmed from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllRecovered = async () => {
    const sql = `select "3/23/20" as Recovered from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllDeaths = async () => {
    const sql = `select "3/23/20" as deaths from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalConfirmed = async () => {
    const sql = `select sum("3/23/20") as Confirmed from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalRecovered = async () => {
    const sql = `select sum("3/23/20") as recovered from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalDeaths = async () => {
    const sql = `select sum("3/23/20") as deaths from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLatLong = async () => {
    const sql = `select "Province/State" as State , "Country/Region" as Country , lat , long  from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getStatusByCountry = async (Country) => {
    const sql = `select
    covid19_confirmed_csv."Country/Region" as Country,
    covid19_confirmed_csv.lat,
    covid19_confirmed_csv.long,
    covid19_confirmed_csv."3/22/20" as Confirmed,
    covid19_death_csv."3/22/20" as Deaths,
    covid19_recovered_csv."3/22/20" as Recovered
    from covid19_confirmed_csv, covid19_death_csv, covid19_recovered_csv
    where covid19_confirmed_csv."Country/Region" = covid19_death_csv."Country/Region"
    and covid19_confirmed_csv."Country/Region" = covid19_recovered_csv."Country/Region"
    and covid19_confirmed_csv."Country/Region" = '${Country}'`
        ;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getStatusByState = async (State) => {
    const sql = `select
    covid19_confirmed_csv."Province/State" as Country,
    covid19_confirmed_csv.lat,
    covid19_confirmed_csv.long,
    covid19_confirmed_csv."3/22/20" as Confirmed,
    covid19_death_csv."3/22/20" as Deaths,
    covid19_recovered_csv."3/22/20" as Recovered
    from covid19_confirmed_csv, covid19_death_csv, covid19_recovered_csv
    where covid19_confirmed_csv."Province/State" = covid19_death_csv."Province/State"
    and covid19_confirmed_csv."Province/State" = covid19_recovered_csv."Province/State"
    and covid19_confirmed_csv."Province/State" = '${State}'`
        ;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekConfirmedByCountry = async (Country) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_confirmed_csv
    where "Country/Region" = '${Country}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekRecoveredByCountry = async (Country) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_recovered_csv
    where "Country/Region" = '${Country}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekDeathsByCountry = async (Country) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_death_csv
    where "Country/Region" = '${Country}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekConfirmedByState = async (State) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_confirmed_csv
    where "Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekRecoveredByState = async (State) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_recovered_csv
    where "Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekDeathsByState = async (State) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_death_csv
    where "Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    getAllCountry,
    getAllConfirmed,
    getAllRecovered,
    getAllDeaths,
    getTotalConfirmed,
    getTotalRecovered,
    getTotalDeaths,
    getLatLong,
    getStatusByCountry,
    getStatusByState,
    getLastWeekConfirmedByCountry,
    getLastWeekRecoveredByCountry,
    getLastWeekDeathsByCountry,
    getLastWeekConfirmedByState,
    getLastWeekRecoveredByState,
    getLastWeekDeathsByState
}