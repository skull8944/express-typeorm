import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false, unique: true})
  name: string

  @Column({nullable: false, unique: true})
  email: string

  @Column({nullable: false})
  password: string

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}