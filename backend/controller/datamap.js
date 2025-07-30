const data = require("../model/status");
const locke = require("../model/coord1");

const statue = async (req, res) => {
    try {
        // Fetch all documents from the data model
        const statusData = await data.find({});
        
        // If no data found, return empty result
        if (!statusData || statusData.length === 0) {
            return res.status(200).json({
                message: "exists",
                data: []
            });
        }

        // Extract locations from statusData
        const locations = statusData.map((it) => it.location);

        // Find matching locations in locke model
        const lockeData = await locke.find({ location: { $in: locations } }).lean();

        // Combine data: match statusData with lockeData
        const result = statusData
            .map(statusItem => {
                const lockeItem = lockeData.find(locke => locke.location === statusItem.location);
                if (lockeItem) {
                    return {
                        location: statusItem.location,
                        status: statusItem.status,
                        coordinates: lockeItem.coordinates
                    };
                }
                return null;
            })
            .filter(item => item !== null); // Remove unmatched entries

        return res.status(200).json({
            message: "exists",
            data: result
        });
    } catch (error) {
        console.error("Error in statue:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { statue };