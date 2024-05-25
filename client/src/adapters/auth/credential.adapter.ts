
import { UserDataResponse } from '../../models';
import { Credentials } from '../../models/auth/credentials.model';

export const credentialAdapter = (credential: UserDataResponse): Credentials => {
    const formatoCredential: Credentials = {
        email: credential.email,
        password: credential.password,
    };
    return formatoCredential;
};