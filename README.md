# nodejs-forecast

This NodeJS application is use to proxy the Forecast.io request for the [Piwigo integration](http://piwigo.org/ext/extension_view.php?eid=795).

This is mainly to hide my API key and to avoid the limit requests set by the forecast.io API, eg: 1000 per day free.

It allow to cache the result. No IP are log.

The webservice proxy API is running on [OpenShift](https://www.openshift.com/)

The application run on NodeJS.

The data are store in MongoDB.

See https://forecast-xbgmsharp.rhcloud.com

Licence
-------
The piwigo-openstreetmap plugin for Piwigo is free software:  you can redistribute it
and/or  modify  it under  the  terms  of the  GNU  General  Public License  as
published by the Free Software Foundation.

This program  is distributed in the hope  that it will be  useful, but WITHOUT
ANY WARRANTY; without even the  implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

See <http://www.gnu.org/licenses/gpl.html>.

