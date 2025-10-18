import { randomBytes } from "crypto"

export const generateInviteToken = (): string => {
    return randomBytes(32).toString('hex');
}