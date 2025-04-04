let instance = null;

export function StudentData() {
    if (!instance) {
        const state = {
            name: "",
            surname: "",
            subjects: [],
            friend: {
                _newName: "Lory",
                get newName() {
                    return this._newName
                },
                set newName(value) {
                    if (value) this._newName = value
                    else console.error("Invalid name")
                },
            },
        };

        instance = {
            get name() {
                return state.name;
            },
            set name(value) {
                if (typeof value !== "string") {
                    throw new Error("Name must be a string");
                }
                state.name = value;
            },
            get surname() {
                return state.surname;
            },
            set surname(value) {
                if (typeof value !== "string") {
                    throw new Error("Surname must be a string");
                }
                state.surname = value;
            },

            get subjects() {
                return state.subjects;
            },
            set subjects(value) {
                if (!Array.isArray(value)) {
                    throw new Error("Subjects must be an array");
                }
                state.subjects = value;
            },
            get friend() {
                return {
                    get newName() {
                        return state.friend.newName;
                    },
                    set newName(value) {
                        state.friend.newName = value;
                    }
                };
            }
        };
    }

    return instance;
}
