<div align="center">
    <img width="200" height="200" src="https://github.com/cerner/carbon-graphs/raw/master/build/assets/icons/Carbon_256.png">
</div>

<h1 align="center">
  Carbon Site Helpers
</h1>

Repository containing helpers for Carbon Graphs Site. Uses Material UI and React.

## Dependencies

-   @material-ui/core
-   @material-ui/icons
-   @material-ui/styles
-   react
-   react-dom
-   react-router
-   react-router-dom
-   prop-types
-   classnames

## Usage

```javascript
import renderSiteApp from "carbon-site-helpers";

renderSiteApp(
    [
        {
            pathname: "/line",
            children: [
                {
                    pathname: "/line/simple-line",
                    title: "Simple Line Graph",
                    content: id => {
                        document.querySelector(`#${id}`).innerHTML =
                            "content/line/simple-line";
                    }
                },
                {
                    pathname: "/line/timeseries",
                    content: id => {
                        document.querySelector(`#${id}`).innerHTML =
                            "content/line/timeseries";
                    }
                }
            ]
        }
    ],
    "#/line/simple-line"
);
```

## LICENSE

Copyright 2017 - 2019 Cerner Innovation, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

&nbsp;&nbsp;&nbsp;&nbsp;http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
