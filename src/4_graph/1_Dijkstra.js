const graph = {
    A: {B: 2, D: 4},
    B: {A: 2, C: 3, D: 1},
    C: {B: 3, E: 1, D: 2},
    D: {A: 4, B: 1, C: 2},
    E: {C: 1},
}

// Run Dijkstra's algorithm
const result = dijkstra(graph, "A", "A");

// Output the result
if (result.distance === Infinity) {
    console.log("No path exists.");
} else {
    console.log(`Shortest path: ${result.path.join(" -> ")}`);
    console.log(`Total distance: ${result.distance}`);
}

function dijkstra(graph, startNode, endNode) {
    // 1
    const distancesFromStartNode = {};
    const visited = {};
    const queue = [];

    // 2
    for (const node in graph) {
        if (node === startNode) {
            distancesFromStartNode[node] = 0;
            queue.push({node, priority: 0});
        } else {
            distancesFromStartNode[node] = Infinity;
            queue.push({node, priority: Infinity});
        }
        visited[node] = null;
    }

    queue.sort((a, b) => a.priority - b.priority);

    // 3
    while (queue.length > 0) {
        const {node: currentNode} = queue.shift();

        if (currentNode === endNode) {
            const path = [];
            let node = endNode;
            while (node !== null) {
                path.unshift();
                node = visited[node];
            }
            return {path: path, distance: distancesFromStartNode[endNode]};
        }



    }
    return {path: [], distance: Infinity};
}