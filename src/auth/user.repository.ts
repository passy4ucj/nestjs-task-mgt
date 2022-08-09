import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto

        // const exists = await this.findOne({ username })

        // if(exists) {
        //     // 
        // }

        const salt = await bcrypt.genSalt()

        // console.log(salt)

        const user = new User()
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);

        // console.log(user.password)
        try {
            await user.save()
        } catch (error) {
            // console.log(error.code)
            if(error.code === '23505') { // Dupliate username
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }


    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto

        const user = await this.findOne({ username })

        if(user && await user.validatePassword(password)) {
            return user.username
        } else {
            return null
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }
}