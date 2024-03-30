# admin.abiza.com
Provides monitoring services of bookings, capital expenditures, operational cost and share of earnings from booking platforms, Agoda, Airbnb and Booking.com.

## Setting it up
### Install necessary dependencies
```bash
npm i
``` 

### Next is to include environment variables
You'll need to create an `.env` file on the root directory of the project for connectivity of both docker images from this project
https://github.com/onmondo/abiza-booking-summary-api
```
ENV=LOCAL
MONGO_LOCAL=mongodb://localhost:27017/abiza-mongodb

LOCAL_RABBIT_MQ_URL=amqp://guest:password@localhost
LOCAL_RABBIT_MQ_EXCHG_NAME=sampleExchangeNameLog
```

### And finally, serve up the resources by issuing the command
```bash
npm run dev
```

#### (optional) You can also build the app for deployment purposes by issuing the command
```bash
npm run build
```