import { services } from '@boilerplate-node/core';

export const consumer = async (event: any) => {
  const service = new services.BookService();

  for (const record of event.Records) {
    const body = JSON.parse(record.body)
    console.log("Message Body: ", body);

    if (body.userId) {
      await service.updatePreferred(body.userId);
    }
  }
};
