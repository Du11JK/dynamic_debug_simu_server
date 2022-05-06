const { info } = require("console");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET options */
router.get("/options", function (req, res, next) {
  var fs = require("fs");
  let info_file = fs.readFileSync("./public/samples/sample_index.json");
  let info_data = JSON.parse(info_file);
  res.json(info_data);
});

/* return simudata */
function return_data(sample_name, step_index, api) {
  var fs = require("fs");
  let info_file = fs.readFileSync(
    "./public/samples/" + sample_name + "/sample_info.json"
  );
  let info_data = JSON.parse(info_file);
  let rdata = "";
  if (info.name == "test" || info.step == 0) {
    rdata = "案例没有加载";
  } else if (step_index > info_data.step) {
    rdata = "案例已经结束";
  } else {
    file_path =
      "./public/samples/" +
      sample_name +
      "/step" +
      step_index +
      api +
      ".simudata";
    rdata = fs.readFileSync(file_path).toString();
  }
  return rdata;
}
// ASM
router.get("/asm", function (req, res, next) {
  sample_name = req.query.sample_name;
  step_index = req.query.step_index;
  let rdata = return_data(sample_name, step_index, "/asm");
  res.end(rdata);
});

// REG
router.get("/reg", function (req, res, next) {
  sample_name = req.query.sample_name;
  step_index = req.query.step_index;
  let rdata = return_data(sample_name, step_index, "/reg");
  res.end(rdata);
});

// STACK
router.get("/stack", function (req, res, next) {
  sample_name = req.query.sample_name;
  step_index = req.query.step_index;
  let rdata = return_data(sample_name, step_index, "/stack");
  res.end(rdata);
});

// NETWORK
router.get("/network", function (req, res, next) {
  sample_name = req.query.sample_name;
  step_index = req.query.step_index;
  let rdata = return_data(sample_name, step_index, "/network");
  res.end(rdata);
});

// Notes
router.get("/notes", function (req, res, next) {
  sample_name = req.query.sample_name;
  step_index = req.query.step_index;
  var fs = require("fs");
  let info_file = fs.readFileSync(
    "./public/samples/" + sample_name + "/sample_info.json"
  );
  let info_data = JSON.parse(info_file);
  let rdata = "";
  if (info.name == "test" || info.step == 0) {
    rdata = "案例没有加载";
  } else if (step_index > info_data.step) {
    rdata = "案例已经结束";
  } else {
    file_path =
      "./public/samples/" + sample_name + "/step" + step_index + "/notes.txt";
    rdata = fs.readFileSync(file_path).toString();
  }
  res.end(rdata);
});

/* static */

// static info
router.get("/static", function (req, res, next) {
  sample_name = req.query.sample_name;
  var fs = require("fs");
  let json_data = fs.readFileSync(
    "./public/samples/" + sample_name + "/static.json"
  );
  res.end(json_data);
});

// CSV api
function return_csv(sample_name, api) {
  var fs = require("fs");
  let info_file = fs.readFileSync(
    "./public/samples/" + sample_name + api + ".csv"
  );
  return info_file;
}
// SYMBOLS
router.get("/symbols", function (req, res, next) {
  sample_name = req.query.sample_name;
  let rdata = return_csv(sample_name, "/symbols");
  res.end(rdata);
});
// MEM MAP
router.get("/memmap", function (req, res, next) {
  sample_name = req.query.sample_name;
  let rdata = return_csv(sample_name, "/memmap");
  res.end(rdata);
});

module.exports = router;
