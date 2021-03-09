const slotConfig = require("../config/slotMachine");
const Wallet = require("../models/wallet.model");

module.exports = {
  //Make pull
  pull(req, res) {
    Wallet.findOne({
      where: {
        id: req.user.user.wallet.id,
      },
    }).then((wallet) => {
      if (wallet.coins > 0) {
        //Subtract one coin for the pull
        wallet.coins--;
  
        let { reel1, reel2, reel3 } = slotConfig.reels;
        let coins = 0;

        reel1 = getRandom(reel1);
        reel2 = getRandom(reel2);
        reel3 = getRandom(reel3);
        if (reel1 === reel2 && reel1 === reel3) {
          coins = slotConfig.rewards.triple[reel1];
          wallet.coins = wallet.coins + coins;
        } else if (reel1 === reel2 || reel2 === reel3) {
          coins = slotConfig.rewards.double[reel2];
          wallet.coins = wallet.coins + coins;
        }

        Wallet.update({
            coins: wallet.coins,
          },{
            where: { id: wallet.id },
          }
        );

        if (coins > 0) {
          res.json({
            msg: `You win ${coins} coins`,
          });
        } else {
          res.json({
            msg: "Try again",
          });
        }
      } else {
        res.json({
          msg: "You don't have coins",
        });
      }
    });
  },
};

const getRandom = (reel) => {
  const random = Math.floor(Math.random() * reel.length);
  return reel[random];
};
