import { GameService } from '../services/game.service';

export class TestService {
  constructor(private gameService: GameService) {
    setTimeout(() => {
      this.gameService.testNewGame()
    }, 6000)
  }
}
