import Service from "../model/service.model.js";

const service = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const data = await Service.create({
      name,
      description,
      price,
    });

    return res.status(201).json({
      data,
      message: "Service created successfully",
    });
  } catch (error) {
    console.error("POST ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getService = async (req, res) => {
  try {
    console.log("GET HIT");

    const result = await Service.find();

    return res.status(200).json({
      result,
      message: "Service fetch successfully",
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

export { service, getService };
