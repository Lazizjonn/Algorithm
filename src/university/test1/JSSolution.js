"use strict";

const fs = require("fs");

// Graph Builder
function graphBuilder() {
    const nodeIds = [];
    const nodeDict = {};
    const tn = [];
    const hn = [];
    const fsEdges = [];
    const bsEdges = [];
    const costs = [];
    let nodeIndex = 0;
    let edgeIndex = 0;

    function addNode(node) {
        if (nodeDict[node] == null) {
            nodeDict[node] = nodeIndex;
            nodeIds[nodeIndex] = node;
            fsEdges[nodeIndex] = [];
            bsEdges[nodeIndex] = [];
            nodeIndex++;
        }
        return nodeDict[node];
    }

    function addLink(from, to, cost) {
        const tailIndex = addNode(from);
        const headIndex = addNode(to);
        tn[edgeIndex] = tailIndex;
        hn[edgeIndex] = headIndex;
        fsEdges[tailIndex].push(edgeIndex);
        bsEdges[headIndex].push(edgeIndex);
        costs[edgeIndex] = cost;
        edgeIndex++;
    }

    return { nodeIds, nodeDict, tn, hn, fsEdges, bsEdges, costs, addNode, addLink };
}

// Bucket List Implementation
function BucketList(buckCost, spanInverse, nBuck) {
    const buckets = Array(nBuck + 1).fill(null).map(() => []);
    const positions = {};
    let numItems = 0;
    let currentBucket = nBuck;

    const getBucketIndex = (cost) => Math.min(nBuck, Math.floor(spanInverse * buckCost(cost)));

    function addItem(node, cost) {
        const bucketIndex = getBucketIndex(cost);
        buckets[bucketIndex].push(node);
        positions[node] = bucketIndex;
        numItems++;
        if (bucketIndex < currentBucket) currentBucket = bucketIndex;
    }

    function extractBest() {
        while (currentBucket <= nBuck && buckets[currentBucket].length === 0) {
            currentBucket++;
        }
        if (currentBucket > nBuck) return null;

        const bestNode = buckets[currentBucket].pop();
        numItems--;
        return bestNode;
    }

    return { addItem, extractBest };
}

// Shortest Path Algorithm
function shortestDestTree(orig, dest, graph, options) {
    const { fsEdges, bsEdges, tn, hn, costs } = graph;
    const wmin = [];
    const nodes = graph.nodeIds;
    const star = options.from_origin ? fsEdges : bsEdges;
    const nod0 = options.from_origin ? hn : tn;
    const nod1 = options.from_origin ? tn : hn;

    const buck = BucketList(
        (i) => wmin[i],
        options.nBuck / options.wMax,
        options.nBuck
    );

    buck.addItem(dest, 0);

    while (true) {
        const current = buck.extractBest();
        if (current == null) break;

        for (const edge of star[current]) {
            const neighbor = nod0[edge];
            const newCost = wmin[current] + costs[edge];
            if (wmin[neighbor] == null || newCost < wmin[neighbor]) {
                wmin[neighbor] = newCost;
                buck.addItem(neighbor, newCost);
            }
        }
    }

    return { wmin };
}

// Function to read the graph from a file
function readGraph(filePath) {
    const graph = graphBuilder();
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split(/\r?\n/);
    for (const line of lines) {
        if (line.trim() === "") continue;
        const [from, to, weight] = line.split(/\s+/);
        graph.addLink(from, to, parseFloat(weight));
    }
    return graph;
}

// Main Execution
const filePath = "C:\\Users\\suyun\\StudioProjects\\Algorithm\\src\\university\\test1\\large_graph.txt";
const graph = readGraph(filePath);
const startNode = "N0";
const endNode = "N99999";

try {
    console.time("Dijkstra");
    const result = shortestDestTree(
        startNode,
        endNode,
        graph,
        { wMax: 10000, nBuck: 20000, from_origin: false }
    );
    console.timeEnd("Dijkstra");

    console.log(`Shortest distance from ${startNode} to ${endNode}: ${result.wmin[graph.nodeDict[endNode]]}`);
} catch (error) {
    console.error("An error occurred:", error);
}
