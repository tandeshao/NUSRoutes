function breadthFirstSearch(graph, start, end) {
  const queue = [];
  queue.push([start]);

  while (queue.length) {
    path = queue.shift();
    node = path[path.length - 1];

    if (node === end) {
      return path;
    }

    for (const [key, value] of Object.entries(graph)) {
      if (key === node) {
        value.forEach((element) => {
          const new_path = path.concat([element]);
          return queue.push(new_path);
        });
      }
    }
  }

  console.log("no result");
}


export default breadthFirstSearch;
