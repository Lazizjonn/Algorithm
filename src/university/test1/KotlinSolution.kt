import java.io.File
import java.util.*

fun readGraph(fileName: String): Map<String, Map<String, Int>> {
    val graph = mutableMapOf<String, MutableMap<String, Int>>()
    File(fileName).forEachLine { line ->
        if (line.isNotEmpty()) {
            val parts = line.split(":")
            if (parts.size >= 2) { // Ensure the line has at least one colon
                val from = parts[0]
                val neighbors = parts[1]
                graph[from] = mutableMapOf()
                if (neighbors.isNotEmpty()) {
                    for (neighbor in neighbors.split(",")) {
                        val neighborParts = neighbor.split(":")
                        if (neighborParts.size == 2) { // Ensure the neighbor is properly formatted
                            val to = neighborParts[0]
                            val weight = neighborParts[1].toIntOrNull() ?: continue // Skip invalid weights
                            graph[from]!![to] = weight
                        }
                    }
                }
            }
        }
    }
    return graph
}

fun dijkstra(graph: Map<String, Map<String, Int>>, startNode: String, endNode: String): Int {
    val distances = mutableMapOf<String, Int>()
    val visited = mutableMapOf<String, String?>()
    val bucketList = BucketList()

    for (node in graph.keys) {
        distances[node] = if (node == startNode) 0 else Int.MAX_VALUE
        bucketList.add(node, distances[node]!!)
        visited[node] = null
    }

    while (bucketList.isNotEmpty()) {
        val (currentNode, currentDistance) = bucketList.extractMin()!!

        if (currentNode == endNode) {
            return currentDistance
        }

        for ((neighbor, weight) in graph[currentNode]!!) {
            val newDistance = currentDistance + weight
            if (newDistance < distances[neighbor]!!) {
                distances[neighbor] = newDistance
                bucketList.add(neighbor, newDistance)
            }
        }
    }

    return Int.MAX_VALUE
}

class BucketList {
    private val buckets = mutableMapOf<Int, MutableList<String>>()
    private var minDistance = 0

    fun add(node: String, distance: Int) {
        buckets.computeIfAbsent(distance) { mutableListOf() }.add(node)
        if (distance < minDistance) minDistance = distance
    }

    fun extractMin(): Pair<String, Int>? {
        while (minDistance <= Int.MAX_VALUE) {
            val bucket = buckets[minDistance]
            if (bucket != null && bucket.isNotEmpty()) {
                val node = bucket.removeAt(0)
                return node to minDistance
            }
            minDistance++
        }
        return null
    }

    fun isNotEmpty(): Boolean {
        return buckets.any { it.value.isNotEmpty() }
    }
}

fun main() {
    // Specify the absolute path to the file
    val filePath = "C:\\Users\\suyun\\StudioProjects\\Algorithm\\src\\university\\test1\\large_graph.txt"
    val graph = readGraph(filePath)
    val startNode = "N0"
    val endNode = "N99999"

    val startTime = System.currentTimeMillis()
    val distance = dijkstra(graph, startNode, endNode)
    val endTime = System.currentTimeMillis()

    println("Execution time: ${endTime - startTime} ms")
    println("Shortest distance from $startNode to $endNode: $distance")
}