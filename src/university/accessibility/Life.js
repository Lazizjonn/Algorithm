import {StudentData} from "./StudentData.js";
import {Work} from "./Work.js";

export function Life() {
    const studentData = StudentData();
    const work = Work();
    const life = {};

    life.eat = function () {
        console.log(`${studentData.name} ${studentData.surname} , it is time to eat`);
        work.rest();
    }

    life.listen = function () {
        console.log(`${studentData.name} ${studentData.surname} is listening music`);
    }

    life.changeName = function () {
        studentData.name = "Default name"
        studentData.surname = "Default surname";
    }

    return life;
}