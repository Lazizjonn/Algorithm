import {StudentData} from "./StudentData.js";
import {Work} from "./Work.js";
import {Life} from "./Life.js";

console.log("started");

const studentData = StudentData();
const work = Work();
const life = Life();

studentData.name = "Laziz";
studentData.surname = "Suyun";

console.log(`Initial name: ${studentData.friend.newName}`)

life.listen();
work.doWork();
work.rest();