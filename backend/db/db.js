import mongoose from "mongoose";


function connect() {

    mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {  // Use your MongoDB connection URL
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.error('MongoDB connection error:', error));
    
}

export default connect;