import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Profile {
  @OneToOne(() => User, (user) => user.profile, { primary: true })
  @JoinColumn({ name: 'uid' },)
  public uid: User

  @Column()
  public height: number

  @Column()
  public weight: number

}