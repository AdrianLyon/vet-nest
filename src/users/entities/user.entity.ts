import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}
