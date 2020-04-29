import { GameService } from '../services/game.service';
import { LIGHT_STATUS } from '../models/light-status';
import { BUTTONS } from '../models/buttons';

export class TestService {
  constructor(private gameService: GameService) {
    setInterval(() => {
      this.sendRandomEvent()
    }, 4000)

    setInterval(() => {
      this.gameService.sendRead('1111', {
        buttons: [BUTTONS.BLUE, BUTTONS.GREEN, BUTTONS.ORANGE, BUTTONS.YELLOW],
        controllers: [0,1,2,3]
      })
    }, 5000)

    setInterval(() => {
      this.gameService.sendStopRead('1111')
    }, 6000)

    /*setInterval(() => {
      this.sendRandomEvent()
    }, 3000)*/
  }

  private sendRandomEvent() {
    const messages = [
      [LIGHT_STATUS.BLINKING, LIGHT_STATUS.ON, LIGHT_STATUS.OFF, LIGHT_STATUS.BLINKING],
      [LIGHT_STATUS.ON, LIGHT_STATUS.ON, LIGHT_STATUS.ON, LIGHT_STATUS.ON],
      [LIGHT_STATUS.OFF, LIGHT_STATUS.OFF, LIGHT_STATUS.OFF, LIGHT_STATUS.OFF],
      [LIGHT_STATUS.OFF, LIGHT_STATUS.ON, LIGHT_STATUS.OFF, LIGHT_STATUS.OFF],
      [LIGHT_STATUS.OFF, LIGHT_STATUS.OFF, LIGHT_STATUS.ON, LIGHT_STATUS.OFF],
      [LIGHT_STATUS.OFF, LIGHT_STATUS.OFF, LIGHT_STATUS.OFF, LIGHT_STATUS.ON],
      [LIGHT_STATUS.ON, LIGHT_STATUS.OFF, LIGHT_STATUS.ON, LIGHT_STATUS.OFF],
      [LIGHT_STATUS.BLINKING, LIGHT_STATUS.BLINKING, LIGHT_STATUS.OFF, LIGHT_STATUS.OFF],
      [LIGHT_STATUS.BLINKING, LIGHT_STATUS.BLINKING, LIGHT_STATUS.OFF, LIGHT_STATUS.BLINKING],
      [LIGHT_STATUS.OFF, LIGHT_STATUS.BLINKING, LIGHT_STATUS.OFF, LIGHT_STATUS.OFF],
      [LIGHT_STATUS.OFF, LIGHT_STATUS.OFF, LIGHT_STATUS.BLINKING, LIGHT_STATUS.OFF],
      [LIGHT_STATUS.OFF, LIGHT_STATUS.OFF, LIGHT_STATUS.OFF, LIGHT_STATUS.BLINKING],
      [LIGHT_STATUS.BLINKING, LIGHT_STATUS.ON, LIGHT_STATUS.BLINKING, LIGHT_STATUS.BLINKING],
      [LIGHT_STATUS.OFF, LIGHT_STATUS.ON, LIGHT_STATUS.OFF, LIGHT_STATUS.ON],
      [LIGHT_STATUS.BLINKING, LIGHT_STATUS.BLINKING, LIGHT_STATUS.BLINKING, LIGHT_STATUS.BLINKING],
      [LIGHT_STATUS.ON, LIGHT_STATUS.ON, LIGHT_STATUS.OFF, LIGHT_STATUS.OFF],
    ]
    this.gameService.sendWrite('1111', messages[this.getRandomInt(messages.length)]);
  }

  private sendOffEvent() {
    this.gameService.sendWrite('1111', [0,0,0,0]);
  }

  private getRandomInt(len: number) {
    const min = 0;
    const max = len - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
