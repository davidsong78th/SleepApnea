class User {
    constructor(id, title, ECGLog, EEGLog, OxymeterLog, StrainLog, FlowLog, SnoreLog, dateCreated) {
        this.id = id
        this.title = title
        this.ECGLog = ECGLog
        this.EEGLog = EEGLog
        this.OxymeterLog = OxymeterLog
        this.StrainLog = StrainLog
        this.FlowLog = FlowLog
        this.SnoreLog = SnoreLog
        this.dateCreated = dateCreated
    }
}

export default User