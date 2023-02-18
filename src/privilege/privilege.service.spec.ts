import { Test, TestingModule } from '@nestjs/testing';
import { PrivilegeService } from './privilege.service';

describe('PrivilegeService', () => {
  let service: PrivilegeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivilegeService],
    }).compile();

    service = module.get<PrivilegeService>(PrivilegeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
