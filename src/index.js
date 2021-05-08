import './assets/main.css';
import { ArticlesController } from './controllers/articles.controller';

class App {
  initialize() {
    const controls = new ArticlesController(40);
    controls.setupListeners();
    return controls.getNewData();
  }
}

const app = new App();
app.initialize();
