import { Auth, Logger, Storage } from 'aws-amplify';
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
        logger.debug('an error occurred', error);
        return null
    }
}


export const putImage_NOT_WORKING = async (key, image) => {
    const logger = new Logger("[AwsPutImage]", "DEBUG")
    logger.debug("saving image", key, image)
    try {
        result = await Storage.put(key, image,
            {
                contentType: 'image/jpg'
            }
        )
        return result.key
    } catch (error) {
        logger.debug('an error occurred', error);
        return null
    }
}

export const getImageUrl = async (key) => {
    const logger = new Logger("[AwsGetImageURL]", "DEBUG")
    logger.debug("getting image url", key)
    result = await Storage.get(key, { level: 'public' })
    return result
}

export const getImagesUrl = async (images) => {
    imageURLs = images.map(async (image) => {
        url = await getImageUrl(image)
        return url
    })
    images = await Promise.all(imageURLs)
    return images
}

export const saveImage = async (
    fileUri,
    awsKey = null,
    access = "public"
) => {
    const logger = new Logger("[AwsPutImage]", "DEBUG")
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", fileUri, true);
        xhr.send(null);
    });
    const { name, type } = blob._data;
    const options = {
        level: access,
        contentType: type
    };
    const key = awsKey || name;
    try {
        const result = await Storage.put(key, blob, options);
        return result.key
    } catch (err) {
        throw err;
    }
};

export const deleteImages = async (keys) => {
    const logger = new Logger("[AwsDeleteImageURL]", "DEBUG")
    logger.debug("removing image url", keys)
    for (const key of keys) {
        await Storage.remove(key)
    }
};