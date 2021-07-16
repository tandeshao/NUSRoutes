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
  // Current Time
  let [hour, minute] = new Date().toLocaleTimeString("it-IT").split(/:| /);
  let time = hour + minute;
  const obj = new Date();
  let [month, date, year] = obj.toLocaleDateString("en-US").split("/");
  const day = obj.getDay();

  // Get route
  const start = map[current];
  const end = map[destination];
  const category =
    data.reduce((x, y) => {
      if (x !== null) {
        return x;
      } else if (y["duration-year"].includes(parseInt(year))) {
        if (
          y["duration-month"][0] < parseInt(month) &&
          parseInt(month) < y["duration-month"][1]
        ) {
          return "vacation";
        } else if (
          y["duration-month"][0] === parseInt(month) ||
          parseInt(month) === y["duration-month"][1]
        ) {
          return y["duration-date"][0] <= parseInt(date) &&
            parseInt(date) <= y["duration-date"][1]
            ? "vacation"
            : "term";
        } else {
          return "term";
        }
      } else {
        return null;
      }
    }, null) +
    (parseInt(day) === 0
      ? "-sun/ph"
      : parseInt(day) === 6
      ? "-sat"
      : "-weekdays");

  try {
    const route = await fetch(
      "https://nusroutesapi.herokuapp.com" +
        "/api/routeRecommedation?start=" +
        encodeURIComponent(start) +
        "&end=" +
        encodeURIComponent(end) +
        "&time=" +
        encodeURIComponent(time) +
        "&date=" +
        encodeURIComponent(category)
    ).then((response) => response.json());

    var reply = "";
    if (current == destination) {
      reply =
        "Current location must be different from destination! /routeFinder";
    } else if (route.length === 0) {
      reply =
        "No routes available. Please select another location. /routeFinder";
    } else {
      for (var i = 0; i < route.length; i++) {
        if (i !== 0) {
          reply += "\n\n\n" + "---------------OR---------------" + "\n\n\n";
        }
        reply += `Path: ${formatPath(route[i].Path)} \n\nDuration(mins) ${
          route[i].Duration
        } \n\nTransfers: ${route[i].Transfers}`;
      }
    }
    await ctx.reply(reply);
    ctx.reply("Want to sit back and relax? \nTry /proximityAlarm");
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

async function arrivalTime(arrBusStop, busService, ctx) {
  // Current Time
  // Get route
  try {
    const stop = map[arrBusStop];
    const arrTime = await fetch(
      "https://nusroutesapi.herokuapp.com" +
        "/api/getArrivalTime?busStop=" +
        encodeURIComponent(stop) +
        "&busService=" +
        encodeURIComponent(busService)
    ).then((response) => response.json());

    console.log(arrTime);

    var reply = `Arriving: ${arrTime[0]}mins \nNext: ${arrTime[1]}mins`;
    ctx.reply(reply);
  } catch (error) {
    console.log(error);
    ctx.reply("Error occured. Server is down.");
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
      ctx.reply(`ALERT: Arriving at ${dest}. Please alight soon!`);
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
    "Welcome to NUSRoutes! \n/routeFinder \n/arrivalTime \n/proximityAlarm",
    {}
  );
});

bot.hears("/help", (ctx) =>
  ctx.reply("Commands: \n/routeFinder \n/arrivalTime \n/proximityAlarm")
);

// Route Finder

bot.hears("/routeFinder", (ctx) => {
  console.log(ctx.from);
  let msg = `Select your CURRENT LOCATION:`;
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, msg, {
    reply_markup: {
      inline_keyboard: curBusStops,
    },
  });
});

bot.action("cur_AS5", (ctx) => {
  current[ctx.from.id] = "AS5";
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

bot.action("dest_AS5", (ctx) => {
  destination[ctx.from.id] = "AS5";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_BIZ 2", (ctx) => {
  destination[ctx.from.id] = "BIZ 2";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Botanic Gardens MRT", (ctx) => {
  destination[ctx.from.id] = "Botanic Gardens MRT";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_BTC - Oei Tiong Ham Building", (ctx) => {
  destination[ctx.from.id] = "BTC - Oei Tiong Ham Building";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Central Library", (ctx) => {
  destination[ctx.from.id] = "Central Library";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_College Green", (ctx) => {
  destination[ctx.from.id] = "College Green";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_COM2", (ctx) => {
  destination[ctx.from.id] = "COM2";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_EA", (ctx) => {
  destination[ctx.from.id] = "EA";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Information Technology", (ctx) => {
  destination[ctx.from.id] = "Information Technology";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Kent Ridge MRT", (ctx) => {
  destination[ctx.from.id] = "Kent Ridge MRT";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Kent Vale", (ctx) => {
  destination[ctx.from.id] = "Kent Vale";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_LT13", (ctx) => {
  destination[ctx.from.id] = "LT13";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_LT27", (ctx) => {
  destination[ctx.from.id] = "LT27";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Museum", (ctx) => {
  destination[ctx.from.id] = "Museum";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp HSSML", (ctx) => {
  destination[ctx.from.id] = "Opp HSSML";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp Kent Ridge MRT", (ctx) => {
  destination[ctx.from.id] = "Opp Kent Ridge MRT";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp NUSS", (ctx) => {
  destination[ctx.from.id] = "Opp NUSS";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp TCOMS", (ctx) => {
  destination[ctx.from.id] = "Opp TCOMS";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp University Hall", (ctx) => {
  destination[ctx.from.id] = "Opp University Hall";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp University Health Centre", (ctx) => {
  destination[ctx.from.id] = "Opp University Health Centre";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Opp YIH", (ctx) => {
  destination[ctx.from.id] = "Opp YIH";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Prince George's Park", (ctx) => {
  destination[ctx.from.id] = "Prince George's Park";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Prince George's Park Residence", (ctx) => {
  destination[ctx.from.id] = "Prince George's Park Residence";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Raffles Hall (Opp. Museum)", (ctx) => {
  destination[ctx.from.id] = "Raffles Hall (Opp. Museum)";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_S17", (ctx) => {
  destination[ctx.from.id] = "S17";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_TCOMS", (ctx) => {
  destination[ctx.from.id] = "TCOMS";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_University Hall", (ctx) => {
  destination[ctx.from.id] = "University Hall";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_University Health Centre", (ctx) => {
  destination[ctx.from.id] = "University Health Centre";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_University Town", (ctx) => {
  destination[ctx.from.id] = "University Town";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Ventus (Opp LT13)", (ctx) => {
  destination[ctx.from.id] = "Ventus (Opp LT13)";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_YIH", (ctx) => {
  destination[ctx.from.id] = "YIH";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_The Japanese Primary School", (ctx) => {
  destination[ctx.from.id] = "The Japanese Primary School";
  ctx.reply(
    `Calculating... ${current[ctx.from.id]} to ${destination[ctx.from.id]}`
  );
  routeFinder(current[ctx.from.id], destination[ctx.from.id], ctx);
});

bot.action("dest_Kent Ridge Bus Terminal", (ctx) => {
  destination[ctx.from.id] = "Kent Ridge Bus Terminal";
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

bot.hears("/arrivalTime", (ctx) => {
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

bot.action("arr_AS5", (ctx) => {
  arrBusStop[ctx.from.id] = "AS5";
  selectBusServices(ctx);
});

/* ----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------  */

bot.action("service_A1", (ctx) => {
  busService[ctx.from.id] = "A1";
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

bot.hears("/proximityAlarm", (ctx) => {
  console.log(ctx.from);
  if (destination[ctx.from.id] !== undefined) {
    proxDest[ctx.from.id] = destination[ctx.from.id];
    ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
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

bot.on("location", (ctx) => {
  ctx.reply("Location detected, proximityAlarm enabled!");
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

bot.action("prox_AS5", (ctx) => {
  proxDest[ctx.from.id] = "AS5";
  ctx.reply(`Destination: ${proxDest[ctx.from.id]} ${locationStr}`);
});

module.exports = bot;
