import { Auth, Logger } from 'aws-amplify';
import SecretsManager from 'aws-sdk/clients/secretsmanager';
import Credentials from 'aws-sdk/lib/credentials';

export const getSecret = async (secretName) => {
    const logger = new Logger("[AwsGetSecret]", "DEBUG")
    logger.debug("Getting secret for ", secretName)
    try {
        let secret = null
        const creds = await Auth.currentUserCredentials()
        const sm = new SecretsManager({
            region: 'us-west-2',
            accessKeyId: creds.accessKeyId,
            secretAccessKey: creds.secretAccessKey,
            sessionToken: creds.sessionToken
        })
        const data = await sm.getSecretValue({ SecretId: secretName }).promise()
        secret = JSON.parse(data.SecretString)
        return secret.api_key
    } catch (error) {
        logger.error('an error occured', error);
        return null
    }
}