const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

/**
 * Pages Schema
 */
const PageSchema = new mongoose.Schema({
  pageID: {
    type: String,
    required: true,
  },
  pageName: {
    type: String,
    required: true,
  },
  countryID: {
    type: String,
    required: true,
  },
  browserID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Statics
 */
PageSchema.statics = {
  /**
   * Get page by id
   * @param {String} pageID - The pageID of page.
   * @returns {Promise<Pages, APIError>}
   */
  getPageDetails(pageID) {
    return this.find({ pageID })
      .exec()
      .then((pages) => {
        if (pages) {
          return pages;
        }
        const err = new APIError("No such page exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get page by id
   * @param {ObjectId} pageID - The pageID of page.
   * @param {String} countryID - The countryID.
   * @returns {Promise<Pages, APIError>}
   */
  getPageByCountry(pageID, countryID) {
    return this.find({ pageID })
      .where("countryID")
      .eq(countryID)
      .exec()
      .then((pages) => {
        if (pages) {
          return pages;
        }
        const err = new APIError("No such page exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get page by countries
   * @param {ObjectId} pageID - The pageID of page.
   * @returns {Promise<Pages, APIError>}
   */
  getPageByCountries(pageID) {
    return this.aggregate([
      { $match: { pageID } },
      { $group: { _id: "$countryID", value: { $sum: 1 } } },
    ])
      .exec()
      .then((pages) => {
        if (pages) {
          return pages;
        }
        const err = new APIError("No such page exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get page by countries
   * @param {ObjectId} pageID - The pageID of page.
   * * @param {String} browserID - The browserID.
   * @returns {Promise<Pages, APIError>}
   */
  getPageByBrowsers(pageID, browserID) {
    return this.find({ pageID })
      .where("browserID")
      .eq(browserID)
      .exec()
      .then((pages) => {
        if (pages) {
          return pages;
        }
        const err = new APIError("No such page exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get page by countries
   * @param {ObjectId} pageID - The pageID of page.
   * @param {ISODate} startTime - The Start time.
   * @param {ISODate} endTime - The End time.
   * @returns {Promise<Pages, APIError>}
   */
  getPageActivity(pageID, startTime, endTime) {
    return this.find({ pageID })
      .where("createdAt")
      .gt(startTime)
      .lt(endTime)
      .exec()
      .then((pages) => {
        if (pages) {
          return pages;
        }
        const err = new APIError("No such page exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get page by countries
   * @param {ObjectId} pageID - The pageID of page.
   * @param {ISODate} startTime - The Start time.
   * @param {ISODate} endTime - The End time.
   * @param {ISODate} userID - The End time.
   * @returns {Promise<Pages, APIError>}
   */
  getUserDetails(pageID, startTime, endTime) {
    return this.aggregate([
      {
        $match: {
          $and: [
            { pageID },
            {
              createdAt: { $gte: new Date(startTime), $lte: new Date(endTime) },
            },
          ],
        },
      },
      
      { $group: { _id: "$userID", count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
    ])
      .exec()
      .then((pages) => {
        if (pages) {
          return pages;
        }
        const err = new APIError("No such page exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List pages in descending order of 'createdAt' timestamp.
   * @returns {Promise<Pages[]>}
   */
  list() {
    return this.aggregate([
   { $group : {
        "_id": "$pageID",
        "pageName" : {"$addToSet":"$pageName"}
        
    }}])
      .exec();
  }
};

/**
 * @typedef Pages
 */
module.exports = mongoose.model("Pages", PageSchema);
