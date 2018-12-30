import { TestBed, inject } from '@angular/core/testing';

import { FotografiasService } from './fotografias.service';

describe('FotografiasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FotografiasService]
    });
  });

  it('should be created', inject([FotografiasService], (service: FotografiasService) => {
    expect(service).toBeTruthy();
  }));
});
