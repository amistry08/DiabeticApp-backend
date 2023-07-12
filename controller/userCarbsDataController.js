const userMealSchema = require("../models/userFoodData");
const userMealDateSchema = require("../models/userMealDates");

const storeUserData = (req, res) => {
  const { userId, mealItems, totalCarbs, mealType, insulinDose } = req.body;
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const mealDate = `${day}/${month}/${year}`;

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  console.log("Current Time:", formattedTime);

  userMealDateSchema.findOne({ mealDate: mealDate }).then((existingDate) => {
    if (existingDate) {
      // If mealDate already exists, do not save a new entry
      console.log("MealDate already exists");
      return;
    }

    const newUserMealDateSchema = new userMealDateSchema({
      userId,
      mealDate,
    });

    newUserMealDateSchema.save().then((dateSchema) => {
      // Handle successful save
      console.log("New userMealDateSchema saved ");
    });
  });

  const newUserMealSchema = new userMealSchema({
    userId,
    mealItems,
    totalCarbs,
    mealType,
    mealDate,
    insulinDose,
  });

  newUserMealSchema.save().then((mealSchema) => {
    // Handle successful save
    console.log("New userMealSchema saved");
    res.status(200).send("New userMealSchema saved");
  });
};

const getDataByFoodType_Uid_Date = async (req, res) => {
  try {
    const { userId, mealType } = req.query;
    const currentDate = new Date().toLocaleDateString("en-GB");
    console.log("Find Date :", currentDate);
    const userMeal = await userMealSchema.findOne({
      userId,
      mealType,
      mealDate: { $eq: currentDate },
    });

    if (userMeal) {
      res.status(200).json(userMeal);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    console.error("Error fetching user meal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserAllDates = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("user :", userId);
    const userDates = await userMealDateSchema.find({
      userId,
    });
    if (userDates.length > 0) {
      res.status(200).json(userDates);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    console.error("Error fetching user meal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserDataByDate = async (req, res) => {
  try {
    const { userId, mealDate } = req.query;
    const userMeal = await userMealSchema.find({
      userId,
      mealDate,
    });
    if (userMeal) {
      res.status(200).json(userMeal);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    console.error("Error fetching user meal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateByIdAndFoodType = async (req, res) => {
  try {
    const { userId, mealType, mealItems, totalCarbs } = req.body;

    const currentDate = new Date().toLocaleDateString("en-GB");
    console.log("Find Date to Update :", currentDate);

    const updatedUserMeal = await userMealSchema.findOneAndUpdate(
      { userId, mealType, mealDate: { $eq: currentDate } },
      {
        mealItems,
        totalCarbs,
      },
      { new: true }
    );

    if (updatedUserMeal) {
      res.status(200).json(updatedUserMeal);
    } else {
      res
        .status(404)
        .json({ message: "No user meal found for the given criteria." });
    }
  } catch (error) {
    console.error("Error updating user meal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarbDetailsHomeScreen = async (req, res) => {
  try {
    const { userId } = req.query;
    const currentDate = new Date().toLocaleDateString("en-GB");
    const userMeal = await userMealSchema.find({
      userId,
      mealDate: { $eq: currentDate },
    });
    if (userMeal) {
      res.status(200).json(userMeal);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    console.error("Error fetching user meal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  storeUserData,
  getDataByFoodType_Uid_Date,
  getUserDataByDate,
  getUserAllDates,
  updateByIdAndFoodType,
  getCarbDetailsHomeScreen,
};
