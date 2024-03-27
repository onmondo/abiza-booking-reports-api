import { SetExpressionOperatorReturningBoolean } from "mongoose"

type EnvKeys = {
    MONGO_DB_URL: string,
    MONGO_DB_PWD: string,
    RATE_LIMIT_WINDOW: number,
    REQUEST_LIMIT: number,
    RABBIT_MQ_URL: string,
    RABBIT_MQ_EXCHG_NAME: string,
}

export const envKeys = (): EnvKeys => {
    if (process.env.ENV === 'STG') {
        return {
            MONGO_DB_URL: process.env.MONGO_STG || '',
            MONGO_DB_PWD: process.env.MONGO_STG_PSWD || '',
            RATE_LIMIT_WINDOW: parseInt(process.env.STG_RATE_LIMIT_WINDOW || '900000'), // 15 minutes
            REQUEST_LIMIT: parseInt(process.env.STG_REQUEST_LIMIT || '60'), // Limit each IP to 60 requests per `window` (here, per 15 minutes).
            RABBIT_MQ_URL: process.env.STG_RABBIT_MQ_URL || '',
            RABBIT_MQ_EXCHG_NAME: process.env.STG_RABBIT_MQ_EXCHG_NAME || ''
        }
    }

    return {
        MONGO_DB_URL: process.env.MONGO_LOCAL || '',
        MONGO_DB_PWD: '',
        RATE_LIMIT_WINDOW: parseInt(process.env.LOCAL_RATE_LIMIT_WINDOW || '6000'), // 1 minute
        REQUEST_LIMIT: parseInt(process.env.LOCAL_REQUEST_LIMIT || '10'), // Limit each IP to 10 requests per `window` (here, per 1 minute).
        RABBIT_MQ_URL: process.env.LOCAL_RABBIT_MQ_URL || '',
        RABBIT_MQ_EXCHG_NAME: process.env.LOCAL_RABBIT_MQ_EXCHG_NAME || ''
    }
}