# Tvmaze
Tvmaze asynchronous service for MongoDB.

The TVmaze full content can be download by this package, by using `mongoose` it is downloading into the database. After the load of content only it has to call `update` method at specified intervals

If there is a change in the series, then the connected documents will be overwrite.

**The full save takes more time (circa ~7.75 hours)! If you can, always update it.**

## Features

+ Rate limiting ([TVmaze](https://www.tvmaze.com/api#rate-limiting) limits the number of queries)
+ The whole database can be downloaded at one time
+ Recognize the last series
+ Simple update method
+ Mongoose schemas

## Method
The method runs on all `shows` pages, then the received series and their episodes will be save.   The rate limiting process is limited.

Please note that the calculation of queries **(20 calls every 10 seconds per IP address)** is limited to this package and wait 10 seconds after restarting.

## Statistics
~ 32.874 series (~ 41 mb)
~ 1.284.987 episodes (~ 515 mb)
~ 7.75 hours the full download time

It is constantly expanding.

## Use with Docker

Build docker image and run services
```
docker-composer up -d
```

## License
MIT
