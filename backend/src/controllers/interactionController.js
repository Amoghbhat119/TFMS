const Interaction = require("../models/Interaction");


// Add Interaction
exports.addInteraction = async (req, res) => {

  try {

    const interaction = await Interaction.create({

      applicationId: req.body.applicationId,
      recruiterId: req.user._id,
      interactionType: req.body.interactionType,
      title: req.body.title,
      description: req.body.description,
      nextActionDate: req.body.nextActionDate

    });

    res.status(201).json({
      success: true,
      interaction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Get Interaction History
exports.getInteractions = async (req, res) => {

  try {

    const interactions = await Interaction.find({
      applicationId: req.params.applicationId
    })
      .populate("recruiterId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: interactions.length,
      interactions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Mark Reminder Completed
exports.completeReminder = async (req, res) => {

  try {

    const interaction = await Interaction.findById(req.params.id);

    if (!interaction) {
      return res.status(404).json({
        success: false,
        message: "Interaction not found"
      });
    }

    interaction.reminderCompleted = true;

    await interaction.save();

    res.json({
      success: true,
      interaction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Delete Interaction
exports.deleteInteraction = async (req, res) => {

  try {

    const interaction = await Interaction.findById(req.params.id);

    if (!interaction) {
      return res.status(404).json({
        success: false,
        message: "Interaction not found"
      });
    }

    await interaction.deleteOne();

    res.json({
      success: true,
      message: "Interaction deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};