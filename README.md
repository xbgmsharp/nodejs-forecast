# nodejs-forecast

This NodeJs application is use to proxy the Forecast.io request for the [Piwigo integration](http://piwigo.org/ext/extension_view.php?eid=795).
This is mainly to limit the requests set by the forecast.io API, eg: 1000 per day free.
It also allow to cache the result.

The webservice API is running on openshift.com
The appliction run on NodeJS
The data are store in MongoDB.


