const sequelize = require("../config/database");
const { Sequelize , DataTypes, Model } = require('sequelize');
  



const Subject = sequelize.define('Subject', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true,
        notNull:true
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true,
        notNull:true
      }
    },
  
  

   
   
  }, {
    // Other model options go here
   
  });

 



  
    
     
      
  // `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true

module.exports=Subject;