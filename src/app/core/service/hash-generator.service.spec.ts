import { TestBed } from '@angular/core/testing';

import { HashGeneratorService } from './hash-generator.service';

describe('HashGeneratorService', () => {
  let service: HashGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
