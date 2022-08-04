import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, ManyToOne } from 'typeorm'
import { Photo } from './Photo'
import { Profile } from './Profile';
import { Project } from './Project';

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	public id: number

	@Column({ unique: true })
	public name: string

	@Column({ unique: true })
	public email: string

	@Column()
	public password: string

	@OneToOne(() => Profile, (profile) => profile.uid)
	public profile?: Profile

	@OneToMany(() => Photo, (photo) => photo.user, { cascade: true })
	public photos?: Photo[];

	@ManyToOne(() => User, user => user.id, { nullable: true })
	public manager?: User

	@ManyToMany(() => Project, project => project.users)
	public project?: Project

}
