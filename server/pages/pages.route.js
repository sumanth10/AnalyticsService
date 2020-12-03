const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../../config/param-validation");
const pageCtrl = require("./pages.controller");
const validateToken = require('../helpers/validateToken');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")

   /** GET /api/pages - Get page list*/
  .get(validateToken,pageCtrl.list)

  /** POST /api/pages - Create new page view */
  .post(validateToken,validate(paramValidation.createPages), pageCtrl.create);

router
  .route("/:pageID")
  /** GET /api/pages/:pageId - Get page views */
  .get(validateToken,validate(paramValidation.getPageViewByID),pageCtrl.load);

router
  .route("/:pageID/country")
  /** GET /api/pages/:pageId/country - Get page view by countries */
  .get(validateToken,validate(paramValidation.getPageViewByID),pageCtrl.getByCountries);

router
  .route("/:pageID/country/:countryID")
  /** GET /api/pages/:pageId/country/:countryID - Get page view by countryID */
  .get(validateToken,validate(paramValidation.getByCountryID),pageCtrl.getByCountryID);

router
  .route("/:pageID/browser/:browserID")
  /** GET /api/pages/:pageId/:browserID - Get page view by browser */
  .get(validateToken,validate(paramValidation.getByBrowser),pageCtrl.getByBrowser);

router
  .route("/:pageID/activity")
  /** GET /api/pages/:pageId/activity - Getpage activity for a time */
  .get(validateToken,validate(paramValidation.getActivity),pageCtrl.getByActivity);

  router
  .route("/:pageID/activity/rate")
  /** GET /api/pages/:pageId/activity/rate - Getpage activity for a time */
  .get(validateToken,validate(paramValidation.getActivity),pageCtrl.getActivityRate);



module.exports = router;
