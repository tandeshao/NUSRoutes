require("dotenv").config();
const { Composer } = require("micro-bot");
const fetch = require("node-fetch");
const curBusStops = require("./data/curBusStops.json");
const destBusStops = require("./data/destBusStops.json");
const arrBusStops = require("./data/arrBusStops.json");
const busServices = require("./data/busServices.json");
const proxBusStops = require("./data/proxBusStops.json");

const map = require("./data/map.json");
const reverseMap = require("./data/reverseMap.json");
const data = require("./data/vacation.json");

const bot = new Composer();

var current = {};
var destination = {};

async function routeFinder(current, destination, ctx) {
  // Get route
  const start = map[current];
  const end = map[destination];

  try {
    const route = await fetch(
      "https://nusroutesapi.herokuapp.com" +
        "/api/telegramRouteRecommendation?start=" +
        encodeURIComponent(start) +
        "&end=" +
        encodeURIComponent(end)
    ).then((response) => response.json());

    var reply = "";
    if (current == destination) {
      reply =
        "Current location must be different from destination! /routefinder";
      await ctx.reply(reply);
    } else if (route[0].Path.length === 0) {
      reply =
        "No route available. Please select another location. /routefinder";
      await ctx.reply(reply);
    } else {
      for (var i = 0; i < route.length; i++) {
        if (i !== 0) {
          reply += "\n\n\n" + "---------------OR---------------" + "\n\n\n";
        }
        reply += `Path: ${formatPath(route[i].Path)} \n\nDuration(mins) ${
          route[i].Duration
        } \n\nTransfers: ${route[i].Transfers}`;
      }
      await ctx.reply(reply);
      ctx.reply("Want to sit back and relax? \nTry /proximityalarm");
    }
  } catch (error) {
    console.log(error);
    ctx.reply("Error occured. Server is down.");
  }
}

function formatPath(arr) {
  var path = "";
  const splitArr = arr.map((stop) => stop.split("_"));
  for (var i = 0; i < splitArr.length; i++) {
    if (i === splitArr.length - 1) {
      path += reverseMap[splitArr[i][0]];
    } else {
      if (splitArr[i][1] !== splitArr[i + 1][1]) {
        path += reverseMap[splitArr[i][0]];
        path += "(" + splitArr[i + 1][1] + ")  -->  ";
      }
    }
  }
  return path;
}

async function arrivalTime(arrBusStop, busService, ctx, busstopcode) {
  if (busstopcode) {
    try {
      const stop = map[arrBusStop];
      const arrTime = await fetch(
        "https://nusroutesapi.herokuapp.com" +
          "/api/getArrivalTime?busStop=" +
          encodeURIComponent(stop) +
          "&busService=" +
          encodeURIComponent(busService) +
          "&busstopcode=" +
          encodeURIComponent(busstopcode)
      )
        .then((response) => response.text())
        .then((data) => data ? JSON.parse(data) : {})
        .catch(console.log);

      if ((arrTime[0] === "-")) {
        arrTime[0] = "-";
      } else if ((arrTime[0] === "Arr")) {
        arrTime[0] = "Arr";
      } else {
        arrTime[0] = arrTime[0] + " mins";
      }

      if ((arrTime[1] === "-")) {
        arrTime[1] = "-";
      } else if ((arrTime[1] === "Arr")) {
        arrTime[1] = "Arr";
      } else {
        arrTime[1] = arrTime[1] + " mins";
      }

      var reply;
      if (arrTime[0] === "-" && arrTime[1] === "-") {
        reply = "No incoming bus";
      } else {
        reply = `Arriving: ${arrTime[0]} \nNext: ${arrTime[1]}`;
      }
      ctx.reply(reply);
    } catch (error) {
      console.log(error);
      ctx.reply("Error occured. Server is down.");
    }
  } else {
    try {
      const stop = map[arrBusStop];
      const arrTime = await fetch(
        "https://nusroutesapi.herokuapp.com" +
          "/api/getArrivalTime?busStop=" +
          encodeURIComponent(stop) +
          "&busService=" +
          encodeURIComponent(busService)
      ).then((response) => response.json());

      if (arrTime[0] == "-") {
        arrTime[0] = "-";
      } else if (arrTime[0] == "Arr") {
      } else {
        arrTime[0] = arrTime[0] + " mins";
      }

      if (arrTime[1] == "-") {
        arrTime[1] = "-";
      } else if (arrTime[1] == "Arr") {
      } else {
        arrTime[1] = arrTime[1] + " mins";
      }

      var reply;
      if (arrTime[0] === "-" && arrTime[1] === "-") {
        reply = "No incoming bus";
      } else {
        reply = `Arriving: ${arrTime[0]} \nNext: ${arrTime[1]}`;
      }
      ctx.reply(reply);
    } catch (error) {
      console.log(error);
      ctx.reply("Error occured. Server is down.");
    }
  }
}

async function checkProximity(latitude, longitude, dest, ctx) {
  try {
    const closeToDest = await fetch(
      "https://nusroutesapi.herokuapp.com" +
        "/proximityAlarm?lat=" +
        encodeURIComponent(latitude) +
        "&lng=" +
        encodeURIComponent(longitude) +
        "&dest=" +
        encodeURIComponent(dest)
    ).then((response) => response.json());

    console.log("Close To Destination: " + closeToDest);
    if (closeToDest && counter[ctx.from.id] === 0) {
      ctx.reply(`ALERT: Arriving at ${dest} \r\nPlease alight soon!`);
      counter[ctx.from.id] = 1;
    }
  } catch (error) {
    console.log(error);
    ctx.reply("Error occured. Server is down.");
  }
}

/* ----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------  */

bot.command("start", (ctx) => {
  console.log(ctx.from);
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "Welcome to NUSRoutes! \n/routefinder \n/arrivaltime \n/proximityalarm",
    {}
  );
});

bot.hears("/help", (ctx) =>
  ctx.reply("Commands: \n/routefinder \n/arrivaltime \n/proximityalarm")
);

// Route Finder

bot.hears("/routefinder", (ctx) => {
  console.log(ctx.from);
  let msg = `Select your CURRENT LOCATION:`;
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, msg, {
    reply_markup: {
      inline_keyboard: curBusStops,
    },
  });
});

bot.action("cur_AS 5", (ctx) => {
  current[ctx.from.id] = "AS 5";
  dest(ctx);
});

bot.action("cur_BIZ 2", (ctx) => {
  current[ctx.from.id] = "BIZ 2";
  dest(ctx);
});

bot.action("cur_Botanic Gardens MRT", (ctx) => {
  current[ctx.from.id] = "Botanic Gardens MRT";
  dest(ctx);
});

bot.action("cur_BTC - Oei Tiong Ham Building", (ctx) => {
  current[ctx.from.id] = "BTC - Oei Tiong Ham Building";
  dest(ctx);
});

bot.action("cur_Central Library", (ctx) => {
  current[ctx.from.id] = "Central Library";
  dest(ctx);
});

bot.action("cur_College Green", (ctx) => {
  current[ctx.from.id] = "College Green";
  dest(ctx);
});

bot.action("cur_COM2", (ctx) => {
  current[ctx.from.id] = "COM2";
  dest(ctx);
});

bot.action("cur_EA", (ctx) => {
  current[ctx.from.id] = "EA";
  dest(ctx);
});

bot.action("cur_Information Technology", (ctx) => {
  current[ctx.from.id] = "Information Technology";
  dest(ctx);
});

bot.action("cur_Kent Ridge MRT", (ctx) => {
  current[ctx.from.id] = "Kent Ridge MRT";
  dest(ctx);
});

bot.action("cur_Kent Vale", (ctx) => {
  current[ctx.from.id] = "Kent Vale";
  dest(ctx);
});

bot.action("cur_LT13", (ctx) => {
  current[ctx.from.id] = "LT13";
  dest(ctx);
});

bot.action("cur_LT27", (ctx) => {
  current[ctx.from.id] = "LT27";
  dest(ctx);
});

bot.action("cur_Museum", (ctx) => {
  current[ctx.from.id] = "Museum";
  dest(ctx);
});

bot.action("cur_Opp HSSML", (ctx) => {
  current[ctx.from.id] = "Opp HSSML";
  dest(ctx);
});

bot.action("cur_Opp Kent Ridge MRT", (ctx) => {
  current[ctx.from.id] = "Opp Kent Ridge MRT";
  dest(ctx);
});

bot.action("cur_Opp NUSS", (ctx) => {
  current[ctx.from.id] = "Opp NUSS";
  dest(ctx);
});

bot.action("cur_Opp TCOMS", (ctx) => {
  current[ctx.from.id] = "Opp TCOMS";
  dest(ctx);
});

bot.action("cur_Opp University Hall", (ctx) => {
  current[ctx.from.id] = "Opp University Hall";
  dest(ctx);
});

bot.action("cur_Opp University Health Centre", (ctx) => {
  current[ctx.from.id] = "Opp University Health Centre";
  dest(ctx);
});

bot.action("cur_Opp YIH", (ctx) => {
  current[ctx.from.id] = "Opp YIH";
  dest(ctx);
});

bot.action("cur_Prince George's Park", (ctx) => {
  current[ctx.from.id] = "Prince George's Park";
  dest(ctx);
});

bot.action("cur_Prince George's Park Residence", (ctx) => {
  current[ctx.from.id] = "Prince George's Park Residence";
  dest(ctx);
});

bot.action("cur_Raffles Hall (Opp. Museum)", (ctx) => {
  current[ctx.from.id] = "Raffles Hall (Opp. Museum)";
  dest(ctx);
});

bot.action("cur_S17", (ctx) => {
  current[ctx.from.id] = "S17";
  dest(ctx);
});

bot.action("cur_TCOMS", (ctx) => {
  current[ctx.from.id] = "TCOMS";
  dest(ctx);
});

bot.action("cur_University Hall", (ctx) => {
  current[ctx.from.id] = "University Hall";
  dest(ctx);
});

bot.action("cur_University Health Centre", (ctx) => {
  current[ctx.from.id] = "University Health Centre";
  dest(ctx);
});

bot.action("cur_University Town", (ctx) => {
  current[ctx.from.id] = "University Town";
  dest(ctx);
});

bot.action("cur_Ventus (Opp LT13)", (ctx) => {
  current[ctx.from.id] = "Ventus (Opp LT13)";
  dest(ctx);
});

bot.action("cur_YIH", (ctx) => {
  current[ctx.from.id] = "YIH";
  dest(ctx);
});

bot.action("cur_The Japanese Primary School", (ctx) => {
  current[ctx.from.id] = "The Japanese Primary School";
  dest(ctx);
});

bot.action("cur_Kent Ridge Bus Terminal", (ctx) => {
  current[ctx.from.id] = "Kent Ridge Bus Terminal";
  dest(ctx);
});

bot.action("cur_SDE 3", (ctx) => {
  current[ctx.from.id] = "SDE 3";
  dest(ctx);
});

bot.action("cur_Opp SDE 3", (ctx) => {
  current[ctx.from.id] = "Opp SDE 3";
  dest(ctx);
});

/* ----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------  */

const dest = (ctx) => {
  console.log(ctx.from);
  let msg = `Select your DESTINATION:`;
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, msg, {
    reply_markup: {
      inline_keyboard: destBusStops,
    },
  });
};

bot.action("dest_AS 5", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "AS 5";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_BIZ 2", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "BIZ 2";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Botanic Gardens MRT", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Botanic Gardens MRT";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_BTC - Oei Tiong Ham Building", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "BTC - Oei Tiong Ham Building";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Central Library", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Central Library";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_College Green", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "College Green";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_COM2", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "COM2";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_EA", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "EA";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Information Technology", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Information Technology";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Kent Ridge MRT", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Kent Ridge MRT";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Kent Vale", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Kent Vale";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_LT13", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "LT13";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_LT27", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "LT27";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Museum", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Museum";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp HSSML", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Opp HSSML";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp Kent Ridge MRT", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Opp Kent Ridge MRT";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp NUSS", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Opp NUSS";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp TCOMS", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Opp TCOMS";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp University Hall", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Opp University Hall";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp University Health Centre", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Opp University Health Centre";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp YIH", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Opp YIH";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Prince George's Park", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Prince George's Park";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Prince George's Park Residence", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Prince George's Park Residence";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Raffles Hall (Opp. Museum)", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Raffles Hall (Opp. Museum)";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_S17", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "S17";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_TCOMS", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "TCOMS";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_University Hall", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "University Hall";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_University Health Centre", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "University Health Centre";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_University Town", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "University Town";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Ventus (Opp LT13)", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Ventus (Opp LT13)";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_YIH", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "YIH";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_The Japanese Primary School", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "The Japanese Primary School";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Kent Ridge Bus Terminal", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Kent Ridge Bus Terminal";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_SDE 3", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "SDE 3";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp SDE 3", (ctx) => {
  ctx.deleteMessage();
  destination[ctx.from.id] = "Opp SDE 3";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

/* ----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------  */

// Arrival time

var arrBusStop = {};
var busService = {};

bot.hears("/arrivaltime", (ctx) => {
  console.log(ctx.from);
  let msg = `Select the bus stop:`;
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, msg, {
    reply_markup: {
      inline_keyboard: arrBusStops,
    },
  });
});

const selectBusServices = (ctx) => {
  console.log(ctx.from);
  let msg = `Select the bus service:`;
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, msg, {
    reply_markup: {
      inline_keyboard: busServices[arrBusStop[ctx.chat.id]],
    },
  });
};

bot.action("arr_AS 5", (ctx) => {
  arrBusStop[ctx.from.id] = "AS 5";
  selectBusServices(ctx);
});

bot.action("arr_BIZ 2", (ctx) => {
  arrBusStop[ctx.from.id] = "BIZ 2";
  selectBusServices(ctx);
});

bot.action("arr_Botanic Gardens MRT", (ctx) => {
  arrBusStop[ctx.from.id] = "Botanic Gardens MRT";
  selectBusServices(ctx);
});

bot.action("arr_BTC - Oei Tiong Ham Building", (ctx) => {
  arrBusStop[ctx.from.id] = "BTC - Oei Tiong Ham Building";
  selectBusServices(ctx);
});

bot.action("arr_Central Library", (ctx) => {
  arrBusStop[ctx.from.id] = "Central Library";
  selectBusServices(ctx);
});

bot.action("arr_College Green", (ctx) => {
  arrBusStop[ctx.from.id] = "College Green";
  selectBusServices(ctx);
});

bot.action("arr_COM2", (ctx) => {
  arrBusStop[ctx.from.id] = "COM2";
  selectBusServices(ctx);
});

bot.action("arr_EA", (ctx) => {
  arrBusStop[ctx.from.id] = "EA";
  selectBusServices(ctx);
});

bot.action("arr_Information Technology", (ctx) => {
  arrBusStop[ctx.from.id] = "Information Technology";
  selectBusServices(ctx);
});

bot.action("arr_Kent Ridge MRT", (ctx) => {
  arrBusStop[ctx.from.id] = "Kent Ridge MRT";
  selectBusServices(ctx);
});

bot.action("arr_Kent Vale", (ctx) => {
  arrBusStop[ctx.from.id] = "Kent Vale";
  selectBusServices(ctx);
});

bot.action("arr_LT13", (ctx) => {
  arrBusStop[ctx.from.id] = "LT13";
  selectBusServices(ctx);
});

bot.action("arr_LT27", (ctx) => {
  arrBusStop[ctx.from.id] = "LT27";
  selectBusServices(ctx);
});

bot.action("arr_Museum", (ctx) => {
  arrBusStop[ctx.from.id] = "Museum";
  selectBusServices(ctx);
});

bot.action("arr_Opp HSSML", (ctx) => {
  arrBusStop[ctx.from.id] = "Opp HSSML";
  selectBusServices(ctx);
});

bot.action("arr_Opp Kent Ridge MRT", (ctx) => {
  arrBusStop[ctx.from.id] = "Opp Kent Ridge MRT";
  selectBusServices(ctx);
});

bot.action("arr_Opp NUSS", (ctx) => {
  arrBusStop[ctx.from.id] = "Opp NUSS";
  selectBusServices(ctx);
});

bot.action("arr_Opp TCOMS", (ctx) => {
  arrBusStop[ctx.from.id] = "Opp TCOMS";
  selectBusServices(ctx);
});

bot.action("arr_Opp University Hall", (ctx) => {
  arrBusStop[ctx.from.id] = "Opp University Hall";
  selectBusServices(ctx);
});

bot.action("arr_Opp University Health Centre", (ctx) => {
  arrBusStop[ctx.from.id] = "Opp University Health Centre";
  selectBusServices(ctx);
});

bot.action("arr_Opp YIH", (ctx) => {
  arrBusStop[ctx.from.id] = "Opp YIH";
  selectBusServices(ctx);
});

bot.action("arr_Prince George's Park", (ctx) => {
  arrBusStop[ctx.from.id] = "Prince George's Park";
  selectBusServices(ctx);
});

bot.action("arr_Prince George's Park Residence", (ctx) => {
  arrBusStop[ctx.from.id] = "Prince George's Park Residence";
  selectBusServices(ctx);
});

bot.action("arr_Raffles Hall (Opp. Museum)", (ctx) => {
  arrBusStop[ctx.from.id] = "Raffles Hall (Opp. Museum)";
  selectBusServices(ctx);
});

bot.action("arr_S17", (ctx) => {
  arrBusStop[ctx.from.id] = "S17";
  selectBusServices(ctx);
});

bot.action("arr_TCOMS", (ctx) => {
  arrBusStop[ctx.from.id] = "TCOMS";
  selectBusServices(ctx);
});

bot.action("arr_University Hall", (ctx) => {
  arrBusStop[ctx.from.id] = "University Hall";
  selectBusServices(ctx);
});

bot.action("arr_University Health Centre", (ctx) => {
  arrBusStop[ctx.from.id] = "University Health Centre";
  selectBusServices(ctx);
});

bot.action("arr_University Town", (ctx) => {
  arrBusStop[ctx.from.id] = "University Town";
  selectBusServices(ctx);
});

bot.action("arr_Ventus (Opp LT13)", (ctx) => {
  arrBusStop[ctx.from.id] = "Ventus (Opp LT13)";
  selectBusServices(ctx);
});

bot.action("arr_YIH", (ctx) => {
  arrBusStop[ctx.from.id] = "YIH";
  selectBusServices(ctx);
});

bot.action("arr_The Japanese Primary School", (ctx) => {
  arrBusStop[ctx.from.id] = "The Japanese Primary School";
  selectBusServices(ctx);
});

bot.action("arr_Kent Ridge Bus Terminal", (ctx) => {
  arrBusStop[ctx.from.id] = "Kent Ridge Bus Terminal";
  selectBusServices(ctx);
});

bot.action("arr_SDE 3", (ctx) => {
  arrBusStop[ctx.from.id] = "SDE 3";
  selectBusServices(ctx);
});

bot.action("arr_Opp SDE 3", (ctx) => {
  arrBusStop[ctx.from.id] = "Opp SDE 3";
  selectBusServices(ctx);
});

/* ----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------  */

bot.action("service_A1", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "A1";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} at ${arrBusStop[ctx.from.id]}`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx);
});

bot.action("service_A2", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "A2";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} at ${arrBusStop[ctx.from.id]}`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx);
});

bot.action("service_D1", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "D1";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} at ${arrBusStop[ctx.from.id]}`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx);
});

bot.action("service_D1 (BIZ2)", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "D1";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} (BIZ2) at ${
      arrBusStop[ctx.from.id]
    }`
  );
  arrivalTime(
    arrBusStop[ctx.from.id],
    busService[ctx.from.id],
    ctx,
    "COM2-BIZ2"
  );
});

bot.action("service_D1 (UTOWN)", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "D1";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} (UTOWN) at ${
      arrBusStop[ctx.from.id]
    }`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx, "COM2-UT");
});

bot.action("service_D2", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "D2";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} at ${arrBusStop[ctx.from.id]}`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx);
});

bot.action("service_E", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "E";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} at ${arrBusStop[ctx.from.id]}`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx);
});

bot.action("service_K", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "K";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} at ${arrBusStop[ctx.from.id]}`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx);
});

bot.action("service_BTC", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "BTC";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} at ${arrBusStop[ctx.from.id]}`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx);
});

bot.action("service_L", (ctx) => {
  ctx.deleteMessage();
  busService[ctx.from.id] = "L";
  ctx.reply(
    `Arrival Time of ${busService[ctx.from.id]} at ${arrBusStop[ctx.from.id]}`
  );
  arrivalTime(arrBusStop[ctx.from.id], busService[ctx.from.id], ctx);
});

/* ----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------  */

// currently telegram api does not support requesting live location
// user have to turn live location on manually
/*
bot.hears("location", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Can we access your location?",
    requestLocationKeyboard
  );
});

const requestLocationKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: "My location",
          request_location: true,
          one_time_keyboard: true,
        },
      ],
      ["Cancel"],
    ],
  },
};
*/

// Proximity Alarm

var proxDest = {};
var counter = {};
var locationStr =
  "\n" +
  "Please share your Live Location to start the proximity alarm.\n\n1) Click on the paperclip icon at the bottom\n2) Click on Location\n3) Share My Live Location";

bot.hears("/proximityalarm", (ctx) => {
  console.log(ctx.from);
  let msg = `Select your DESTINATION:`;
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, msg, {
    reply_markup: {
      inline_keyboard: proxBusStops,
    },
  });
});

bot.on("location", (ctx) => {
  if (proxDest[ctx.from.id] !== undefined) {
    ctx.reply("Location detected, proximityAlarm enabled!");
  } else {
    ctx.reply("Location detected, try out /proximityalarm");
  }
  counter[ctx.from.id] = 0;
});

bot.on("edited_message", (ctx) => {
  if (proxDest[ctx.from.id] !== undefined) {
    var latitude = ctx.editedMessage.location.latitude;
    var longitude = ctx.editedMessage.location.longitude;
    console.log(latitude + " | " + longitude);

    checkProximity(latitude, longitude, proxDest[ctx.from.id], ctx);
  } else {
    let msg = `Select your DESTINATION:`;
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, msg, {
      reply_markup: {
        inline_keyboard: proxBusStops,
      },
    });
  }
});

bot.action("prox_AS 5", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "AS 5";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_BIZ 2", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "BIZ 2";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Botanic Gardens MRT", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Botanic Gardens MRT";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_BTC - Oei Tiong Ham Building", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "BTC - Oei Tiong Ham Building";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Central Library", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Central Library";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_College Green", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "College Green";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_COM2", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "COM2";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_EA", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "EA";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Information Technology", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Information Technology";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Kent Ridge MRT", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Kent Ridge MRT";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Kent Vale", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Kent Vale";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_LT13", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "LT13";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_LT27", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "LT27";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Museum", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Museum";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Opp HSSML", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Opp HSSML";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Opp Kent Ridge MRT", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Opp Kent Ridge MRT";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Opp NUSS", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Opp NUSS";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Opp TCOMS", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Opp TCOMS";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Opp University Hall", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Opp University Hall";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Opp University Health Centre", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Opp University Health Centre";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Opp YIH", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Opp YIH";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Prince George's Park", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Prince George's Park";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Prince George's Park Residence", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Prince George's Park Residence";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Raffles Hall (Opp. Museum)", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Raffles Hall (Opp. Museum)";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_S17", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "S17";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_TCOMS", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "TCOMS";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_University Hall", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "University Hall";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_University Health Centre", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "University Health Centre";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_University Town", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "University Town";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Ventus (Opp LT13)", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Ventus (Opp LT13)";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_YIH", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "YIH";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_The Japanese Primary School", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "The Japanese Primary School";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Kent Ridge Bus Terminal", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Kent Ridge Bus Terminal";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_SDE 3", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "SDE 3";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

bot.action("prox_Opp SDE 3", (ctx) => {
  ctx.deleteMessage();
  proxDest[ctx.from.id] = "Opp SDE 3";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

module.exports = bot;
