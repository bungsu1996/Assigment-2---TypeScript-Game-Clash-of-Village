import express, { Application } from 'express';
import connectDB from './configs/connectDB';
import routes from './routes/routes';
import { ErrHandler } from './middlewares/errHandler';

class App {
  public app: Application;
  constructor(){
    this.app = express();
    this.plugin();
    this.route();
    this.errHandler();
  }
  protected plugin = () => {
    this.app.use(express.urlencoded({ extended: true }))
    connectDB.connect();
  }
  protected route = () => {
    this.app.use(routes);
  }
  protected errHandler = () => {
    this.app.use(ErrHandler.handle);
  }
};

const app = new App().app;
const port = 3000; 

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  
});