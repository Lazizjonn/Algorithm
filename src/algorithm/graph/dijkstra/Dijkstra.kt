package algorithm.graph.dijkstra

import java.util.*

fun main() {
    val (path, distance) = dijkstra(graph, "A", "E")

    if (path.isEmpty()) {
        println("No path exists.")
    } else {
        println("Shortest path: ${path.joinToString(" -> ")}")
        println("Total distance: $distance")
    }
}

val graph = mapOf(
    "A" to mapOf("B" to 2, "D" to 4),
    "B" to mapOf("A" to 2, "C" to 3, "D" to 1),
    "C" to mapOf("B" to 3, "E" to 1, "D" to 2),
    "D" to mapOf("A" to 4, "B" to 1, "C" to 2),
    "E" to mapOf("C" to 1)
)

fun dijkstra(
    graph: Map<String, Map<String, Int>>,
    startNode: String,
    endNode: String,
): Pair<List<String>, Int> {

    // 1
    val distancesFromStartNode = mutableMapOf<String, Int>()
    val visited = mutableMapOf<String, String?>()
    val queue = PriorityQueue<Pair<String, Int>>(compareBy { it.second })

    // 2
    for (node in graph.keys) {
        if (node == startNode) {
            distancesFromStartNode[node] = 0
            queue.add(node to 0)
        } else {
            distancesFromStartNode[node] = Int.MAX_VALUE
            queue.add(node to Int.MAX_VALUE)
        }
        visited[node] = null
    }

    // 3
    while (queue.isNotEmpty()) {
        val (currentNode, totalDistanceFromStartNodeToCurrentNode) = queue.poll()

        // 4
        if (currentNode == endNode) {
            val path = mutableListOf<String>()
            var node: String? = endNode
            while (node != null) {
                path.add(node)
                node = visited[node]
            }
            return path.reversed() to totalDistanceFromStartNodeToCurrentNode
        }

        // 5
        for ((neighborOfCurrentNode, distanceToNeighbourFromCurrentNode) in graph[currentNode]!!) {
            val newTotalDistanceToNeighbourFromStartNode =
                totalDistanceFromStartNodeToCurrentNode + distanceToNeighbourFromCurrentNode

            // 6
            if (newTotalDistanceToNeighbourFromStartNode < distancesFromStartNode[neighborOfCurrentNode]!!) {
                distancesFromStartNode[neighborOfCurrentNode] = newTotalDistanceToNeighbourFromStartNode
                visited[neighborOfCurrentNode] = currentNode
                queue.add(neighborOfCurrentNode to newTotalDistanceToNeighbourFromStartNode)
                println()
            }
        }
    }

    // 7
    return emptyList<String>() to Int.MAX_VALUE
}