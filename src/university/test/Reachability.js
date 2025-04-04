export function Reachability() {
    const reachability = {}

    reachability.name = "Laziz"

    reachability.initAccessibility = function () {
        console.log("Init reachability")
    }

    reachability.computeReachability = function () {
        console.log("Init computeAccess")
    }

    reachability.buildGraph = function (map) {
        console.log(`Reach. is building graph according to ${map}`)
    }

}
