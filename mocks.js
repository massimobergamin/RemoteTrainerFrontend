export const withRoom = {
    meeting_id: 2,
    client_uid: "eZRIzsBdiuZUWvsKCGwtO2QU1OC2",
    trainer_uid: "s02BMBXurUUZHvUml2jc9bwPAn43",
    title: "Weekly Checkup",
    startDate: Date.now(),
    endDate: new Date(Date.now() + 60000),
    in_use: true
}
export const withoutRoom = {
    meeting_id: 3,
    client_uid: "eZRIzsBdiuZUWvsKCGwtO2QU1OC2",
    trainer_uid: "s02BMBXurUUZHvUml2jc9bwPAn43",
    title: "Weekly Checkup",
    startDate: Date.now(),
    endDate: new Date(Date.now() + 60000),
    in_use: false
}

const mocks = {withRoom, withoutRoom};

export default mocks;


