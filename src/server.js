import app from './app.js';
import connectDB from './configs/db.js';

const PORT = process.env.PORT || 3000;

async function startServer(){
    try{
        await connectDB();

        app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
    } catch(err){
        console.error("Server failed to start: ", err);
    }
};

startServer();