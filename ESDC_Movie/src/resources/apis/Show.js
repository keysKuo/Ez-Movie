const { Show } = require('../models');

const api = {
    create: async (payloads) => {
        return await new Show(payloads).save();
    },

    update: async (id, data) => {
        return await Show.findByIdAndUpdate(id, { $set: data });
    },

    delete: async (id) => {
        return await Show.findByIdAndDelete(id);
    },

    readOne: async (payloads, options) => {
        let select = (options) ? options.select : {};
        return await Show.findOne(payloads)
            .select(select)
            .populate({ path: 'movie cinema' }).lean();
    },

    readMany: async (payloads, options) => {
        let skip = (options) ? options.skip : 0;
        let limit = (options) ? options.limit : 0;
        let select = (options) ? options.select : {};
        return await Show.find(payloads)
            .select(select)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate({ path: 'movie cinema' })
            .lean();
    }
}

module.exports = api;

