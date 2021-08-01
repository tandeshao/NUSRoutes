//finds service after finding the optimal path.

const findService = (path, busServices) => {
  if (path == null) {
    console.log("path is not found");
  } else {
    const path_length = path.length;
    let pos = 0;
    let result = [];
    for (let i = 0; i < path_length - 1; i++) {
      const busService = [];
      let count = 0;
      busServices.forEach((service) => {
        const len = service.path.length;
        const arr = service.path;
        for (let j = 0; j < len; j++) {
          if (
            i + 1 < path_length &&
            j + 1 < len &&
            path[i] == arr[j] &&
            path[i + 1] == arr[j + 1]
          ) {
            busService[count] = service.service_name;
            count++;
          }
        }
      });

      if (i + 1 < path_length) {
        result[pos] = [busService, path[i], path[i + 1]];
        pos++;
      } else {
        result[pos] = [busService, path[i - 1], path[i]];
      }
    }
    return result;
  }
};

module.exports = findService;
