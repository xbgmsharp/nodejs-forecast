# nodejs-forecast

This NodeJS application is use to proxy the [Forecast.io](http://forecast.io) request for the [Piwigo integration](http://piwigo.org/ext/extension_view.php?eid=795).

This is mainly to hide my API key and to avoid the limit requests set by the forecast.io API, eg: 1000 per day free.

It allow to cache the result. No IP are log.

The webservice proxy API is running on [OpenShift](https://www.openshift.com/)

The application run on NodeJS.

The data are store in MongoDB.

See https://forecast-xbgmsharp.rhcloud.com

Installing
----------

* Clone the repository

```bash
git clone https://github.com/xbgmsharp/nodejs-forecast
cd nodejs-forecast
```

* Install dependencies

```bash
$ npm install
```

* Start the application

```bash
$ export FORECAST_API_KEY=...
$ npm start
```
Or manually, you can define an IP and the PORT by using environment variables.
```bash
$ HOST=127.0.0.1 PORT=8080 DEBUG=nodejs-forecast node bin/www
```

* Point your browser to: [http://localhost:8080/](http://localhost:8080/)
* Enjoy!

Usage
-----
Query format:
```
/api/:lat/:lon/:time/:unit?/:lang?
```
If not specify the ``unit`` parameter fallback to ``auto`` and the ``lang`` parameter fallback to ``en``.
Refer to the [Forecast API Docs](https://developer.forecast.io/docs/v2) for details.

First query:
```bash
$ curl -sv "http://localhost:8080/api/48.858366667/2.2942166667/1420309452" | jq .
...
< Cache-Control: public, max-age=2592000000
< X-Cache: MISS
```

Second query:
```bash
$ curl -sv "http://localhost:8080/api/:lat/:lon/:time/:unit?/:lang?" | jq .
...
< Cache-Control: public, max-age=2592000000
< X-Cache: HIT
```

Licence
-------
nodejs-forecast is free software:  you can redistribute it
and/or  modify  it under  the  terms  of the  GNU  General  Public License  as
published by the Free Software Foundation.

This program  is distributed in the hope  that it will be  useful, but WITHOUT
ANY WARRANTY; without even the  implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

See <http://www.gnu.org/licenses/gpl.html>.
