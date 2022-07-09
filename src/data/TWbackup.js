const {
  Producer,
  Category,
  Location,
  Company,
  Users,
  Manager,
} = require("../db");

const Pe = function () {
  Category.create({
    name: "PERSONAL AUTO ",
  });
  Category.create({
    name: "HOMEOWNERS",
  });
  Category.create({
    name: "GENERAL LIABILITY",
  });
  Category.create({
    name: "MOTORCYCLE",
  });
  Category.create({
    name: "BOATS/JETSKIES",
  });
  Category.create({
    name: "COMMERCIAL AUTO",
  });
  Category.create({
    name: "HEALTH INSURANCE",
  });
  Category.create({
    name: "NON OWNERS",
  });
  Category.create({
    name: "RENTERS",
  });


  Location.create({
    name: "Trueway 1",
    email: "customerservice@truewayins.com",
    TEL: null,
    address: "3095 s military trail ste 12 ",
  }),
    Location.create({
      name: "Trueway 2 ",
      email: "customerservice@truewayins.com",
      TEL: null,
      address: "3751 s congress ave ",
    });

  Company.create({
    name: "PROGRESSIVE PERSONAL AUTO",
    email: "LATER@GMAIL.COM",
    phone: "8777762436",
    address: "OTHER",
    createdAt: "2022-04-14T13:59:33.986Z",
    updatedAt: "2022-04-14T13:59:33.986Z",
    CategoryId: 1,
  });

  Company.create({
    name: "GRANADA INSURANCE ",
    email: "LATER@GMAIL.COM",
    phone: "5615555555",
    address: "LATER",
    createdAt: "2022-04-14T14:01:05.415Z",
    updatedAt: "2022-04-14T14:01:05.415Z",
    CategoryId: 3,
  });

  Company.create({
    name: "OCEAN HARBOR",
    email: "LATER@GMAIL.COM",
    phone: "9545872299",
    address: "P.O. Box 452799, Sunrise, FL 33345",
    createdAt: "2022-04-14T14:46:15.812Z",
    updatedAt: "2022-04-14T14:46:15.812Z",
    CategoryId: 1,
  });

  Company.create({
    name: "Bristol West ",
    email: "later@gmail.com",
    phone: "8553197763",
    address: "po box 31029 oh 44131",
    createdAt: "2022-04-15T19:05:42.985Z",
    updatedAt: "2022-04-15T19:05:42.985Z",
    CategoryId: 1,
  });

  Company.create({
    name: "UNITED AUTO INSURANCE ",
    email: "LATER@GMAIL.COM",
    phone: "3059405022",
    address: "LATER ",
    createdAt: "2022-04-15T19:06:37.000Z",
    updatedAt: "2022-04-15T19:06:37.000Z",
    CategoryId: 1,
  });

  Company.create({
    name: "PROGRESSIVE COMMERCIAL AUTO",
    email: "LATER@GMAIL.COM",
    phone: "8777762436",
    address: "LATER",
    createdAt: "2022-04-15T19:07:15.498Z",
    updatedAt: "2022-04-15T19:07:15.498Z",
    CategoryId: 6,
  });

  Company.create({
    name: "CITIZENS HOMEOWNERS ",
    email: "LATER@GMAIL.COM",
    phone: "8886851555",
    address: "LATER",
    createdAt: "2022-04-15T19:09:02.533Z",
    updatedAt: "2022-04-15T19:09:02.533Z",
    CategoryId: 2,
  });

  Company.create({
    name: "NATIONAL GENERAL ",
    email: "LATER@GMAIL.COM",
    phone: "8774683466",
    address: "LATER",
    createdAt: "2022-04-15T19:10:12.256Z",
    updatedAt: "2022-04-15T19:10:12.256Z",
    CategoryId: 1,
  });

  Company.create({
    name: "INFINITY AUTO POLICY ",
    email: "LATER@GMAIL.COM",
    phone: "8007821020",
    address: "3095 S MILITARY TRAIL ",
    createdAt: "2022-04-19T19:24:44.957Z",
    updatedAt: "2022-04-19T19:24:44.957Z",
    CategoryId: 1,
  });

  Users.create({
    name: "Admin",
    UserName: "admin",
    Password: "$2a$12$4cR7yRyBvaCPrUT15prXb.HBWjpTCSqV/6PYni5ru5fOwGJuoV6CG",
    UserRole: "Admin",
    deleted: false,
    createdAt: "2022-04-10T22:50:51.290Z",
    updatedAt: "2022-04-10T22:50:51.290Z",
  });
   Users.create({
    name: "Daniela",
    UserName: "drodriguez@truewayins.com",
    Password: "$2a$12$zfna4P6ogeL.JIRs64MWw.R7IFhk.jcaf5hMAphaphWBKpfHMRinq",
    UserRole: "Manager",
    deleted: false,
    createdAt: "2022-04-14T14:29:06.751Z",
    updatedAt: "2022-04-14T14:32:20.405Z",
  });
 
  Manager.create({
    UserId: 1,
    LocationId: 1,
    name: "Daniela ",
    email: "drodriguez@truewayins.com",
    phone: "5615772396",
        deleted: false,
  });
 



  
};

module.exports = { Pe };
