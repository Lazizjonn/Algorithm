import java.io.File
import java.util.Random

fun generateLargeGraph(fileName: String, numNodes: Int, numEdges: Int) {
    val random = Random()
    val graph = mutableMapOf<String, MutableMap<String, Int>>()

    // Add nodes
    for (i in 0 until numNodes) {
        graph["N$i"] = mutableMapOf()
    }

    // Add edges
    for (i in 0 until numEdges) {
        val from = "N${random.nextInt(numNodes)}"
        val to = "N${random.nextInt(numNodes)}"
        if (from != to) {
            val weight = random.nextInt(100) + 1
            graph[from]?.put(to, weight)
        }
    }

    // Write graph to file
    val file = File(fileName)
    file.bufferedWriter().use { writer ->
        for ((from, neighbors) in graph) {
            val neighborString = neighbors.entries.joinToString(",") { "${it.key}:${it.value}" }
            writer.write("$from:$neighborString\n")
        }
    }
}

fun main() {
    generateLargeGraph("large_graph.txt", 100000, 1000000)
}