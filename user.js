const mongoose = require("mongoose");
//MONGOOSE CANNOT USE ARROW FUNCTION

//the schema contains key and the type of the key value
const userSchema = new mongoose.Schema({
  name: String,

  //if you want to specify the minimum value, you can use the min or the max for the maximum value

  age: {
    type: Number,
    min: 0,
    max: 100,
    //how to add validator to the schema to check the value
    validate: {
      validator: () => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  //if you want to make an object inside the schema, you need to arrange it like below.
  //do not forget to add required: true
  // User validation failed: email: Path `email` is required.
  email: {
    type: String,
    required: true,
    //minlength means the minimum length of the string (email in this case)
    minlength: 10,
    //lowercase or uppercase will be converted to lowercase or uppercase your value
    lowercase: true,
  },
  //immutable means the value cannot be changed
  createdAt: { Date, immutable: true, default: () => Date.now() },

  //for getting the newest date, you can use the following syntax
  updatedAt: { Date, default: () => Date.now() },
  //getting id from a mongodb database
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    //ref is referencing the user model
    //ref tells mongoose what model does this object id reference (in our case, we are referencing the user model)
    ref: "User",
  },
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
});

//advanced things
//you can add a method to the schema
userSchema.methods.sayHi = function () {
  console.log(`Hi, my name is ${this.name}`);
};
//you can call it by sayaing user.sayHi()

//another methods
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};
//you can call it by saying User.findByName("Kyle") -> for example

//after creating the schema, we need to create a model

//know the place for the query ("where, etc")
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

//virtuals
//virtuals are like a property that is not stored in the database/schema
//but it is calculated from other properties
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});
//you can call it by saying user.namedEmail

//middleware
//if you want the middleware to record before the save, you can use the "pre"
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
//the code above means everytime the user is saved, the updatedAt will be updated and continue with the next code
//example user.save() -> if you do this, the updatedAt will be updated

//if you want the middleware to record after the save, you can use the "post"
userSchema.post("save", function (doc, next) {
  //we cannot use "this" here, because it's going to pass to us the document that's been saved
  doc.sayHi();
  next();
});

module.exports = mongoose.model("User", userSchema);
// the code above explain that we've created a brand new model which has the name of User and the schema of userSchema
