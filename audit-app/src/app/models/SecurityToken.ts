export class SecurityToken{
    public jwt : string = "";
    constructor(
    ){}

    public get Jwt() : string{
        return this.jwt;
    }
    
    public set Jwt(jwt : string){
        this.jwt = jwt;
    }
    
    // public set jwt(jwt : string) { may be setters are not required...lets check
    //     this._jwt = jwt;
    // }
    
}