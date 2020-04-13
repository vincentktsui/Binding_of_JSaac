const express = require("express");
const Lobby = require('../../models/Lobby');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const buildLocationJson = require('../../util/room_change_util');


router.patch("/:lobbykey/:characterId/:floor/:room", (req, res) => {
    Lobby.findOneAndUpdate({
        "lobbykey": req.params.lobbykey
    },
    {
        $set: {
            "locations.$[char].floor": req.params.floor,
            "locations.$[char].room": req.params.room
        }
    },
    { 
        new: true,
        useFindAndModify: false,
        arrayFilters: [{ "char.character": new ObjectId(req.params.characterId) }]
    })
    .then(lobby => buildLocationJson(lobby, res))
    .catch(err => { res.status(404), json("Position update failed") })
});


router.patch("/", (req, res) => {
    Object.values(req.body.characters).forEach(updated => {
        User.findOne({ "characters._id": updated._id }).then(user => {
            user.characters.forEach( original => {
                if (original.id === updated._id) {
                    original.level = updated.level;
                    original.currentHP = updated.currentHP; 
                    user.save();
                }
            })
        })
        .catch(err => res.json("Something went wrong updating character stats"))
    })

    Lobby.findOne({ "lobbykey": req.body.lobbykey }).then(lobby => {
        lobby.locations.forEach(location => {
            let id = location.character.toString();
            location.floor = req.body.characters[id].floor;
            location.room = req.body.characters[id].room;
            location.xPos = req.body.characters[id].xPos;
            location.yPos = req.body.characters[id].yPos;
        })

        lobby.save();
    })
    .catch(err => { res.json("Position update failed") })
});

module.exports = router;