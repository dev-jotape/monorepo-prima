import { SQS } from 'aws-sdk';
import config from '../config';

class QueueService {
    private sqs: SQS;

    constructor() {
        this.sqs = new SQS({ region: config.awsRegion });
    }

    publish = (payload: object) => {
        this.sqs.sendMessage({
			MessageBody: JSON.stringify(payload),
			QueueUrl: config.queueUrl!,
		}).promise();
    }

}

export { QueueService }
