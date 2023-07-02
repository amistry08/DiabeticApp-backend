const express = require("express");
const router = express.Router();
const dataController = require("../controller/userCarbsDataController");

router.post("/submitData", dataController.storeUserData); // Use to Submit Data

router.get(
  "/getDataByMealType/Date",
  dataController.getDataByFoodType_Uid_Date //This is used when user Clicks on BF which has already been submitted(Current Date)
);
router.get("/getDataByDate", dataController.getUserDataByDate); //Will be Used in History Need to Give Specific Date(DD/MM/YYY) to Get Data

router.put("/updateByIdAndFoodType", dataController.updateByIdAndFoodType); //Update Current Day Meal

module.exports = router;
