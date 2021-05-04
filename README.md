### 1. A version for build, **server side**.
### 2. Working with BossRecruit master branch. Test on same machine, so
### 3. With CORS enabled (on server side).
    const cors = require('cors')    
    app.use(cors({
        origin: 'http://localhost:5000',
    }));
### 4. port: "4000"
### 5. enable cookies after using CORS.
    app.use(cors({
        credentials: true, 
    }));

### enable mongoDB server
    mongod
### run by
    npm start