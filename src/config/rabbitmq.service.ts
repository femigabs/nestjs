import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async RabbitMQPublisher(topic: string, message: any) {
    const data = JSON.stringify(message);

    this.amqpConnection.publish(process.env.RABBITMQ_EXCHANGE, topic, data);
    console.log('RabbitMQ Published successfully');
  };

  @RabbitSubscribe({
    exchange: process.env.RABBITMQ_EXCHANGE,
    routingKey: process.env.RABBITMQ_TOPIC1,
    queue: process.env.RABBITMQ_TOPIC1_QUEUE,
  })
  public async handleTopic1(message: string) {
    const data = JSON.parse(message);
    console.log('Received message on topic1:', data);
    // Handle the message
  }
}
