
export class TokenDetails{
    userId: string;
    idToken : string;
    issueTimestamp: number;
    timestamp: number;

    constructor(userId : string, idToken : string, issueTimestamp : number, timestamp : number) {
        this.userId = userId;
        this.idToken = idToken;
        this.issueTimestamp = issueTimestamp;
        this.timestamp = timestamp;
    }
}