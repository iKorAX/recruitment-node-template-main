import { DrivingDistanceService } from "modules/driving-distances/driving-distance.service";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { User } from "./user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  public listenTo() {
    return User;
  }

  public afterInsert(event: InsertEvent<User>) {
    const drivingDistanceService = new DrivingDistanceService();

    drivingDistanceService.createFromFarmsToUser(event.entity);
  }
}
