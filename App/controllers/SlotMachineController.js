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

        //Get random items from reel
        reel1 = getRandom(reel1);
        reel2 = getRandom(reel2);
        reel3 = getRandom(reel3);

        const result = {
          reel1: reel1,
          reel2: reel2,
          reel3: reel3,
        };

        //Calculate reward
        if (reel1 === reel2 && reel1 === reel3) {
          coins = slotConfig.rewards.triple[reel1];
          wallet.coins = wallet.coins + coins;
        } else if (reel1 === reel2 || reel2 === reel3) {
          coins = slotConfig.rewards.double[reel2];
          wallet.coins = wallet.coins + coins;
        }

        result.coinsTotal = wallet.coins;
        result.coins = coins;

        Wallet.update(
          {
            coins: wallet.coins,
          },
          {
            where: { id: wallet.id },
          }
        );

        if (coins > 0) {
          res.json({
            msg: `You win ${coins} coins`,
            result: result,
          });
        } else {
          res.json({
            msg: "Try again",
            result: result,
          });
        }
      } else {
        const result = {
          reel1: "cherry",
          reel2: "cherry",
          reel3: "cherry",
        };
        result.coinsTotal = 0;
        result.coins = 0;
        res.json({
          msg: "You don't have coins",
          result: result,
        });
      }
    });
  },
};


const getRandom = (reel) => {
  const random = Math.floor(Math.random() * reel.length);
  return reel[random];
};
