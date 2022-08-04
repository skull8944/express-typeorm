import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  public id: number

  @Column({ unique: true })
  public url: string

  // ManyToOne(TargetType, relation)
  // user.id
  @ManyToOne(() => User, (user) => user.photos)
  public user: User

}