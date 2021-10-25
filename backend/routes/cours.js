const router = require("express").Router();
const auth = require("../middlewares/auth");
const Cours = require("../Modele/Cours.model");


router.get("/all", async (req, res) => {
    const cours = await Cours.find({});
    res.json({cours});
});

router.get("/", async (req, res) => {
    const cours = await Cours.findOne( req.query );
    res.json({cours});
});

router.post("/insert", async (req,res)=>{
    const nomCours = req.body.nomCours;
    const description = req.body.description;
    const duree = req.body.duree;
    const cours = new Cours({nomCours : nomCours,description : description ,duree : duree });
    try{
        await cours.save();
        res.send("inserted data");
    }catch(err){
        console.log(err);
    }
})


  module.exports = router;