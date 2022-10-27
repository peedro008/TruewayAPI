const { Company, Producer, Users, Dealer, Manager, DealerSalePerson } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Main} =require("../../sendEmail")


const killDealer = async (req,res)=>{
  try{
   Dealer.destroy({
     where: {},
     truncate: false
   })
   res.status(200).send("Done ");}
  catch (e) {
   console.log("Error in addCompany controller " + e);
   res.status(400).send("Error in addCompany controller ");
 }
 }
 
const sendMail = async (req, res) => {
  let email = req.body.email;
  try {
    Main( email)
    res.status(200).send("email sended");
  } catch (e) {
    console.log("Error in addCompany controller " + e);
    res.status(400).send("Error in addCompany controller ");
  }
};

const addCompany = async (req, res) => {
  let name = req.body.name;
  let CategoryId = req.body.CategoryId;
  try {
    Company.create({
      name: name,
      CategoryId: CategoryId,
    });
    res.status(200).send("Company Added");
  } catch (e) {
    console.log("Error in addCompany controller " + e);
    res.status(400).send("Error in addCompany controller ");
  }
};
const addDealerSalePerson = async (req, res) => {
  let name = req.body.name;
  let CompanyId = req.body.CompanyId;
  try {
    DealerSalePerson.create({
      name: name,
      CompanyId: CompanyId,
    });
    res.status(200).send("Dealer Added");
  } catch (e) {
    console.log("Error in addCompany controller " + e);
    res.status(400).send("Error in addCompany controller ");
  }
};

const addProducer = async (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let Password = req.body.Password;
  let LocationId = req.body.LocationId;

  // checks if email already exists
  Users.findOne({
    where: {
      UserName: email,
    },
  })
    .then((dbUser) => {
      if (dbUser) {
        return res.status(409).json({ message: "email already exists" });
      } else if (req.body.email && req.body.Password) {
        // password hash
        bcrypt.hash(req.body.Password, 12, (err, passwordHash) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "couldnt hash the password" });
          } else if (passwordHash) {
            let userBd = Users.create({
              name: name,
              UserName: email,
              Password: passwordHash,
              UserRole: "Producer",
            })
              .then((Users) =>
                Producer.create({
                  name: name,
                  email: email,
                  phone: phone,
                  LocationId: LocationId,
                  UserId: Users.id,
                })
              )

              .then(() => {
                res.status(200).json({ message: "user created" });
              })
              .catch((err) => {
                console.log("Error in signup controllers: " + err);
                res
                  .status(502)
                  .json({ message: "error while creating the user" });
              });
          }
        });
      } else if (!req.body.password) {
        return res.status(400).json({ message: "password not provided" });
      } else if (!req.body.email) {
        return res.status(400).json({ message: "email not provided" });
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const addManager = async (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let Password = req.body.Password;
  let LocationId = req.body.LocationId;
  // checks if email already exists
  Users.findOne({
    where: {
      UserName: req.body.email,
    },
  })
    .then((dbUser) => {
      if (dbUser) {
        return res.status(409).json({ message: "email already exists" });
      } else if (req.body.email && req.body.Password) {
        // password hash
        bcrypt.hash(req.body.Password, 12, (err, passwordHash) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "couldnt hash the password" });
          } else if (passwordHash) {
            let userBd = Users.create({
              name: name,
              UserName: email,
              Password: passwordHash,
              UserRole: "Manager",
            })
              .then((Users) =>
                Manager.create({
                  name: name,
                  email: email,
                  phone: phone,
                  LocationId: LocationId,
                  UserId: Users.id,
                })
              )

              .then(() => {
                res.status(200).json({ message: "user created" });
              })
              .catch((err) => {
                console.log("Error in signup controllers: " + err);
                res
                  .status(502)
                  .json({ message: "error while creating the user" });
              });
          }
        });
      } else if (!req.body.password) {
        return res.status(400).json({ message: "password not provided" });
      } else if (!req.body.email) {
        return res.status(400).json({ message: "email not provided" });
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const getDealerSalePerson = async (req, res) => {
  try {
    let dealer = await DealerSalePerson.findAll({});
    dealer.length
      ? res.status(200).json(dealer)
      : res.status(404).send("no dealers");
  } catch (e) {
    console.log("Error in dealer controller" + e);
  }
};

const deletet = async (req, res) => {
  const UserId = req.body.UserId;

  try {
    Users.destroy({
      where: {
        id: UserId,
      },
    });
  } catch (e) {
    console.log("Error in dealer controller" + e);
  }
};

const modifyProducer = async (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let ProducerId = req.body.ProducerId;
  let LocationId = req.body.LocationId;
  let UserId = req.body.UserId;
  let Password = req.body.Password;

  console.log(UserId);
  if (!Password) {
    const user = Users.update(
      {
        name: name,
        UserName: email,
      },
      {
        where: { id: req.body.UserId },
      }
    ).then(() => {
      Producer.update(
        {
          UserId: UserId,
          LocationId: LocationId,
          name: name,
          email: email,
          phone: phone,
        },
        {
          where: { id: ProducerId },
        }
      );
    });
    console.log(user);

    res.status(200).send("ASDSAdasd");
  } else {
    bcrypt.hash(req.body.Password, 12, (err, passwordHash) => {
      if (err) {
        return res.status(500).json({ message: "couldnt hash the password" });
      } else if (passwordHash) {
        console.log(passwordHash);
        const user = Users.update(
          {
            name: name,
            UserName: email,
            Password: passwordHash,
          },
          {
            where: { id: UserId },
          }
        ).then(() => {
          Producer.update(
            {
              UserId: UserId,
              LocationId: LocationId,
              name: name,
              email: email,
              phone: phone,
            },
            {
              where: { id: ProducerId },
            }
          );
        });
        user.length
          ? res.status(200).json(user)
          : res.status(404).send("no dealers");
      }
    });
  }
};

const modifyManager = async (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let ManagerId = req.body.ProducerId;
  let LocationId = req.body.LocationId;
  let UserId = req.body.UserId;
  let Password = req.body.Password;

  console.log(UserId);
  if (!Password) {
    const user = Users.update(
      {
        name: name,
        UserName: email,
      },
      {
        where: { id: req.body.UserId },
      }
    ).then(() => {
      Manager.update(
        {
          UserId: UserId,
          LocationId: LocationId,
          name: name,
          email: email,
          phone: phone,
        },
        {
          where: { id: ManagerId },
        }
      );
    });
    console.log(user);

    res.status(200).send("ASDSAdasd");
  } else {
    bcrypt.hash(req.body.Password, 12, (err, passwordHash) => {
      if (err) {
        return res.status(500).json({ message: "couldnt hash the password" });
      } else if (passwordHash) {
        console.log(passwordHash);
        const user = Users.update(
          {
            name: name,
            UserName: email,
            Password: passwordHash,
          },
          {
            where: { id: UserId },
          }
        ).then(() => {
          Manager.update(
            {
              UserId: UserId,
              LocationId: LocationId,
              name: name,
              email: email,
              phone: phone,
            },
            {
              where: { id: ManagerId },
            }
          );
        });
        user.length
          ? res.status(200).json(user)
          : res.status(404).send("no dealers");
      }
    });
  }
};
const deleteManager = async (req, res) => {
  let ManagerId = req.body.ManagerId;
  try {
    const deleted = await Manager.update(
      { deleted: true },
      { where: { id: ManagerId } }
    );
    res.status(200).json(deleted);
  } catch (e) {
    console.log("Error in deleteProducer controller" + e);
  }
};
const deleteUser = async (req, res) => {
  let Id = req.body.UserId;
  try {
    const deleted = await Users.update(
      { deleted: true },
      { where: { id: Id } }
    );
    res.status(200).json(deleted);
  } catch (e) {
    console.log("Error in deleteProducer controller" + e);
  }
};
const undeleteManager = async (req, res) => {
  let ManagerId = req.body.ManagerId;
  try {
    const deleted = await Manager.update(
      { deleted: false },
      { where: { id: ManagerId } }
    );
    res.status(200).json(deleted);
  } catch (e) {
    console.log("Error in deletePayment controller" + e);
  }
};

const getDeletedProducer = async (req, res) => {
  try {
    const Producers = await Producer.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      where: { deleted: true },
    });
    Producers.length
      ? res.status(200).json(Producers)
      : res.status(404).send("no Clients");
  } catch (e) {
    console.log("Error in Clients controller" + e);
  }
};

const getDeletedManager = async (req, res) => {
  try {
    const Managers = await Manager.findAll({
      attributes: { exclude: ["createdAt", "modifiedAt"] },
      where: { deleted: true },
    });
    Managers.length
      ? res.status(200).json(Managers)
      : res.status(404).send("no Clients");
  } catch (e) {
    console.log("Error in Clients controller" + e);
  }
};

module.exports = {
  undeleteManager,
  deleteManager,
  deleteUser,
  addCompany,
  addProducer,
  addDealerSalePerson,
  getDealerSalePerson,
  addManager,
  modifyProducer,
  modifyManager,
  deletet,
  getDeletedProducer,
  getDeletedManager,
  sendMail,
  killDealer,

};
