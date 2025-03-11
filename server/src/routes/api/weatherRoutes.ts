import { Router, type Request, type Response } from 'express';
const router = Router();

//import HistoryService from '../../service/historyService.js';
import { WeatherObject, WeatherService } from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;
  // TODO: GET weather data from city name
  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }
  // TODO: save city to search history
  const currentWeather : WeatherService = new WeatherService(cityName);
  const arr_data : Array<WeatherObject> | null = await currentWeather.getWeatherForecast();

  //Declare our target_data as an array
  const target_data : Array<WeatherObject> = [];
  
  if (arr_data) {
    target_data.push(...arr_data);
    console.log(target_data);
    return res.status(200).json(target_data);
  } else {
    return res.status(500).json('Data fetching was not executed.');
  }
});

// // TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {

//   try {
//     res.status(200).json('Get History route')
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err)
//   }
// });

// // * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => { });

export default router;
