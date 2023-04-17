const { Seat } = require('../models');

const api = {
    create: async (payloads) => {
        return await new Seat(payloads).save();
    },

    update: async (id, data) => {
        return await Seat.findByIdAndUpdate(id, { $set: data });
    },

    delete: async (id) => {
        return await Seat.findByIdAndDelete(id);
    },

    readOne: async (payloads, options) => {
        let select = (options) ? options.select : {};
        return await Seat.findOne(payloads)
            .select(select)
            .populate({path: 'show'})
            .lean();
    },

    readMany: async (payloads, options) => {
        let skip = (options) ? options.skip : 0;
        let limit = (options) ? options.limit : 0;
        let select = (options) ? options.select : {};
        return await Seat.find(payloads)
            .select(select)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate({path: 'show'})
            .lean();
    }
}

module.exports = api;

