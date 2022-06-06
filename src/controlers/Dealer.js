

const { Dealer, DealerSalePerson,Client } = require("../db");
const Sequelize = require('sequelize');

const addDealer = async (req, res) => {
  let DealerSalePersonId = req.body.DealerSalePersonId;
  let ClientId = req.body.ClientId;
  let amount = req.body.amount;
  let paid = req.body.paid;

  try {
    const NewDealer = await Dealer.create({
      ClientId: ClientId,
      DealerSalePersonId: DealerSalePersonId,
      amount: amount,
      paid: paid,
      datePaid: paid? undefined : null,
    });
    res.status(200).json(Dealer);
  } catch (e) {
    console.log("Error in addClient controller" + e);
  }
};
const paidDealer = async (req, res) => {
    const id = req.body.id
    try {
      const NewDealer = await Dealer.update({
        paid: true,
        datePaid: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        where: {
          id: id,
        },
      });
      res.status(200).json(NewDealer);
    } catch (e) {
      console.log("Error in PaidDealer controller" + e);
    }
  };

  const getDealers = async (req, res) => {
    try {
      let Dealers = await Dealer.findAll({
        attributes: { exclude: ["modifiedAt"] },
        include: [
          { model: Client },
          { model: DealerSalePerson },
        ],
  
    });
  
      Dealers.length
        ? res.status(200).json(Dealers)
        : res.status(404).send("no No Dealers");
    } catch (e) {
      console.log("Error in getDealers controller" + e);
    }
  };
  
module.exports = { addDealer, paidDealer, getDealers };
