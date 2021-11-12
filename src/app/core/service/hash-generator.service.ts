import { IHashGeneratorService } from './../interfaces/ihash-generator-service';
import { Injectable } from '@angular/core';
//import { SHA256} from 'crypto-js';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})

export class HashGeneratorService implements IHashGeneratorService{

  constructor() { }

  public CreateHash<T>(data: T, salt :string): string{
    var parsedJson = JSON.stringify(data);
    var hash = CryptoJS.SHA256(parsedJson + salt);
    return hash.toString();
  }
}
