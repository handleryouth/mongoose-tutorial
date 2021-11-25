const mongoose = require("mongoose");
const User = require("./user");

//how to connect to mongoDB
mongoose.connect(
  "mongodb://localhost/testdb",
  () => {
    console.log("Connected to MongoDB");
  },
  (e) => console.log(e)
);

/*
main concept of mongoDb

-schema
schema is just defines what the structure of your data looks like
e.x : 
user schema = name, email ,age:

-models 
model is like an individual user object from the database that we can interact with

-query
just a query you're making against the mongoDB database


the important is schema
usually schema has its different files

*/

//creating data

run();

async function run() {
  //   const user = new User({ name: "Kyle", age: 26 });
  //   user.save().then(() => console.log("User saved"));
  //   console.log(user);

  //another way to create data
  //   const user = await User.create({
  //     name: "Kyle",
  //     age: 26,
  //     hobbies: ["weight ligting", "bowling"],
  //     address: {
  //       street: "Main St",
  //     },
  //   });

  //how to change the data
  //   user.name = "Kyle2";
  //   await user.save();
  //   console.log(user);

  //you can use try catch to cacthing an error if you want
  // like typescript
  try {
    //if you want to use validation, donot use the findbyidandupdate or others just use findbyid without update etc

    const user = await User.create({
      name: "Kyle",
      age: 26,
      hobbies: ["weight ligting", "bowling"],
      address: {
        street: "Main St",
      },
      email: "test@test.com",
    });

    //how to find user by id
    // const user = await User.findById("5e9f9f9f9f9f9f9f9f9f9f9");

    //how to delete user
    // await user.deleteOne({name: ""Kyle}) = delete the first thing the the code found
    // await user.deleteMany({name: ""Kyle}) = delete the all things the the code found / matched

    //all the command is like mongoDb commands

    //use of query
    // const user = await User.where("name").equals("Kyle")});
    //selects means just get certain things
    // const user = await User.where("age").gt(12).lt(31).where("name").equals("Kyle").limit(2).select("age")});

    //populate (this is a query)
    //populate allows you to do the join
    // populate is like saying for all the best friends ids inside of this model and all the other models, go and find that object and put all the data for it inside of this best friend section
    //const user = await User.where("age").gt(12).where("name").equals("Kyle").populate("bestFriend").limit(1)});

    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}
