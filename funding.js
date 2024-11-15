const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ber_02',
  password: '12345',
  port: 5432,
})

const getFundrequests = (request,response) => {
    const startDate = request.query.startdate;
    const endDate = request.query.enddate;
    let origId = request.query.origid; 
   ``
   if (origId == null) {
    origId = 0;
   }
    const queryString = `SELECT
    fr.id AS fund_req_id,
    fr.orig_id,
    o.name AS originator_name,
    fr.mode,
    fr.req_status,
    fr.created_date,
    frd.id AS fund_req_da_id,
    frd.pool_gen_mode,
    frd.pool_file_name,
    frd.pool_rs_file_name,
    frd.file_proc_status,
    frdp.id AS fund_req_da_pool_id,
    frdp.fund_req_pool_num,
    frdp.num_loans,
    frdp.eligible_loans,
    frdp.appr_loan_count,
    frdp.failed_loans_count,
    frdp.fund_req_pool_status,
    frdp.proceed_after_failure_excl
FROM
    hypo_common.fund_req fr
    JOIN hypo_common.originator o ON fr.orig_id = o.id
    JOIN hypo_common.fund_req_da frd ON frd.fund_req_id = fr.id
    LEFT JOIN hypo_common.fund_req_da_pool frdp ON frdp.fund_req_da_id = frd.id
WHERE
    fr.created_date >= $1
    AND fr.created_date <= $2 
    AND ($3 = 0 or fr.orig_id = $3 )
ORDER BY
    fr.created_date DESC;`

    pool.query(
        queryString, 
        [startDate, endDate, origId],
        (error, results) => {

      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const fundingInquires = (request,response) => {
    pool.query('', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

  module.exports ={
    fundingInquires,
    getFundrequests
  }