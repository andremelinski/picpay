import * as bcrypt from 'bcrypt';

export const encrypt = async(password: string, saltRounds?: number): Promise<string>  => {
        return await bcrypt.hash(password, saltRounds || 10);
}