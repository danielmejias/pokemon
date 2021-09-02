const mongoose = require(`mongoose`);

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Nicolas:OO6KbIsVBfjAmkKt@cluster0.pkuw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log(`2/2: Connected to MongoDB`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = connectDB;
