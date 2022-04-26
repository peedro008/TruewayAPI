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
    name: "MOTORCYCLE ",
  });
  Category.create({
    name: "BOATS/JETSKIES ",
  });
  Category.create({
    name: "COMMERCIAL AUTO",
  });
  Category.create({
    name: "HEALTH INSURANCE ",
  });
  Category.create({
    name: "NON OWNERS ",
  });

  Location.create({
    name: "TRUEWAY 1",
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
    name: "Antuanet Cruz",
    UserName: "antuanet@truewayins.com",
    Password: "$2a$12$jrlVckd2KptH3vK98CCyWueeEkSonQR8IGLrae.YMLXv6FX60ktGO",
    UserRole: "Producer",
    deleted: false,
    createdAt: "2022-04-13T14:05:39.281Z",
    updatedAt: "2022-04-13T14:05:39.281Z",
  });
  Users.create({
    name: "Rosali Cruz",
    UserName: "rosali@truewayins.com",
    Password: "$2a$12$e9JYY8nSOC2IQMJG0P8yv.so5y51PEluHjNm09PdaKeOlBfkidXVu",
    UserRole: "Producer",
    deleted: false,
    createdAt: "2022-04-13T14:06:40.942Z",
    updatedAt: "2022-04-13T14:06:40.942Z",
  });
  Users.create({
    name: "Yaneymi Sotuyo",
    UserName: "yaneymi@truewayins.com",
    Password: "$2a$12$r3Jt/wcz08gAgORzeHwZGuTPMYHpDeJz2ZiWDWI9QCOPd8b4XQwwi",
    UserRole: "Producer",
    deleted: false,
    createdAt: "2022-04-13T14:07:52.856Z",
    updatedAt: "2022-04-13T14:07:52.856Z",
  });
  Users.create({
    name: "Zulien Rabell",
    UserName: "zulien@truewayins.com",
    Password: "$2a$12$Q9/7NbYZ6Uqro0bG85MnfuicTUJs1VgLLfR30SGFdFVmoRdKNsszi",
    UserRole: "Producer",
    deleted: false,
    createdAt: "2022-04-13T14:08:44.361Z",
    updatedAt: "2022-04-13T14:08:44.361Z",
  });
  Users.create({
    name: "Erika Rivas",
    UserName: "erika@truewayins.com",
    Password: "$2a$12$7YfmHQaO1BWtxDebrGQD5OTe4YiwMAgzcy/697Sh12dOg.wYJdGMu",
    UserRole: "Producer",
    deleted: false,
    createdAt: "2022-04-13T14:09:27.091Z",
    updatedAt: "2022-04-13T14:09:27.091Z",
  });
  Users.create({
    name: "Ovi Perez",
    UserName: "ovi@truewayins.com",
    Password: "$2a$12$DZ3lx.eXronlEAE5QPEhj.HbyzEG5ivi2TX44EyVsottwpklP5BNm",
    UserRole: "Producer",
    deleted: false,
    createdAt: "2022-04-13T14:10:52.995Z",
    updatedAt: "2022-04-13T14:10:52.995Z",
  });
  Users.create({
    name: "Dayana Olivera",
    UserName: "dayana@truewayins.com",
    Password: "$2a$12$iZPOEaa3nL/kq.Qojrgfx.C4lIDu1x5v48pcgZ18sBSCW9fVeNDb2",
    UserRole: "Manager",
    deleted: false,
    createdAt: "2022-04-13T14:12:58.308Z",
    updatedAt: "2022-04-14T14:03:12.272Z",
  });
  Users.create({
    name: "Daniela ",
    UserName: "drodriguez@truewayins.com",
    Password: "$2a$12$zfna4P6ogeL.JIRs64MWw.R7IFhk.jcaf5hMAphaphWBKpfHMRinq",
    UserRole: "Manager",
    deleted: false,
    createdAt: "2022-04-14T14:29:06.751Z",
    updatedAt: "2022-04-14T14:32:20.405Z",
  });
  Manager.create({
    UserId: 8,
    LocationId: 2,
    name: "Dayana Olivera",
    email: "dayana@truewayins.com",
    phone: "5612236595",
    address: "3751 s congress ave ",
  });
  Manager.create({
    UserId: 9,
    LocationId: 1,
    name: "Daniela ",
    email: "drodriguez@truewayins.com",
    phone: "5615772396",
    address: "3095 S Military Trail Suit 12 Lake Worth fl 33463",
  });
  Producer.create({
    
    UserId: 2,
    LocationId: 2,
    name: "Antuanet Cruz",
    email: "antuanet@truewayins.com",
    phone: "5612236595",
    address: "3751 s congress ave ",
    updatedAt: "2022-04-13T14:05:39.286Z",
    
    },)
   Producer.create( {
    
    UserId: 4,
    LocationId: 2,
    name: "Yaneymi Sotuyo",
    email: "yaneymi@truewayins.com",
    phone: "5612236595",
    address: "3751 s congress ave ",
    updatedAt: "2022-04-13T14:07:52.860Z",
    
    },)
   Producer.create( {
    
    UserId: 5,
    LocationId: 1,
    name: "Zulien Rabell",
    email: "zulien@truewayins.com",
    phone: "5613185540",
    address: "3095 s military ste 12",
    updatedAt: "2022-04-13T14:08:44.364Z",
    
    },)
   Producer.create( {
    
    UserId: 6,
    LocationId: 1,
    name: "Erika Rivas",
    email: "erika@truewayins.com",
    phone: "5613185540",
    address: "3095 s military trail ste 12 ",
    updatedAt: "2022-04-13T14:09:27.094Z",
    
    },)
   Producer.create( {
    
    UserId: 7,
    LocationId: 2,
    name: "Ovi Perez",
    email: "ovi@truewayins.com",
    phone: "5612236595",
    address: "3751 s congress ave",
    updatedAt: "2022-04-13T14:10:52.998Z",
    
    },)
   Producer.create( {
    
    UserId: 9,
    LocationId: 1,
    name: "Daniela ",
    email: "drodriguez@truewayins.com",
    phone: "5615772396",
    address: "3095 S Military Trail Suit 12 Lake Worth fl 33463",
    updatedAt: "2022-04-14T14:30:25.385Z",
    
    })
};

module.exports = { Pe };
