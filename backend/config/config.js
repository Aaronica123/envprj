const mongoose =  require('mongoose');
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
module.exports = connect;
//http://localhost:3000/api/nearby?lan=-102.4194&lon=37.7749