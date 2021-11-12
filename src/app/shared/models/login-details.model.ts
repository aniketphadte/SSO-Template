import { TokenDetails } from "./token-details.model";

export class LoginDetails {
    tokenDetails : TokenDetails;
    securityToken : string;

    constructor( tokenDetails : TokenDetails, securityToken: string ) {
        this.tokenDetails = tokenDetails;
        this.securityToken= securityToken;
    }
}