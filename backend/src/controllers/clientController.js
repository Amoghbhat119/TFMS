const Client = require("../models/Client");


// Create Client
exports.createClient = async (req, res) => {

  try {

    const client = await Client.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      client
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Get All Clients
exports.getClients = async (req, res) => {

  try {

    const clients = await Client.find()
      .populate("createdBy", "name email");

    res.json({
      success: true,
      count: clients.length,
      clients
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Search Clients
exports.searchClients = async (req, res) => {

  try {

    const { q } = req.query;

    const clients = await Client.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { contactPerson: { $regex: q, $options: "i" } }
      ]
    });

    res.json({
      success: true,
      clients
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Update Client
exports.updateClient = async (req, res) => {

  try {

    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      client: updatedClient
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// Delete Client
exports.deleteClient = async (req, res) => {

  try {

    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    await client.deleteOne();

    res.json({
      success: true,
      message: "Client deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};