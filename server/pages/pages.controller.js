const Page = require("./pages.model");

/**
 * Get pages
 * @returns {Pages.length}
 */
function load(req, res, next) {
  Page.getPageDetails(req.params.pageID)
    .then((pages) => {
      req.pages = pages; // eslint-disable-line no-param-reassign
      return res.json({  pages });
    })
    .catch((e) => next(e));
}

/**
 * Create new user
 * @property {string} req.body.pageID - The pageID of the page.
 * @property {string} req.body.countryID - The country from where the page is accessed from.
 * @property {string} req.body.browserID - The browser from where the page is accessed from.
 * @property {string} req.body.userID - The userID of the user who accessed the page.
 * @returns {Pages}
 */
function create(req, res, next) {
  const page = new Page({
    pageID: req.body.pageID,
    countryID: req.body.countryID,
    browserID: req.body.browserID,
    userID: req.body.userID,
    pageName: req.body.pageName,
    createdAt: new Date().toISOString()
  });

  page
    .save()
    .then((savedPage) => res.json(savedPage))
    .catch((e) => next(e));
}

/**
 * Get page views by countries
 * @returns {Pages}
 */
function getByCountries(req, res, next) {
  const countryID = req.params.countryID;
  const pageID = req.params.pageID;
  Page.getPageByCountries(pageID, countryID)
    .then((savedPages) => res.json(savedPages))
    .catch((e) => next(e));
}

/**
 * Get page views by countryID
 * @property {String} req.params.countryID - Country ID to be searched for page
 * @property {String} req.params.pageID - pageId to be searched for page
 * @returns {Pages}
 */
function getByCountryID(req, res, next) {
  const countryID = req.params.countryID;
  const pageID = req.params.pageID;
  Page.getPageByCountry(pageID, countryID)
    .then((savedPages) => res.json({ viewcount: savedPages.length }))
    .catch((e) => next(e));
}

/**
 * Get page views by BrowserID
 * @property {String} req.params.browserID - browserID  to be searched for page
 * @property {String} req.params.pageID - pageId to be searched for page
 * @returns {Pages}
 */
function getByBrowser(req, res, next) {
  const browserID = req.params.browserID;
  const pageID = req.params.pageID;
  Page.getPageByBrowsers(pageID, browserID)
    .then((savedPages) => res.json({ viewcount: savedPages.length }))
    .catch((e) => next(e));
}

/**
 * Get page activity for mentioned time period
 * @property {String} req.query.starttime - start time of the activity for a page.
 * @property {String} req.query.endtime - end time of the activity for a page.
 * @property {String} req.params.pageID - pageId to be searched for page
 * @returns {Pages}
 */

function getByActivity(req, res, next) {
  let { starttime, endtime } = req.query;

  const pageID = req.params.pageID;
  starttime = getDateFormat(starttime);
  endtime = getDateFormat(endtime);

  Page.getPageActivity(pageID, starttime, endtime)
    .then((savedPages) => res.json({ viewcount: savedPages.length }))
    .catch((e) => next(e));
}

const getDateFormat = (time) => {
  return new Date(time).toISOString();
};

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Pages[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Page.list({ limit, skip })
    .then((pages) => res.json(pages))
    .catch((e) => next(e));
}

/**
 * Get returning user rate
 * @property {String} req.query.starttime - start time of the activity for a page.
 * @property {String} req.query.endtime - end time of the activity for a page.
 * @property {String} req.params.pageID - pageId to be searched for page
 * @property {String} req.params.userID - userID to be searched for page
 * @returns {Rate}
 */

async function getActivityRate(req, res, next) {
  let { starttime, endtime } = req.query;

  const pageID = req.params.pageID;
  let {total,returningUserCount} = 0;
  starttime = getDateFormat(starttime);
  endtime = getDateFormat(endtime);

  await Page.getPageDetails(pageID)
  .then((pages) => {
    total = pages.length;
  })
  .catch((e) => next(e));

  await Page.getUserDetails(pageID, starttime, endtime)
    .then((savedPages) => returningUserCount = savedPages.length)
    .catch((e) => next(e));

  let rate = getRate(total,returningUserCount);
  res.json({rate})
}

function getRate(total,returningUserCount){
    return ((returningUserCount/total) * 100).toFixed(1);
}

module.exports = {
  load,
  getByCountries,
  getByCountryID,
  getByBrowser,
  list,
  create,
  getByActivity,
  getActivityRate
};
