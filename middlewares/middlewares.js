const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({ path: "../.env" });

const middlewares={
    roleAuthentication: function (role){

        return (req,res,next)=>{
            try{
                console.log("-------------------------------------")
                if(req.user.role===role)
                    res.status(200).send("You have access");

                next();

            }catch (e) {
                res.status(403).send(e);
            }
        };

        },

    tokenAuthentication: function (req,res,next){

        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {

                if (err) return res.sendStatus(403)

                req.user = user
                next();
            });

        } catch (error) {
            // Access Denied
            return res.status(401).send(error);
        }

    }
}


module.exports=middlewares;