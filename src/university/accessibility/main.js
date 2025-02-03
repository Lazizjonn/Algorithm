import {StudentData} from "./StudentData.js";
import {Work} from "./Work.js";
import {Life} from "./Life.js";

console.log("started");

const studentData = StudentData();
const work = Work();
const life = Life();

studentData.name = "Laziz";
studentData.surname = "Suyun";

console.log(`${studentData.name}`);
console.log(`${studentData.surname}`);

work.doWork();
work.rest();

life.changeName();

life.listen();
// studentData.friend.newName = "Ken"
console.log(`${studentData.newName}`)
studentData.name = "Laziz 2";
studentData.surname = "Suyun 2";

life.listen();
work.doWork();
work.rest();