import { UserVm } from 'src/modules/user/vm/user.vm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { AbstractVmBuilder } from '../abstracts/vm-builder.abstract';

export class UserVmBuilder extends AbstractVmBuilder<UserVm> {
  private readonly entity: UserEntity;

  constructor(entity: UserEntity) {
    super();
    this.entity = entity;
    const vm = new UserVm();
    vm.id = entity.id;
    vm.email = entity.email;
    vm.name = entity.name;
    vm.updatedAt = entity.updatedAt;
    vm.createdAt = entity.createdAt;
    this.vm = vm;
  }
}
