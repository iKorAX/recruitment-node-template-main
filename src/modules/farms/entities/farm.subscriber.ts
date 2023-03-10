import { DrivingDistanceService } from "modules/driving-distances/driving-distance.service";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Farm } from "./farm.entity";

@EventSubscriber()
export class FarmSubscriber implements EntitySubscriberInterface<Farm> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  public listenTo() {
    return Farm;
  }

  public afterInsert(event: InsertEvent<Farm>) {
    const drivingDistanceService = new DrivingDistanceService();

    drivingDistanceService.createFromUsersToFarm(event.entity);
  }
}
