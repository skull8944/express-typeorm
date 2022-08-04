import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Project {

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @ManyToMany(() => User, user => user.project, { cascade: true })
  @JoinTable({
    name: 'projectMember',
    joinColumns: [{
      name: 'pid',
      referencedColumnName: 'id'
    }],
    inverseJoinColumns: [{
      name: 'user',
      referencedColumnName: 'id'
    }]
  })
  public users: User[]

}