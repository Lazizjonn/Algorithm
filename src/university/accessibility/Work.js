import {StudentData} from "./StudentData.js";

export function Work() {
    const studentData = StudentData();
    const work = {};

    work.doWork = function () {
        console.log(`${studentData.name} ${studentData.surname} is working`);
    }

    work.rest = function () {
        console.log(`${studentData.name} ${studentData.surname} is resting`)
    }

    return work;
}