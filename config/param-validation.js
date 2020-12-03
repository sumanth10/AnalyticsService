const Joi = require("joi");

module.exports = {
  // POST /api/pages
  createPages: {
    body: {
      pageID: Joi.string().required(),
      countryID: Joi.string().required(),
      browserID: Joi.string().required(),
      userID: Joi.string().required(),
      pageName: Joi.string().required(),
    },
  },
  // GET /api/pages/:pageId/country/:countryID
  getByCountryID: {
    params: {
      countryID: Joi.string().required(),
      pageID: Joi.string().required(),
    },
  },
  // GET /api/pages/:pageId/:browserID
  getByBrowser: {
    params: {
      browserID: Joi.string().required(),
      pageID: Joi.string().required(),
    },
  },
  // GET /api/pages/:pageId
  getPageViewByID: {
    params: {
      pageID: Joi.string().required(),
    },
  },

  getActivity: {
    params: {
      pageID: Joi.string().required(),
    },
    query: {
      starttime: Joi.string().isoDate().required(),
      endtime: Joi.string().isoDate().required(),
    },
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
