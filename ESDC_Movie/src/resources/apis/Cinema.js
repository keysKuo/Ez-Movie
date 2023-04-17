const { Cinema } = require('../models');

const api = {
    create: async (payloads) => {
        return await new Cinema(payloads).save();
    },

    update: async (id, data) => {
        return await Cinema.findByIdAndUpdate(id, { $set: data });
    },

    delete: async (id) => {
        return await Cinema.findByIdAndDelete(id);
    },

    readOne: async (payloads, options) => {
        let select = (options) ? options.select : {};
        return await Cinema.findOne(payloads)
            .select(select)
            .lean();
    },

    readMany: async (payloads, options) => {
        let skip = (options) ? options.skip : 0;
        let limit = (options) ? options.limit : 0;
        let select = (options) ? options.select : {};
        return await Cinema.find(payloads)
            .select(select)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
    }
}

module.exports = api;

