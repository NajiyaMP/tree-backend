const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // await mongoose.connect('mongodb+srv://ashiquetkorambayil:1W13EhIdOPaxYM1T@cluster0.ofyj5g5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      // await mongoose.connect('mongodb+srv://mpnajiya118:bKdFkCIiKkxpjB2E@emenu.6fvc5f2.mongodb.net/?retryWrites=true&w=majority&appName=Emenu', {
      // await mongoose.connect('mongodb+srv://mpnajiya118:DYTFd5Exq2IlARg4@cluster0.wrsbif4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        await mongoose.connect ('mongodb+srv://mpnajiya118:OnM6BAFNOLarCgNn@tree-test.eimdve4.mongodb.net/?retryWrites=true&w=majority&appName=tree-test',{
    
      });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
