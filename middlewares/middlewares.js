const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({ path: "../.env" });

const middlewares={
    roleAuthentication: function (role){

        return (req,res,next)=>{

            try {

                if(req.user.user.role===role)
                    return res.status(200).send("You have access");

                   next();

                return res.status(401).send({message:"No Permission to access"})

            }catch (e) {
                return res.status(403).send(e);
            }



        };

        },

    tokenAuthentication: function (req,res,next){

        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {

                if (err) return res.status(403).send({message:"Invalid Token"})

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