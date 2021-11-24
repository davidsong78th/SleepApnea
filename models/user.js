class User {
    constructor(id, title, ECGLog, EEGLog, OxymeterLog, PressureLog, FlowLog, SnoreLog, dateCreated) {
        this.id = id
        this.title = title
        this.ECGLog = ECGLog
        this.EEGLog = EEGLog
        this.OxymeterLog = OxymeterLog
        this.PressureLog = PressureLog
        this.FlowLog = FlowLog
        this.SnoreLog = SnoreLog
        this.dateCreated = dateCreated
    }
}

export default User