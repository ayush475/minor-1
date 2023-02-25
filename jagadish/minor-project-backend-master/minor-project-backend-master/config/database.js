const { Sequelize } = require('sequelize');
const dotEnv=require('dotenv');

// getting enviroment variables
// dotEnv.config({ path: "./.env" });
// console.log(process.env.PORT);


// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
//   dialect: 'mysql',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   define: {
//     timestamps: true,
//     freezeTableName: true
//   },
// }
// );

const sequelize = new Sequelize('bus_project', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging:false
});


  
    // const pool = new Pool({
    //   user: 'jagadish',
    //   host: 'localhost',
    //   database: 'just_testing',
    //   password: 'jagadish123',
    //   port: 5432,
    // })

    // pool.on('error', (err, client) => {
    //     console.error('Unexpected error on idle client', err)
    //     process.exit(-1)
    //   })

    //   pool.connect((err, client, done) => {
    //     if (err) throw err
    //     client.query('SELECT * FROM public.courses ORDER BY name ASC ', (err, res) => {
    //       done()
    //       if (err) {
    //         console.log(err.stack)
    //       } else {
    //         console.log(res.rows)
    //       }
    //     })
    //   })

sequelize.authenticate().then(sucess=>{
  console.log("connected to database sucessfully");
}).catch(err=>{
  console.log(err);
});
 


   
module.exports=sequelize;
