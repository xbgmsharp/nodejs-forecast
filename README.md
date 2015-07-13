# nodejs-forecast

This NodeJS application is use to proxy the Forecast.io request for the [Piwigo integration](http://piwigo.org/ext/extension_view.php?eid=795).

This is mainly to hide my API key and to avoid the limit requests set by the forecast.io API, eg: 1000 per day free.

It allow to cache the result. No IP are log.

The webservice proxy API is running on [OpenShift](https://www.openshift.com/)

The application run on NodeJS.

The data are store in MongoDB.

See https://forecast-xbgmsharp.rhcloud.com




[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/xbgmsharp/nodejs-forecast/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

